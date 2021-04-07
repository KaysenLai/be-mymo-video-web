export default {
  PORT: process.env.PORT || 8000,
  AWS_ID: process.env.AWS_ID,
  AWS_SECRET: process.env.AWS_SECRET,
  AWS_BUCKET: process.env.AWS_BUCKET,
  BASE_URL: (process.env.NODE_ENV = 'development' ? 'http://localhost:3000' : 'https://mymo.chaokai.me'),
};
