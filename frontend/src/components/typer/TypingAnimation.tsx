import { TypeAnimation } from 'react-type-animation';

import {
  DELAY_1,
  DELAY_2,
  DELAY_3,
  DELAY_4,
  SEQUENCE_1,
  SEQUENCE_2,
  SEQUENCE_3,
  SEQUENCE_4,
} from '../../constants/constants';

import '../../css/components/typer/TypingAnimation.css';

function TypingAnimation() {
  return (
    <TypeAnimation
      sequence={[
        SEQUENCE_1,
        DELAY_1,
        SEQUENCE_2,
        DELAY_2,
        SEQUENCE_3,
        DELAY_3,
        SEQUENCE_4,
        DELAY_4,
      ]}
      speed={50}
      className='typing-animation'
      repeat={Infinity}
    />
  );
}

export default TypingAnimation;
