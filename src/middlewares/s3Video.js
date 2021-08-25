import config from '../config/app.js';
import { v4 as uuid } from 'uuid';
import asyncHandler from 'express-async-handler';

const AWS_VIDEO_BUCKET = config.AWS_VIDEO_BUCKET;

const s3 = config.s3;

const s3Video = asyncHandler(async (req, res, next) => {
  const [coverFile, videoFile] = req.files;

  if (coverFile !== undefined) {
    const coverName = `${uuid()}.jpg`;
    const params = {
      Bucket: AWS_VIDEO_BUCKET,
      Key: coverName,
      Body: coverFile.buffer,
      ContentType: 'image/jpeg',
    };

    await new Promise((resolve) => {
      s3.upload(params, async (error, data) => {
        req.coverUrl = data.Location;
        resolve();
      });
    });
  }

  if (videoFile !== undefined) {
    const videoName = `${uuid()}.mp4`;
    const params = {
      Bucket: AWS_VIDEO_BUCKET,
      Key: videoName,
      Body: videoFile.buffer,
      ContentType: 'video/mp4',
    };

    await new Promise((resolve) => {
      s3.upload(params, async (error, data) => {
        req.videoUrl = data.Location;
        resolve();
      });
    });
  }
  await next();
});

export default s3Video;
