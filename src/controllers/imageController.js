import asyncHandler from 'express-async-handler';
import Image from '../models/imageModel.js';
import mongoose from 'mongoose';

const objectId = mongoose.Types.ObjectId;

const matchIdPipeline = (id) => [{ $match: { _id: objectId(id) } }];
const imagePipeline = () => [
  {
    $addFields: {
      isLiked: {
        $in: ['::1', '$like'],
      },
      count: {
        $size: '$like',
      },
    },
  },
];
const categoryPipeline = (category) => [{ $match: { category } }];
const sortPipeline = (sortBy, order) => {
  const sortOrder = order !== 'desc' ? 1 : -1;
  if (sortBy === 'name')
    return [
      {
        $sort: {
          name: sortOrder,
        },
      },
    ];
  if (sortBy === 'like')
    return [
      {
        $sort: {
          count: sortOrder,
        },
      },
    ];
};
const paginationPipeline = (page, pageSize) => [{ $skip: (+page - 1) * +pageSize }, { $limit: +pageSize }];

const get = asyncHandler(async (req, res) => {
  const { category, sortBy, order, page, pageSize } = req.query;
  let aggregate = [];
  if (category) {
    aggregate = [...aggregate, ...categoryPipeline(category)];
  }
  aggregate = [...aggregate, ...imagePipeline()];
  if (sortBy && order) {
    aggregate = [...aggregate, ...sortPipeline(sortBy, order)];
  }
  if (page && pageSize) {
    aggregate = [...aggregate, ...paginationPipeline(page, pageSize)];
  }
  const results = await Image.aggregate(aggregate);
  res.json(results);
});

const create = asyncHandler(async (req, res) => {
  const { category } = req.body;
  const name = req.name;
  const thumbnailSize = req.thumbnailSize;
  const smallSize = req.smallSize;
  const largeSize = req.largeSize;
  const image = new Image({ name, thumbnailSize, smallSize, largeSize, category });
  await image.save();
  res.json({ message: 'Save the image successfully.' });
});

const like = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ip = req.ip;
  await Image.findByIdAndUpdate(id, { $addToSet: { like: ip } });
  const aggregate = [...matchIdPipeline(id), ...imagePipeline()];
  const result = await Image.aggregate(aggregate);
  res.json(result);
});

const unLike = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ip = req.ip;
  await Image.findByIdAndUpdate(id, { $pull: { like: ip } });
  const aggregate = [...matchIdPipeline(id), ...imagePipeline()];
  const result = await Image.aggregate(aggregate);
  res.json(result);
});

export default {
  get,
  create,
  like,
  unLike,
};
