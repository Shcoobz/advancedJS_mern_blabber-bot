"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerStartMessage = getServerStartMessage;
const constants_js_1 = require("../constants/constants.js");
// Function to format server start message with dynamic port
function getServerStartMessage(port) {
    const url = `${constants_js_1.SUCCESS.SERVER.BASE_URL}${port}`;
    return constants_js_1.SUCCESS.SERVER.START.replace('{{port}}', port).replace('{{url}}', url);
}
//# sourceMappingURL=helper.js.map