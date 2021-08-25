import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import video from '../controllers/videoController.js';
import upload from '../middlewares/multer.js';
import s3Video from '../middlewares/s3Video.js';

const router = express.Router();

router.get('/', video.getAll);
router.get('/:videoId', video.getById);
router.post('/', auth, upload.array('video', 2), s3Video, video.create);
router.put('/comment', auth, video.comment);

export default router;
