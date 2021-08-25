import mongoose from 'mongoose';

const videoSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    cover: { type: String, required: true },
    video: { type: String, required: true },
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
