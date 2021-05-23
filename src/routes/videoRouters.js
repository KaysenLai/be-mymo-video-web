import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import video from '../controllers/videoController.js';

const router = express.Router();

router.get('/', video.getAll);
router.get('/:videoId', video.getById);
router.post('/', auth, video.create);
router.put('/comment', auth, video.comment);

export default router;
