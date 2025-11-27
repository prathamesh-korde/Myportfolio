import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose. Export the connect function so server can call it.
export const connectDB = async () => {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI not defined in environment');
  }
  try {
    await mongoose.connect(MONGO_URI, {
      // options are now defaults in Mongoose 6+
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};
