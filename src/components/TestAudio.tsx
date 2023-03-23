import { Typography } from '@mui/material';
import React from 'react';

const TestAudio = (props: { originalText: string; setTextDisabled: any }) => {
  const { originalText, setTextDisabled } = props;
  const splitText = (text: string, from: number, to: number) => {
    return [text.slice(0, from), text.slice(from, to), text.slice(to)];
  };

  const HighlightedText = (props: {
    text: string;
    from: number;
    to: number;
  }) => {
    const { text, from, to } = props;
    const [start, highlight, finish] = splitText(text, from, to);
    return (
      <Typography>
        {start}
        <span style={{ backgroundColor: 'yellow' }}>{highlight}</span>
        {finish}
      </Typography>
    );
  };

  const [highlightSection, setHighlightSection] = React.useState({
    from: 0,
    to: 0,
  });
  const handleClick = () => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error('no tts');
      return;
    }

    let utterance = new SpeechSynthesisUtterance(originalText);
    setTextDisabled(true);

    utterance.addEventListener('boundary', event => {
      const { charIndex, charLength } = event;
      setHighlightSection({ from: charIndex, to: charIndex + charLength });
    });
    synth.speak(utterance);
  };

  return <HighlightedText text={originalText} {...highlightSection} />;
};

export default TestAudio;
