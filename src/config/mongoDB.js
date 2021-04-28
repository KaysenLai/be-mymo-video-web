import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.set('useFindAndModify', false);
  try {
    await mongoose.connect(process.env.MONGODB_KEY, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected successfully`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
