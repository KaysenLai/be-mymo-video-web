import express from 'express';
import image from '../controllers/imageController.js';
import upload from '../middlewares/multer.js';
import s3Image from '../middlewares/s3Image.js';

const router = express.Router();

router.get('/', image.get);
router.post('/', upload.single('image'), s3Image, image.create);

router.put('/like/:id', image.like);
router.put('/unlike/:id', image.unLike);

export default router;
