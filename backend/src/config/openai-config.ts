import { Configuration } from 'openai';

/**
 * Configures the OpenAI API with the provided API key and organization ID.
 * The configuration uses environment variables for the API key and organization ID.
 *
 * @function
 * @returns {Configuration} The configured OpenAI API client.
 */
export function configureOpenAI() {
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
    organization: process.env.OPEN_AI_ORGANIZATION_ID,
  });
  return config;
}
