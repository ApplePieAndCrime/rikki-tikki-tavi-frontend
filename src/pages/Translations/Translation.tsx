import Main from '../../components/Main';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { CreateTextProps } from './CreateTranslation';
import { useFormik } from 'formik';
import useFormikHook from '../../hooks/FormikField';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { languages } from '../../utils/constants/base';
import { speechRequest, translateRequest } from '../translator-requests';
import Speech from '../../components/Speech';
import _, { get } from 'lodash';
import { updateOneTextRequest } from '../text-requests';
import CustomSpeech from '../../components/Speech';
import MediaControlCard from '../../components/MediaControlCard';
import { HighlightedText } from '../../components/MediaControlCard';
import { getOneTextByIdRequest } from '../text-requests';
import TestAudio from '../../components/TestAudio';

const Translation = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const { id = '' } = params;
  const [translatedText, setTranslatedText] = useState('');
  const [userText, setUserText] = useState('');
  const [textWithErrors, setTextWithErrors] = useState('');
  const [errorsCount, setErrorsCount] = useState(0);
  const [isOriginalInputDisabled, setOriginalInputDisabled] = useState(false);
  const [highlightedText, setHighlightedText] = useState('');

  // const [ourText, setOurText] = useState("")
  // const msg = new SpeechSynthesisUtterance()
  // msg.text = "Hello World"

  // useEffect(() => {
  //   window.speechSynthesis.speak(msg)
  // }, [msg])

  const initialValues: CreateTextProps = {
    title: '',
    type: 'translation',
    isPublic: false,
    description: '',
    originalText: '',
    originalLanguage: 'en',
    translatedText: '',
    translatedLanguage: i18n.language,
    ownerId: 'a59278e0-b631-4ba2-9c18-b53d57c489eb',
    imageUrl: 'random',
    // users: [],
  };

  const createMarkup = (html: string) => {
    return {
      __html: html,
    };
  };

  const onSubmit = (values: CreateTextProps) => {
    // console.log({ formik });
    console.log({ values });
    alert(`formik values ${JSON.stringify(values)}`);
    return Promise.resolve();
  };

  const formik = useFormik({
    initialValues,
    // validate,
    onSubmit,
    validateOnMount: true,
  });

  const { FormikField } = useFormikHook(formik);

  const fieldsStyle = {
    margin: '10px 20px',
  };

  const selectsStyle = {
    height: '30px',
  };

  // useEffect(()=>
  // edit
  // ,[])

  useEffect(() => {
    // @ts-ignore
    getOneTextByIdRequest(id).then(data => {
      console.log('get one', data);
      formik.setValues(data);
      // const obj = Object.keys(data).map(key => {
      //   formik.setFieldTouched(key);
      // });
      // formik.setTouched(obj);
    });
  }, [id]);

  useEffect(() => {
    console.log('useState translatedText', translatedText);
  }, [translatedText]);

  const saveBtn = useCallback((id: string, updatedData: object) => {
    console.log({ updatedData });
    updateOneTextRequest(id, updatedData).then(data =>
      console.log('updated data')
    );
  }, []);

  const compareTexts = useCallback((correctText: string, userText: string) => {
    // const { originalText } = formik.values;
    // const userText =  userTranslatedText;
    const regexForWords = /(?!( |, |! |. ).)/;

    // const translatedWords = correctText.split(regexForWords);
    // const userWords = userText.split(regexForWords);

    const parseUserText = userText.split(' ');
    const parseCorrectText = correctText.split(' ');

    const textCompare = parseUserText.reduce((prev, current, i) => {
      // const onlyUserWord = current.match(regexForWords);

      // // _.get(current.match(regexForWords)[0], '');
      // const onlyTranslatedWord = parseCorrectText[i].match(regexForWords);

      // if(onlyUser)

      // console.log({ onlyUserWord, onlyTranslatedWord });

      console.log({
        userText: current.toLowerCase(),
        correctText: parseCorrectText[i].toLowerCase(),
      });

      if (current.toLowerCase() === parseCorrectText[i].toLowerCase())
        return prev + parseCorrectText[i] + ' ';

      setErrorsCount(prev => prev++);
      return (
        prev +
        '<span style="background:red;color:white">' +
        parseCorrectText[i] +
        ' ' +
        '</span>'
      );
    }, '');
    setTextWithErrors(textCompare);

    console.log({ textCompare });

    // console.log({ translatedWords, userWords });
  }, []);

  const translateText = useCallback(async () => {
    const { originalLanguage, originalText, translatedLanguage } =
      formik.values;
    const data = await translateRequest({
      from: originalLanguage,
      to: translatedLanguage,
      text: originalText,
    });
    console.log(' data.translatedText', data);
    // setTranslatedText(() => data.translatedText);
    compareTexts(get(data, 'data.translatedText', ''), userText);
  }, [compareTexts, formik.values, userText]);

  // const startSpeech = async () => {
  //   const text = formik.values.originalText;

  //   const speechTemp = await speechRequest(text);
  //   // @ts-ignore
  //   setSpeech(() => speechTemp.data);
  // };

  return (
    <Main title={t('page_titles.Translation')}>
      <Box height="60%" textAlign="center" marginLeft={3} marginTop={2}>
        <Box
          marginBottom={5}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <MediaControlCard
            title={formik.values.title}
            text={formik.values.originalText}
            imageUrl={formik.values.imageUrl}
            setTextDisabled={() => setOriginalInputDisabled(true)}
            setImageUrl={(url: string) => {
              console.log('setImage');
              formik.setFieldValue('imageUrl', url);
              formik.setFieldTouched('imageUrl');
            }}
          />
          <Box>
            <Button onClick={translateText}>{t('buttons.translate')}</Button>
            <Button onClick={() => saveBtn(id, formik.values)}>
              {t('buttons.save')}
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          // flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Select
              {...FormikField('originalLanguage')}
              label={t('fields.originalLanguage')}
              // onChange={handleChange}
              defaultValue="en"
              sx={{ ...fieldsStyle, ...selectsStyle }}
            >
              {languages.map(lang => (
                <MenuItem value={lang.code}>{lang.code}</MenuItem>
              ))}
            </Select>
            {!isOriginalInputDisabled ? (
              <TextField
                {...FormikField('originalText')}
                label={t('fields.originalText')}
                sx={{ ...fieldsStyle }}
                multiline
                minRows={7}
              />
            ) : (
              <TestAudio
                originalText={formik.values.originalText}
                setTextDisabled={setOriginalInputDisabled}
              />
            )}
          </Box>
          <Box>
            <Select
              {...FormikField('translatedLanguage')}
              label={t('fields.translatedLanguage')}
              // onChange={handleChange}
              defaultValue={i18n.language}
              sx={{ ...fieldsStyle, ...selectsStyle }}
            >
              {languages.map(lang => (
                <MenuItem value={lang.code}>{lang.code}</MenuItem>
              ))}
            </Select>
            <TextField
              // {...FormikField('translatedText')}
              {...FormikField('userText')}
              label={t('fields.yourText')}
              sx={{ ...fieldsStyle }}
              multiline
              minRows={7}
              value={userText}
              // @ts-ignore
              onChange={e => setUserText(e.target.value)}
            />
          </Box>
          <Typography
            // {...FormikField('translatedText')}
            // label={t('fields.translatedText')}
            sx={{ ...fieldsStyle }}
            variant="body1"
            dangerouslySetInnerHTML={createMarkup(textWithErrors)}

            // value={textWithErrors}

            // @ts-ignore
            // onChange={e => compareTexts(e.target)}
          >
            {/* <span dangerouslySetInnerHTML={createMarkup(textWithErrors)}></span> */}
          </Typography>

          <CustomSpeech text={formik.values.originalText} />
          {/* <Select
            label={t('fields.originalLanguage')}
            // onChange={handleChange}
            sx={{ ...fieldsStyle }}
            defaultValue="en"
          >
            {languages.map(lang => (
              <MenuItem value={lang.code}>{lang.code}</MenuItem>
            ))}
          </Select> */}
          <Typography variant="h3" color="red">
            Errors: {errorsCount}
          </Typography>
        </Box>
      </Box>
    </Main>
  );
};

export default Translation;
