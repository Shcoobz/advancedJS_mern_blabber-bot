import { IoIosLogIn } from 'react-icons/io';

/**
 * This file contains constant definitions for icons and images used throughout the application.
 */

/**
 * Icon for the submit button, represented using IoIosLogIn from react-icons.
 */
export const SUBMIT_ICON = (
  <span className='submit-icon'>
    <IoIosLogIn />
  </span>
);

/**
 * Image for the navigation bar's OpenAI logo, styled with inversion and specific classes.
 */
export const NAV_OPENAI_IMG = (
  <img src='openai.png' alt='openai' className='logo-inverted logo-image' />
);

/**
 * Image of a robot used on the home page.
 */
export const HOME_ROBOT_IMG = <img src='robot.png' alt='robot' className='img' />;

/**
 * Inverted image of the OpenAI logo used on the home page, styled with rotation.
 */
export const HOME_OPENAI_IMG = (
  <img src='openai.png' alt='openai' className='img image-inverted rotate' />
);

/**
 * Image of a chatbot used on the home page.
 */
export const HOME_CHAT_IMG = <img src='chat.png' alt='chatbot' className='chat-image' />;

/**
 * Greeting robot image used on the login/signup page.
 */
export const GREETING_ROBOT_IMG = (
  <img src='airobot.png' alt='Robot' className='robot-image' />
);

/**
 * Chat avatar image used in the chat interface.
 */
export const CHAT_AVATAR = (
  <img src='openai.png' alt='openai' className='chat-avatar-image' />
);
