"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.disconnectFromDatabase = disconnectFromDatabase;
const mongoose_1 = require("mongoose");
const constants_js_1 = require("../constants/constants.js");
/**
 * Attempts to connect to a MongoDB database using the connection URL provided
 * in the environment variables. This function leverages the MongoDB connection
 * string stored in `process.env.MONGODB_URL` to establish a connection to the database.
 */
async function connectToDatabase() {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error(constants_js_1.ERROR.DB.CONNECTION_FAILED);
    }
}
/**
 * Attempts to disconnect from the MongoDB database. This function is typically called
 * when shutting down your application to cleanly close the database connection.
 */
async function disconnectFromDatabase() {
    try {
        await (0, mongoose_1.disconnect)();
    }
    catch (error) {
        console.log(error);
        throw new Error(constants_js_1.ERROR.DB.DISCONNECTED);
    }
}
//# sourceMappingURL=connection.js.map