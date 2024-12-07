import mongoose from 'mongoose';

let isConnected = false; 


export async function connect() {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    console.log('Connecting to MongoDB...');

    await mongoose.connect(process.env.MONGO_URI!, {
      bufferCommands: false, 
    });

    isConnected = true; 
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
}
