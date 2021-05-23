import jwt from 'jsonwebtoken';
import config from '../config/app.js';

const generateToken = (id, time) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: time,
  });
};

export default generateToken;
