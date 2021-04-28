import mongoose from 'mongoose';

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

const Video = mongoose.model('Video', videoSchema);

export default Video;
