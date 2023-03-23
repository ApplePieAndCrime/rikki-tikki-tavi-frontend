import React, { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { getRandomImage } from '../pages/different-requests';
import { get, isNull } from 'lodash';
// @ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';
import { VolumeDown, VolumeDownOutlined, VolumeUp } from '@mui/icons-material';
import { Slider, Stack } from '@mui/material';

const splitText = (text: string, from: number, to: number) => {
  return [text.slice(0, from), text.slice(from, to), text.slice(to)];
};

export const HighlightedText = (props: {
  text: string;
  from: number;
  to: number;
}) => {
  const { text, from, to } = props;
  const [start, highlight, finish] = splitText(text, from, to);
  return (
    <p>
      {start}
      <span style={{ backgroundColor: 'yellow' }}>{highlight}</span>
      {finish}
    </p>
  );
};

const MediaControlCard = (props: {
  title: string;
  imageUrl: string | undefined;
  setImageUrl: any;
  text: string;
  setTextDisabled: any;
}) => {
  const theme = useTheme();
  const { title, imageUrl, setImageUrl, text, setTextDisabled } = props;

  const onEnd = () => {
    setHighlightedText('');
  };

  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });
  const [pitch, setPitch] = useState(1);
  const [isStartSpeaking, setStartSpeaking] = useState(true);
  const [rate, setRate] = useState(1);
  const [highlightedText, setHighlightedText] = useState('');
  const [voiceIndex, setVoiceIndex] = useState(null);
  const [highlightSection, setHighlightSection] = React.useState({
    from: 0,
    to: 0,
  });

  const startSpeak = () => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error('no tts');
      return;
    }

    let utterance = new SpeechSynthesisUtterance(text);
    setTextDisabled(true);

    utterance.addEventListener('boundary', event => {
      const { charIndex, charLength } = event;
      setHighlightSection({ from: charIndex, to: charIndex + charLength });
    });

    synth.speak(utterance);
  };

  useEffect(() => {
    if (isNull(imageUrl)) {
      getRandomImage().then(res => {
        console.log({ imageInfo: res });
        const extendedUrl = get(res, 'request.responseURL', '');

        if (extendedUrl) setImageUrl(extendedUrl);
      });
    }
  }, [imageUrl, setImageUrl]);

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" paddingBottom={5}>
            {title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pl: 1,
              pb: 1,
            }}
          >
            <Box>
              <IconButton aria-label="previous">
                {theme.direction === 'rtl' ? (
                  <SkipNextIcon />
                ) : (
                  <SkipPreviousIcon />
                )}
              </IconButton>
              <IconButton aria-label="play/pause">
                {isStartSpeaking ? (
                  <PlayArrowIcon
                    sx={{ height: 38, width: 38 }}
                    onClick={() => {
                      startSpeak();
                    }}
                  />
                ) : (
                  <PauseIcon
                    sx={{ height: 38, width: 38 }}
                    onClick={() => {
                      setStartSpeaking(false);
                      speechSynthesis.pause();
                    }}
                  />
                )}
              </IconButton>
              <IconButton aria-label="next">
                {theme.direction === 'rtl' ? (
                  <SkipPreviousIcon />
                ) : (
                  <SkipNextIcon />
                )}
              </IconButton>
            </Box>
          </Box>
          <Box>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <VolumeDown />
              <Slider
                aria-label="Volume"
                value={rate}
                step={0.1}
                marks
                min={0}
                max={2}
                onChange={(e: any) => setRate(e.target.value)}
              />
              <VolumeUp />
            </Stack>
          </Box>
          <Box>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <Slider
                aria-label="Volume"
                value={rate}
                step={0.1}
                marks
                min={0}
                max={2}
                onChange={(e: any) => setRate(e.target.value)}
              />
            </Stack>
          </Box>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 300, height: 200 }}
          image={imageUrl}
          alt="Live from space album cover"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Mac Miller
          </Typography>
        </CardContent> */}
      </Box>
    </Card>
  );
};

export default MediaControlCard;
