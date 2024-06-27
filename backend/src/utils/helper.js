"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerStartMessage = void 0;
var constants_js_1 = require("../constants/constants.js");
// Function to format server start message with dynamic port
function getServerStartMessage(port) {
    return constants_js_1.SUCCESS.SERVER.START.replace('{{port}}', port);
}
exports.getServerStartMessage = getServerStartMessage;
