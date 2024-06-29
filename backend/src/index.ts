import app from './app.js';

import { ERROR, PORT } from './constants/constants.js';
import { connectToDatabase } from './db/connection.js';
import { getServerStartMessage } from './utils/helper.js';

/**
 * Server entry script.
 * Initiates a connection to the database.
 */
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(getServerStartMessage());
    });
  })
  .catch((err) => console.log(ERROR.SERVER.FAILED_CONNECTION, err));
