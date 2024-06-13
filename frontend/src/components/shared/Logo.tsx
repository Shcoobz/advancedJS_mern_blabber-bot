import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import '../../css/components/shared/Logo.css';

function Logo() {
  return (
    <div className='logo-container'>
      <Link to={'/'}>
        <img src='openai.png' alt='openai' className='logo-inverted logo-image' />
      </Link>

      <Typography className='logo-text'>
        <span>MERN</span> - Blabber Bot
      </Typography>
    </div>
  );
}

export default Logo;
