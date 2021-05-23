import jwt from 'jsonwebtoken';
import config from '../config/app.js';
const generateToken = (id) => {
  console.log(config.JWT_SECRET);
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export default generateToken;
