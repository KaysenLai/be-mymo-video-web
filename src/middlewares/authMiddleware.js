import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const hasToken = authHeader && authHeader.startsWith('Bearer');
  if (!hasToken) {
    res.status(401);
    throw new Error('Unauthorized: have no token');
  }

  const token = req.headers.authorization.split(' ')[1];

  const isGoogleToken = token.length > 500;
  if (isGoogleToken) {
    try {
      const decodedData = jwt.decode(token);
      const user = await User.findOne({ email: decodedData.email });
      req.userId = user._id;
      return next();
    } catch (error) {
      res.status(403);
      throw new Error('Forbidden: unregistered user. ');
    }
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData.id);
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(403);
    throw new Error('Forbidden: invalid token ');
  }
});

export default auth;
