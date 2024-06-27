"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_js_1 = require("./app.js");
var constants_js_1 = require("./constants/constants.js");
var connection_js_1 = require("./db/connection.js");
var helper_js_1 = require("./utils/helper.js");
/**
 * Server entry script.
 * Initiates a connection to the database.
 * If the connection is successful, the Express application starts listening on the specified PORT.
 * It logs a message indicating that the server is running and connected to the database.
 *
 * If there is a problem connecting to the database, it logs the error to the console.
 */
(0, connection_js_1.connectToDatabase)()
    .then(function () {
    app_js_1.default.listen(constants_js_1.PORT, function () { return console.log((0, helper_js_1.getServerStartMessage)(constants_js_1.PORT)); });
})
    .catch(function (err) { return console.log(constants_js_1.ERROR.SERVER.FAILED_CONNECTION, err); });
