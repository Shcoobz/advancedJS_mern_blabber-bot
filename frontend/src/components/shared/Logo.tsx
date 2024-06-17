import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import { NAVIGATION } from '../../constants/constants';
import { NAV_OPENAI_IMG } from '../../constants/assets';
import { INFO } from '../../constants/constants';

import '../../css/components/shared/Logo.css';

function Logo() {
  return (
    <div className='logo-container'>
      <Link to={NAVIGATION.HOME}>{NAV_OPENAI_IMG}</Link>
      <Typography className='logo-text'>
        <span>{INFO.TECH_DESC}</span> {INFO.HYPHEN} {INFO.PROJ_NAME}
      </Typography>
    </div>
  );
}

export default Logo;
