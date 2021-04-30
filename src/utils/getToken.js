import jwt from 'jsonwebtoken';
import config from '../config/app.js';
const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export default generateToken;
