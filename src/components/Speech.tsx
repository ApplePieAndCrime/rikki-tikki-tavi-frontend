import {
  RecordVoiceOverOutlined,
  SettingsOutlined,
  VoiceOverOff,
} from '@mui/icons-material';
import {
  Button,
  Box,
  IconButton,
  Typography,
  CardContent,
  Card,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// @ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';
import MediaControlCard from './MediaControlCard';
// @ts-ignore
// import ffmpeg from 'ffmpeg';

const CustomSpeech = (props: { text: string }) => {
  const { t } = useTranslation();
  const { text } = props;

  const onEnd = () => {
    setHighlightedText('');
  };

  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });

  const [value, setValue] = useState(0);
  const [highlightedText, setHighlightedText] = useState('');
  const [voiceIndex, setVoiceIndex] = useState(null);
  const [showSpeechSettings, setShowSpeechSettings] = useState(false);
  const voice = voices[voiceIndex] || null;
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);

  // const createMP3 = () => {
  //   try {
  //     // const uuid = randomUUID();
  //     const process = new ffmpeg(`/public/blob/hello`);
  //     process.then((audio: any) => {
  //       audio
  //         .fnExtractSoundToMP3(`/public/mp3/hello`, (error: any, file: any) => {
  //           if (!error) {
  //             console.log('Audio file: ', file);
  //           }
  //         })
  //         .catch((err: any) => {
  //           console.log('Error: ', +err);
  //         });
  //     });
  //   } catch (e: any) {
  //     console.log('Common file error: ', { code: e.code, msg: e.msg });
  //   }
  // };

  var contentType = 'audio/mpeg';

  // const play = () => {
  //   new Audio(sound).play();
  // };

  // useEffect(() => {
  //   play();
  // }, [value]);

  return (
    <Box>
      {/* <Button onClick={() => setValue(prev => prev + 1)}>
        {t('buttons.voice')}
      </Button> */}
      {/* <Speech text={text} />
      <AudioPlayer */}
      {/* <Button onClick={() => speak({ text })}>Speak</Button> */}
      {supported && (
        <div className="speechMenu">
          {!speaking ? (
            <RecordVoiceOverOutlined
              onClick={() => speak({ text, voice, rate, pitch })}
            />
          ) : (
            <VoiceOverOff onClick={cancel} />
          )}
          <SettingsOutlined onClick={() => setShowSpeechSettings(true)} />
        </div>
      )}
      {showSpeechSettings && (
        <div className="speechSettings">
          <select
            name="voice"
            value={voiceIndex || ''}
            onChange={(e: any) => {
              setVoiceIndex(e.target.value);
            }}
          >
            {voices.map((option: any, index: any) => (
              <option key={option.voiceURI} value={index}>
                {`${option.lang} - ${option.name} ${
                  option.default ? '- Default' : ''
                }`}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="rangeContainer">
        <div>
          <label htmlFor="rate">Rate: </label>
          <span>{rate}</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e: any) => {
            setRate(e.target.value);
          }}
        />
      </div>
      <div className="rangeContainer">
        <div>
          <label htmlFor="pitch">Pitch: </label>
          <span>{pitch}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={pitch}
          id="pitch"
          onChange={(event: any) => {
            setPitch(event.target.value);
          }}
        />
      </div>

      {/* <MediaControlCard /> */}
    </Box>
  );
};

export default CustomSpeech;
