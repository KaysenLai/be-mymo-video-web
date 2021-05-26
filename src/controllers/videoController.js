import asyncHandler from 'express-async-handler';
import Video from '../models/videoModel.js';

const getAll = asyncHandler(async (req, res) => {
  const videos = await Video.find({}).populate({
    path: 'author',
    select: 'name avatar followerNum',
  });
  res.json(videos);
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
  const userId = req.userId;
  const { description } = req.body;
  const video = new Video({ description, author: userId });
  await video.save();
  res.json({ message: 'Save the video successfully.' });
});

const comment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { videoId, text } = req.body;
  const comment = { user: userId, text, time: Date.now() };
  const video = await Video.findByIdAndUpdate(videoId, { $push: { comment } });

  res.json({ message: 'Save the comment successfully.' });
});

export default {
  getAll,
  getById,
  create,
  comment,
};
