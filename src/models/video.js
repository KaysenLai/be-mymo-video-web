import mongoose from 'mongoose';

const videoSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    cover: { type: String, required: true },
    video: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

const Video = mongoose.model('Video', videoSchema);

export default Video;
