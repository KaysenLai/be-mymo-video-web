import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnailSize: {
    type: String,
    required: true,
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
      select: false,
    },
  ],
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
