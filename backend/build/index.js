"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const constants_js_1 = require("./constants/constants.js");
const connection_js_1 = require("./db/connection.js");
const helper_js_1 = require("./utils/helper.js");
/**
 * Server entry script.
 * Initiates a connection to the database.
 */
(0, connection_js_1.connectToDatabase)()
    .then(() => {
    app_js_1.default.listen(constants_js_1.PORT, () => {
        console.log((0, helper_js_1.getServerStartMessage)());
    });
})
    .catch((err) => console.log(constants_js_1.ERROR.SERVER.FAILED_CONNECTION, err));
//# sourceMappingURL=index.js.map