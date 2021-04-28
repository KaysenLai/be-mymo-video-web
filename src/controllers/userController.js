import asyncHandler from 'express-async-handler';
import getToken from '../utils/getToken.js';
import User from '../models/userModel.js';
import getRandomPassword from '../utils/getRandomPassword.js';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).send({ message: "The user doesn't exist." });
  }

  const isRightPassword = await user.comparePassword(password);

  if (isRightPassword) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: getToken(user._id),
    });
  } else {
    return res.status(401).send({ message: 'The password is incorrect.' });
  }
});

const googleLogin = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }

  if (!user) {
    const password = getRandomPassword();
    const user = new User({ name, email, password });
    await user.save();
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
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

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    token: getToken(user._id),
  });
});

const myProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).populate({
    path: 'following follower',
    select: 'name following follower avatar',
  });
  return res.json(user);
});

const follow = asyncHandler(async (req, res) => {
  const { followUserId } = req.query;
  const userId = req.userId;
  const user = await User.findByIdAndUpdate(userId, { $addToSet: { following: new ObjectId(followUserId) } });
  const followUser = await User.findByIdAndUpdate(followUserId, { $addToSet: { follower: new ObjectId(userId) } });

  return res.json({ message: `${user.name} follows ${followUser.name} successfully.` });
});

const unfollow = asyncHandler(async (req, res) => {
  const { unfollowUserId } = req.query;
  const userId = req.userId;
  const user = await User.findByIdAndUpdate(userId, { $pull: { following: new ObjectId(unfollowUserId) } });
  const unfollowUser = await User.findByIdAndUpdate(unfollowUserId, { $pull: { follower: new ObjectId(userId) } });

  return res.json({ message: `${user.name} unfollows ${unfollowUser.name} successfully.` });
});

export default {
  login,
  googleLogin,
  signup,
  myProfile,
  follow,
  unfollow,
};
