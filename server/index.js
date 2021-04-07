import express from 'express';
import dotenv from 'dotenv';
import config from './config/app.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFoundHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/mongoDB.js';

dotenv.config();
const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/user', userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`#############################\nServer running on port: ${config.PORT}\n#############################`);
});
