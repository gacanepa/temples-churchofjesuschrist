import mongoose from 'mongoose';

let client = null;

const connect = async uri => {
  if (!client) {
    try {
      client = await mongoose.connect(uri);
      console.log('Connected to the database');
    } catch (e) {
      console.error(`Error connecting to the database: ${e}`);
      client = null;
    }
  }

  return client;
};

export default connect;
