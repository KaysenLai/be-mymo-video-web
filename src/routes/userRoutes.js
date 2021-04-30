import express from 'express';
const router = express.Router();
import user from '../controllers/userController.js';
import auth from '../middlewares/authMiddleware.js';
import userModel from '../models/userModel.js';
import upload from '../middlewares/multer.js';
import s3Avatar from '../middlewares/s3Avatar.js';
import transporter from '../utils/mailer.js';
import User from '../models/userModel.js';

router.get('/myprofile', auth, user.myProfile);
router.put('/follow', auth, user.follow);
router.put('/unfollow', auth, user.unfollow);
router.post('/login', user.login);
router.post('/googlelogin', user.googleLogin);
router.post('/signup', user.signup);
router.put('/', auth, upload.single('avatar'), s3Avatar, user.update);
router.get('/', user.getAllUser);
router.get('/:userId', user.getByID);

router.post('/', async (req, res) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'chaokai.lai@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });
  res.json(info);
});

router.get('/token', auth, async (req, res) => {
  const userId = await userModel.findById(req?.userId);
  res.send('token');
});

export default router;
