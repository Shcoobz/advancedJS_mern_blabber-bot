import { SUCCESS } from '../constants/constants.js';

// Function to format server start message with dynamic port
export function getServerStartMessage(port) {
  const url = `${SUCCESS.SERVER.BASE_URL}${port}`;

  return SUCCESS.SERVER.START.replace('{{port}}', port).replace('{{url}}', url);
}
