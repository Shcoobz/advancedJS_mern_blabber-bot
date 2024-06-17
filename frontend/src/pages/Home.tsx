import { Box } from '@mui/material';
import TypingAnimation from '../components/typer/TypingAnimation';

import { HOME_CHAT_IMG, HOME_OPENAI_IMG, HOME_ROBOT_IMG } from '../constants/assets';
import Footer from '../components/footer/Footer';

import '../css/pages/Home.css';

function Home() {
  return (
    <Box className='container'>
      <Box className='typing-animation-container'>
        <Box>
          <TypingAnimation />
        </Box>
        <Box className='img-container'>
          {HOME_ROBOT_IMG}
          {HOME_OPENAI_IMG}
        </Box>
        <Box className='chat-container'>{HOME_CHAT_IMG}</Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default Home;
