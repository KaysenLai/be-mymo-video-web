import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    time: { type: Date },
  },
  {
    timestamps: true,
  },
);

const CommentModel = mongoose.model('comment', commentSchema);

export default CommentModel;
