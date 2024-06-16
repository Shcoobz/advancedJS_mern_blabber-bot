import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import { NAVIGATION } from '../../constants/navigation';
import { NAV_OPENAI_IMG } from '../../constants/images';
import { HYPHEN, PROJ_NAME, TECH_DESC } from '../../constants/constants';

import '../../css/components/shared/Logo.css';

function Logo() {
  return (
    <div className='logo-container'>
      <Link to={NAVIGATION.HOME}>{NAV_OPENAI_IMG}</Link>
      <Typography className='logo-text'>
        <span>{TECH_DESC}</span> {HYPHEN} {PROJ_NAME}
      </Typography>
    </div>
  );
}

export default Logo;
