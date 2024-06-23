import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import { NAVIGATION, INFO } from '../../constants/constants';
import { NAV_OPENAI_IMG } from '../../constants/assets';

import '../../css/components/shared/Logo.css';

/**
 * Logo component displays the company logo along with some descriptive text.
 * This component is used for branding and navigation purposes.
 * @returns {JSX.Element} A logo component with navigational and descriptive text.
 */
function Logo(): JSX.Element {
  /**
   * logoContent holds the JSX for the logo and its accompanying text, providing a clickable image that
   * navigates to the home page and a description of the technology or project.
   */
  const logoContent = (
    <div className='logo-container'>
      <Link to={NAVIGATION.HOME}>{NAV_OPENAI_IMG}</Link>
      <Typography className='logo-text'>
        <span>{INFO.TECH_DESC}</span>
        {INFO.HYPHEN}
        {INFO.PROJ_NAME}
      </Typography>
    </div>
  );

  return logoContent;
}

export default Logo;
