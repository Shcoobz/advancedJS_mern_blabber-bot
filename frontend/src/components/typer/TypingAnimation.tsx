import { TypeAnimation } from 'react-type-animation';

import { SEQUENCE_DETAILS } from '../../constants/constants';

import '../../css/components/typer/TypingAnimation.css';

/**
 * TypingAnimation component to display a typewriter effect with multiple messages and delays.
 * Uses the TypeAnimation component from 'react-type-animation' to create an infinite typing effect.
 */
function TypingAnimation() {
  /**
   * animationSequence defines a list of messages and delays that create a typewriter effect.
   * This array alternates between messages to type and the delay before removing the text and typing the next message.
   */
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

  /**
   * Defines the TypeAnimation component with configured properties for an infinite typing animation.
   * This encapsulates all settings including speed, sequence, and styling within a single variable.
   */
  const typingAnimation = (
    <TypeAnimation
      sequence={animationSequence}
      speed={50}
      className='typing-animation'
      repeat={Infinity}
    />
  );

  return typingAnimation;
}

export default TypingAnimation;
