import asyncHandler from 'express-async-handler';
import getToken from '../utils/getToken.js';
import User from '../models/userModel.js';
import getRandomPassword from '../utils/getRandomPassword.js';

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

const createVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.body;
});

export default {
  getVideoById,
  createVideo,
};
