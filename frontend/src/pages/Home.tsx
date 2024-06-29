import { Box } from '@mui/material';
import TypingAnimation from '../components/typer/TypingAnimation';

import { HOME_CHAT_IMG, HOME_OPENAI_IMG, HOME_ROBOT_IMG } from '../constants/assets';
import Footer from '../components/footer/Footer';

import '../css/pages/Home.css';

/**
 * Home component that renders the homepage of the application.
 * The homepage includes a typing animation, several images, a project screenshot, and a footer.
 */
function Home() {
  /**
   * JSX content for the typing animation section.
   * This section includes the TypingAnimation component wrapped in a Box.
   */
  const typingAnimation = (
    <Box>
      <TypingAnimation />
    </Box>
  );

  /**
   * JSX content for the images section.
   * This section includes the HOME_ROBOT_IMG and HOME_OPENAI_IMG wrapped in a Box with the class 'img-container'.
   */
  const images = (
    <Box className='img-container'>
      {HOME_ROBOT_IMG}
      {HOME_OPENAI_IMG}
    </Box>
  );

  /**
   * JSX content for the project screenshot section.
   * This section includes the HOME_CHAT_IMG wrapped in a Box with the class 'chat-container'.
   */
  const projectScreenshot = <Box className='chat-container'>{HOME_CHAT_IMG}</Box>;

  /**
   * JSX content for the entire Home component.
   * This section includes the typing animation, images, project screenshot, and footer, all wrapped in a Box with the class 'container'.
   */
  const content = (
    <Box className='container'>
      <Box className='home-screen'>
        {typingAnimation}
        {images}
        {projectScreenshot}
        <Footer />
      </Box>
    </Box>
  );

  return content;
}

export default Home;
