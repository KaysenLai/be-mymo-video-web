import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT || 8000,
  AWS_ID: process.env.AWS_ID,
  AWS_SECRET: process.env.AWS_SECRET,
  AWS_AVATAR_BUCKET: process.env.AWS_AVATAR_BUCKET,
  AWS_VIDEO_BUCKET: process.env.AWS_VIDEO_BUCKET,
  BASE_URL: (process.env.NODE_ENV = 'development' ? 'http://localhost:3000' : 'https://mymo.chaokai.me'),
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
};
