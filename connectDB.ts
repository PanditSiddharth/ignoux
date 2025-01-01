import mongoose from 'mongoose';

// MongoDB connection URI
const mongoURI = process.env.URI!;

declare global {
  // eslint-disable-next-line no-var
  var instance: typeof mongoose | undefined;
}

const connectDB = async () => {
  if (global.instance) {
    console.info('Instance already exists');
    return global.instance;
  }

  // Establishing connection with MongoDB
  global.instance = await mongoose.connect(mongoURI)
    .then(() => {
      console.info('MongoDB connected');
      return mongoose;
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
      throw err;
    });

  return global.instance;
}

export default connectDB;
