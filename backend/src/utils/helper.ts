import { SUCCESS } from '../constants/constants.js';

// Function to format server start message with dynamic port
// export function getServerStartMessage(port) {
//   const url = `${process.env.BASE_URL}${port}`;

//   return SUCCESS.SERVER.START.replace('{{port}}', port).replace('{{url}}', url);
// }

export function getServerStartMessage() {
  const baseUrl = process.env.BASE_URL;
  return `Server listening && connected to Database! Visit: ${baseUrl}`;
}
