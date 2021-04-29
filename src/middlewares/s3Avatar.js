import AWS from 'aws-sdk';
import config from '../config/app.js';
import { v4 as uuid } from 'uuid';
import asyncHandler from 'express-async-handler';

const AWS_ID = config.AWS_ID;
const AWS_SECRET = config.AWS_SECRET;
const AWS_AVATAR_BUCKET = config.AWS_AVATAR_BUCKET;

const s3 = new AWS.S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
});

const s3Avatar = asyncHandler(async (req, res, next) => {
  const file = req.file;
  const avatarName = `${uuid()}.jpg`;

  const params = {
    Bucket: AWS_AVATAR_BUCKET,
    Key: avatarName,
    Body: file.buffer,
    ContentType: 'image/jpeg',
  };

  await new Promise((resolve) => {
    s3.upload(params, async (error, data) => {
      req.avatarUrl = data.Location;
      resolve();
    });
  });

  await next();
});

export default s3Avatar;
