import express from 'express';
const router = express.Router();
import user from '../controllers/userController.js';
import auth from '../middlewares/authMiddleware.js';
import userModel from '../models/userModel.js';
import s3MiddleWare from '../middlewares/s3Avatar.js';
import upload from '../middlewares/multer.js';

router.get('/', async (req, res) => {
  console.log(req.headers);
  console.log(req.headers['x-userid']);
  res.send('hello');
});

router.get('/myprofile', auth, user.myProfile);
router.get('/follow', auth, user.follow);
router.get('/unfollow', auth, user.unfollow);
router.post('/login', user.login);
router.post('/googlelogin', user.googleLogin);
router.post('/signup', user.signup);
router.put('/', auth, upload.single('avatar'), s3MiddleWare, user.avatar);

router.get('/token', auth, async (req, res) => {
  const userId = await userModel.findById(req?.userId);
  res.send('token');
});

export default router;
