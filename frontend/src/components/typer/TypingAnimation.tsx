import { TypeAnimation } from 'react-type-animation';

function TypingAnimation() {
  return (
    <TypeAnimation
      sequence={[
        'Blabber Bot - Chat with your own AI',
        1000,
        'Blabber Bot - Built with OpenAI',
        2000,
        'Blabber Bot - Your own customized ChatGPT',
        1500,
      ]}
      speed={50}
      style={{
        fontSize: '60px',
        color: 'white',
        display: 'inline-block',
        textShadow: '1px 1px 20px #000',
      }}
      repeat={Infinity}
    />
  );
}

export default TypingAnimation;
