import express from 'express';
import config from './config/app.js';
import userRoutes from './routes/userRoutes.js';

import { errorHandler, notFoundHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/mongoDB.js';
import cors from 'cors';
import videoRoutes from './routes/videoRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
connectDB();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/video', videoRoutes);
app.use('/image', imageRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`#############################\nServer running on port: ${config.PORT}\n#############################`);
});
