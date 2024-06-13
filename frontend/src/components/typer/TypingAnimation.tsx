import { TypeAnimation } from 'react-type-animation';
import '../../css/components/typer/TypingAnimation.css';

function TypingAnimation() {
  return (
    <TypeAnimation
      sequence={[
        'Blabber Bot - AI at your fingertips',
        1000,
        'Blabber Bot - Experience advanced AI chat',
        2000,
        'Blabber Bot - Powered by Chat GPT 3.5',
        1500,
        'Blabber Bot - Build by Shcoobz',
        2000,
      ]}
      speed={50}
      className='typing-animation'
      repeat={Infinity}
    />
  );
}

export default TypingAnimation;
