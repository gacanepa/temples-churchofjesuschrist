import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

let client = null;

const connect = async (URI) => {
  if (!client) {
    try {
      client = await mongoose.connect(uri ?? URI);
      console.log('Connected to the database');
    } catch (e) {
      console.error(`Error connecting to the database: ${e}`);
      client = null;
    }
  }

  return client;
};

export default connect;
