"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOpenAI = configureOpenAI;
const openai_1 = require("openai");
/**
 * Configures the OpenAI API with the provided API key and organization ID.
 * The configuration uses environment variables for the API key and organization ID.
 *
 * @function
 * @returns {Configuration} The configured OpenAI API client.
 */
function configureOpenAI() {
    const config = new openai_1.Configuration({
        apiKey: process.env.OPEN_AI_API_KEY,
        organization: process.env.OPEN_AI_ORGANIZATION_ID,
    });
    return config;
}
//# sourceMappingURL=openai-config.js.map