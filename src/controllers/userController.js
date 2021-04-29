import asyncHandler from 'express-async-handler';
import getToken from '../utils/getToken.js';
import User from '../models/userModel.js';
import getRandomPassword from '../utils/getRandomPassword.js';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const getUserInfo = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  token: getToken(user._id),
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).send({ message: "The user doesn't exist." });
  }

  const isRightPassword = await user.comparePassword(password);

  if (isRightPassword) {
    return res.status(200).json(getUserInfo(user));
  } else {
    return res.status(401).send({ message: 'The password is incorrect.' });
  }
});

const googleLogin = asyncHandler(async (req, res) => {
  const { email, name, avatar } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  }

  if (!user) {
    const password = getRandomPassword();
    const user = new User({ name, email, password, avatar });
    await user.save();
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  }

  res.status(401).send({ message: 'Google login failed.' });
});

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const hasUser = await User.findOne({ email });
  if (hasUser) {
    return res.status(401).send({ message: 'The user has already existed.' });
  }

  const user = new User({ name, email, password });
  await user.save();

  res.status(201).json(getUserInfo(user));
});

const myProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).populate({
    path: 'following follower',
    select: 'name avatar followerNum',
  });
  return res.json(user);
});

const follow = asyncHandler(async (req, res) => {
  const { followUserId } = req.query;
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
  const { unFollowUserId } = req.query;
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

export default {
  login,
  googleLogin,
  signup,
  myProfile,
  follow,
  unfollow,
  update,
};
