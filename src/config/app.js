import dotenv from 'dotenv';
import AWS from 'aws-sdk';
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

export default {
  PORT: process.env.PORT || 8000,
  s3,
  AWS_AVATAR_BUCKET: process.env.AWS_AVATAR_BUCKET,
  AWS_VIDEO_BUCKET: process.env.AWS_VIDEO_BUCKET,
  BASE_URL: 'https://mymo.chaokai.me',
  // BASE_URL: 'http://localhost:3000',
  AWS_CHAOKAI_IMG: process.env.AWS_CHAOKAI_IMG,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
};
