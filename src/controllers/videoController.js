import asyncHandler from 'express-async-handler';
import Video from '../models/videoModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';
import { initialPagination } from '../utils/pagination.js';
import { getVideoAggregate } from './aggregate/video.js';
const { ObjectId } = mongoose.Types;

const get = asyncHandler(async (req, res) => {
  const { page, pageSize } = req.query;
  const filter = {};
  const { page: newPage, pageSize: newPageSize, skip } = initialPagination(page, pageSize);
  const aggregate = getVideoAggregate(skip, newPageSize);
  const result = await Video.aggregate(aggregate);
  res.json(result);
});

const getById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId).populate({
    path: 'author comment.user',
    select: 'name avatar followerNum',
  });
  res.json(video);
});

const create = asyncHandler(async (req, res) => {
  const { userId, videoUrl, coverUrl } = req;
  const { description } = req.body;
  const session = await Video.startSession();
  session.startTransaction();
  const video = new Video({ description, video: videoUrl, cover: coverUrl, author: userId });
  await video.save();
  await User.findByIdAndUpdate(userId, { $push: { video: new ObjectId(video._id) } });
  await session.commitTransaction();
  session.endSession();
  res.json({ message: 'Save the video successfully.' });
});

const comment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { videoId, text } = req.body;
  const comment = { user: userId, text, time: Date.now() };
  await Video.findByIdAndUpdate(videoId, { $push: { comment } });

  res.json({ message: 'Save the comment successfully.' });
});

export default {
  get,
  getById,
  create,
  comment,
};
