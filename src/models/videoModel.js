import mongoose from 'mongoose';
import CommentModel from './commentModel.js';

const defaultVideo = 'https://mymo-video.s3-ap-southeast-2.amazonaws.com/pexels-cottonbro-5329327.mp4';
const defaultCover = 'https://mymo-avatar.s3-ap-southeast-2.amazonaws.com/00f2174d-d7fe-49e2-8e62-a0ebe837d5ec.jpg';

const videoSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    cover: { type: String, default: defaultCover },
    video: { type: String, default: defaultVideo },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    comment: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        time: { type: Date },
      },
    ],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

const VideoModel = mongoose.model('Video', videoSchema);

export default VideoModel;
