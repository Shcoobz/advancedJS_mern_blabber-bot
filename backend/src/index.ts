import app from './app.js';

import { ERROR, PORT } from './constants/constants.js';
import { connectToDatabase } from './db/connection.js';
import { getServerStartMessage } from './utils/helper.js';

/**
 * Server entry script.
 * Initiates a connection to the database.
 * If the connection is successful, the Express application starts listening on the specified PORT.
 * It logs a message indicating that the server is running and connected to the database.
 *
 * If there is a problem connecting to the database, it logs the error to the console.
 */
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(getServerStartMessage(PORT)));
  })
  .catch((err) => console.log(ERROR.SERVER.FAILED_CONNECTION, err));
