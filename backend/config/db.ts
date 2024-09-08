import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      process.exit(1); // Exit with failure
    }
  }
};

export default connectDatabase;
