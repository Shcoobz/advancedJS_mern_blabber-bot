import { TypeAnimation } from 'react-type-animation';

import { SEQUENCE_DETAILS } from '../../constants/constants';

import '../../css/components/typer/TypingAnimation.css';

function TypingAnimation() {
  const animationSequence = [
    SEQUENCE_DETAILS.SEQ_1.message,
    SEQUENCE_DETAILS.SEQ_1.delay,
    SEQUENCE_DETAILS.SEQ_2.message,
    SEQUENCE_DETAILS.SEQ_2.delay,
    SEQUENCE_DETAILS.SEQ_3.message,
    SEQUENCE_DETAILS.SEQ_3.delay,
    SEQUENCE_DETAILS.SEQ_4.message,
    SEQUENCE_DETAILS.SEQ_4.delay,
  ];

  return (
    <TypeAnimation
      sequence={animationSequence}
      speed={50}
      className='typing-animation'
      repeat={Infinity}
    />
  );
}

export default TypingAnimation;
