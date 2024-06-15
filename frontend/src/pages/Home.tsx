import { Box } from '@mui/material';
import TypingAnimation from '../components/typer/TypingAnimation';

import { chatImage, openAIImage, robotImage } from '../constants/images';
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
          {robotImage}
          {openAIImage}
        </Box>
        <Box className='chat-container'>{chatImage}</Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
