"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOpenAI = void 0;
var openai_1 = require("openai");
/**
 * Configures the OpenAI API with the provided API key and organization ID.
 * The configuration uses environment variables for the API key and organization ID.
 *
 * @function
 * @returns {Configuration} The configured OpenAI API client.
 */
function configureOpenAI() {
    var config = new openai_1.Configuration({
        apiKey: process.env.OPEN_AI_API_KEY,
        organization: process.env.OPEN_AI_ORGANIZATION_ID,
    });
    return config;
}
exports.configureOpenAI = configureOpenAI;
