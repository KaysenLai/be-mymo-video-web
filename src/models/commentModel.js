import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const CommentModel = mongoose.model('comment', commentSchema);

export default CommentModel;
