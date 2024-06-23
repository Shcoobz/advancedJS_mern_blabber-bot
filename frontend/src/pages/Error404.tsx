import { ERROR } from '../constants/constants';

import '../css/pages/Error404.css';

/**
 * Error404 component that displays a 404 error message.
 * This component is used to inform the user that the requested page was not found.
 * The message is styled to be prominently displayed and centered on the screen.
 *
 * @returns {JSX.Element} The JSX content for the 404 error page.
 */
function Error404() {
  /**
   * JSX content for the 404 error page.
   * The error message is dynamically loaded from constants for maintainability.
   */
  const errorContent = (
    <div className='error-container'>
      <h1 className='error-text'>{ERROR.PAGE.NOT_FOUND}</h1>
    </div>
  );

  return errorContent;
}

export default Error404;
