import mongoose from 'mongoose';

const imageSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    smallSize: {
      type: String,
      required: true,
    },
    largeSize: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    like: [
      {
        type: String,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Image = mongoose.model('Image', imageSchema);

export default Image;
