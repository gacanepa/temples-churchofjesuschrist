import connect from './database.js';

// High-order function to manage the connections
const withClient = async (callback) => {
  const client = await connect();
  try {
    await callback(client);
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
    await client.close();
  }
};

export default withClient;
