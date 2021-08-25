import asyncHandler from 'express-async-handler';
import getToken from '../utils/getToken.js';
import User from '../models/userModel.js';
import getRandomPassword from '../utils/getRandomPassword.js';
import mongoose from 'mongoose';
import transporter from '../utils/mailer.js';
import jwt from 'jsonwebtoken';
import config from '../config/app.js';
import bcrypt from 'bcryptjs';
import { myProfileAggregate } from './aggregate/user.js';
const { ObjectId } = mongoose.Types;

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).send({ message: "The user doesn't exist." });
  }

  if (user.isVerified === false) {
    return res.status(401).send({ message: 'Please verify your email.' });
  }

  const isRightPassword = await user.comparePassword(password);

  if (isRightPassword) {
    return res.status(200).json({ token: getToken(user._id, '15d') });
  } else {
    return res.status(401).send({ message: 'The password is incorrect.' });
  }
});

const googleLogin = asyncHandler(async (req, res) => {
  const { email, name, avatar } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(200).json({ token: getToken(user._id, '1h') });
  }

  if (!user) {
    const password = getRandomPassword();
    const user = new User({ name, email, password, avatar, isVerified: true });
    await user.save();
    return res.status(201).json({ token: getToken(user._id, '1h') });
  }

  res.status(401).send({ message: 'Google login failed.' });
});

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser && existUser.isVerified === true) {
    return res.status(401).send({ message: 'The user has already existed.' });
  }
  const sendEmail = async (user) => {
    const token = getToken(user._id, '15m');
    const verifyLink = `${config.BASE_URL}/verify/${token}`;
    try {
      const info = await transporter.sendMail({
        from: 'Email Verification from mymo <mymo@gmail.com>',
        to: email,
        subject: '✔ Verification email form MyMo ',
        html: `Hi,${user.name}
            please click the link to activate your account.
            Link:<p href=${verifyLink}>${verifyLink}<a/><br><p>This link will be expired in 15 minutes.</p>`,
      });
      return res.status(201).json({ message: `Verification email has been send to ${email}` });
    } catch (e) {
      return res.status(400).json({ message: `Fail to send verification email` });
    }
  };

  if (existUser && existUser.isVerified === false) {
    sendEmail(existUser.toObject());
    return;
  }
  const user = new User({ name, email, password });
  await user.save();
  sendEmail(user.toObject());
});

const verify = asyncHandler(async (req, res) => {
  const { token } = req.params;

  try {
    const decodedData = jwt.verify(token, config.JWT_SECRET);
    await User.findByIdAndUpdate(decodedData.id, { $set: { isVerified: true } });
    return res.status(200).json({ message: 'Verify email successfully.' });
  } catch (error) {
    res.status(403);
    throw new Error('Forbidden: invalid token or expired token ');
  }
});

const forget = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const existUser = await User.findOne({ email });

  if (!existUser) {
    return res.status(401).send({ message: "The user doesn't exist." });
  }

  const token = getToken(existUser._id, '15m');
  const resetLink = `${config.BASE_URL}/reset/${token}`;
  try {
    const info = await transporter.sendMail({
      from: 'Reset password from MyMo <mymo@gmail.com>',
      to: email,
      subject: '✔ Reset password form MyMo ',
      html: `Hi,${existUser.name}
            please click the link to reset your password.
            Link:<p href=${resetLink}>${resetLink}<a/><br><p>This link will be expired in 15 minutes.</p>`,
    });
    return res.status(201).json({ message: `Resetting email has been send to ${email}` });
  } catch (e) {
    return res.status(400).json({ message: `Fail to send resetting email` });
  }
});

const reset = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  try {
    const decodedData = jwt.verify(token, config.JWT_SECRET);
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(decodedData.id, { $set: { password: encryptedPassword } });
    res.status(200).json({ message: 'Reset password successfully.' });
  } catch (error) {
    res.status(403);
    throw new Error('Forbidden: invalid token or expired token ');
  }
});

const myProfile = asyncHandler(async (req, res) => {
  const query = await User.aggregate(myProfileAggregate(req.userId));
  return res.json(query[0]);
});

const follow = asyncHandler(async (req, res) => {
  const { followUserId } = req.body;
  const userId = req.userId;
  const updateUser = await User.updateOne({ _id: userId }, { $addToSet: { following: new ObjectId(followUserId) } });

  if (updateUser.nModified !== 0) {
    await User.findByIdAndUpdate(userId, { $inc: { followingNum: 1 } });
  }

  const updateFollowUser = await User.updateOne(
    { _id: followUserId },
    { $addToSet: { follower: new ObjectId(userId) } },
  );

  if (updateFollowUser.nModified !== 0) {
    await User.findByIdAndUpdate(followUserId, { $inc: { followerNum: 1 } });
  }

  return res.json({ message: 'Update following successfully.' });
});

const unfollow = asyncHandler(async (req, res) => {
  const { unFollowUserId } = req.body;
  const userId = req.userId;
  const updateUser = await User.updateOne({ _id: userId }, { $pull: { following: new ObjectId(unFollowUserId) } });

  if (updateUser.nModified !== 0) {
    await User.findByIdAndUpdate(userId, { $inc: { followingNum: -1 } });
  }

  const updateFollowUser = await User.updateOne({ _id: unFollowUserId }, { $pull: { follower: new ObjectId(userId) } });

  if (updateFollowUser.nModified !== 0) {
    await User.findByIdAndUpdate(unFollowUserId, { $inc: { followerNum: -1 } });
  }

  return res.json({ message: 'Update unfollowing successfully.' });
});

const update = asyncHandler(async (req, res) => {
  const avatar = req.avatarUrl;
  const { name, description } = req.body;

  if (typeof avatar === 'string') {
    const update = { name, description, avatar: req.avatarUrl };
    await User.findByIdAndUpdate(req.userId, { $set: update }, { new: true });
  } else {
    const update = { name, description };
    await User.findByIdAndUpdate(req.userId, { $set: update }, { new: true });
  }

  return res.json({ message: 'Update user info successfully' });
});

const getAllUser = asyncHandler(async (req, res) => {
  const allUser = await User.find({}).sort({ followerNum: -1 });
  return res.json(allUser);
});

const searchUser = asyncHandler(async (req, res) => {
  const searchText = req.query.searchText || '';
  const searchTextReg = new RegExp(searchText, 'i');
  const searchedUsers = await User.find({ name: searchTextReg }).sort({ followerNum: -1 });
  return res.json(searchedUsers);
});

const getByID = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const reqUserId = req.headers['x-userid'];

  const user = await User.findById(userId).populate({
    path: 'following follower',
    select: 'name avatar followerNum description',
  });
  const query = await User.aggregate([
    {
      $match: {
        _id: new ObjectId(userId),
      },
    },
    {
      $project: {
        isFollowing: {
          $in: [new ObjectId(reqUserId), '$follower'],
        },
        isMyself: {
          $eq: [new ObjectId(reqUserId), new ObjectId(userId)],
        },
      },
    },
  ]);
  const { isFollowing, isMyself } = query[0];
  let userObj = user.toObject();
  userObj.isFollowing = isFollowing;
  userObj.isMyself = isMyself;
  return res.json(userObj);
});

export default {
  login,
  googleLogin,
  signup,
  myProfile,
  follow,
  unfollow,
  update,
  getAllUser,
  getByID,
  verify,
  forget,
  reset,
  searchUser,
};
