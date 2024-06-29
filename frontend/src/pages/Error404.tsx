import { ERROR } from '../constants/constants';

import '../css/pages/Error404.css';

/**
 * Error404 component that displays a 404 error message.
 */
function Error404() {
  /**
   * JSX content for the 404 error page.
   */
  const errorContent = (
    <div className='error-container'>
      <h1 className='error-text'>{ERROR.PAGE.NOT_FOUND}</h1>
    </div>
  );

  return errorContent;
}

export default Error404;
