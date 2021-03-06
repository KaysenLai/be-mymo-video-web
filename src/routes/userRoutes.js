import express from 'express';
import user from '../controllers/userController.js';
import auth from '../middlewares/authMiddleware.js';
import userModel from '../models/userModel.js';
import upload from '../middlewares/multer.js';
import s3Avatar from '../middlewares/s3Avatar.js';

const router = express.Router();

router.get('/myprofile', auth, user.myProfile);
router.put('/follow', auth, user.follow);
router.put('/unfollow', auth, user.unfollow);
router.post('/login', user.login);
router.post('/googlelogin', user.googleLogin);
router.post('/signup', user.signup);
router.put('/', auth, upload.single('avatar'), s3Avatar, user.update);
router.get('/', user.getAllUser);
router.get('/verify/:token', user.verify);
router.get('/forget/:email', user.forget);
router.post('/reset', user.reset);
router.get('/search', user.searchUser);
router.get('/:userId', user.getByID);

router.get('/token', auth, async (req, res) => {
  const userId = await userModel.findById(req?.userId);
  res.send('token');
});

export default router;
