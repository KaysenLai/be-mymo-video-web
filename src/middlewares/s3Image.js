import config from '../config/app.js';
import asyncHandler from 'express-async-handler';
// import compressImage from '../utils/compressImg.js';

const AWS_BUCKET = config.AWS_CHAOKAI_IMG;
const s3 = config.s3;

const s3Avatar = asyncHandler(async (req, res, next) => {
  const file = req.file;

  if (!file) {
    await next();
  }

  const typeIndex = file.originalname.indexOf('.jpg');
  const name = file.originalname.substring(0, typeIndex);
  req.name = name;

  // const thumbnailImg = await compressImage(file.buffer, 100);
  // const smallImg = await compressImage(file.buffer, 540);
  // const largeImg = await compressImage(file.buffer, 2400);

  const thumbnailParams = {
    Bucket: AWS_BUCKET,
    Key: `${name}-thumbnail.jpg`,
    Body: thumbnailImg,
    ContentType: 'image/jpeg',
  };

  const smallImgParams = {
    Bucket: AWS_BUCKET,
    Key: `${name}-small.jpg`,
    Body: smallImg,
    ContentType: 'image/jpeg',
  };

  const largeImgParams = {
    Bucket: AWS_BUCKET,
    Key: `${name}-large.jpg`,
    Body: largeImg,
    ContentType: 'image/jpeg',
  };

  await new Promise((resolve) => {
    s3.upload(thumbnailParams, async (error, data) => {
      req.thumbnailSize = data.Location;
      resolve();
    });
  });

  await new Promise((resolve) => {
    s3.upload(smallImgParams, async (error, data) => {
      req.smallSize = data.Location;
      resolve();
    });
  });

  await new Promise((resolve) => {
    s3.upload(largeImgParams, async (error, data) => {
      req.largeSize = data.Location;
      resolve();
    });
  });

  await next();
});

export default s3Avatar;
