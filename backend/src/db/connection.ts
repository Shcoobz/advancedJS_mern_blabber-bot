import { connect, disconnect } from 'mongoose';

import { ERROR } from '../constants/constants.js';

/**
 * Attempts to connect to a MongoDB database using the connection URL provided
 * in the environment variables. This function leverages the MongoDB connection
 * string stored in `process.env.MONGODB_URL` to establish a connection to the database.
 */
async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error(ERROR.DB.CONNECTION_FAILED);
  }
}

/**
 * Attempts to disconnect from the MongoDB database. This function is typically called
 * when shutting down your application to cleanly close the database connection.
 */
async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error(ERROR.DB.DISCONNECTED);
  }
}

export { connectToDatabase, disconnectFromDatabase };
