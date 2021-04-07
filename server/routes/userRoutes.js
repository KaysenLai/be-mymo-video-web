import express from 'express';
const router = express.Router();
import user from '../controllers/userController.js';
import auth from '../middlewares/authMiddleware.js';
import userModel from '../models/userModel.js';

router.get('/', async (req, res) => {
  res.send('hello');
});

router.post('/login', user.login);
router.post('/googlelogin', user.googleLogin);
router.post('/signup', user.signup);

router.get('/token', auth, async (req, res) => {
  console.log(req?.userId);
  const userId = await userModel.findById(req?.userId);
  console.log(userId);
  res.send('token');
});

export default router;
