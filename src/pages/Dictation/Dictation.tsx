import Main from '../../components/Main';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { CreateTextProps } from './CreateDictation';
import { useFormik } from 'formik';
import useFormikHook from '../../hooks/FormikField';
import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import { languages } from '../../utils/constants/base';
import { speechRequest, translateRequest } from '../translator-requests';
import Speech from '../../components/Speech';
import CustomSpeech from '../../components/Speech';
import { get } from 'lodash';

const Dictation = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const { id } = params;
  const [translatedText, setTranslatedText] = useState('');
  const [speech, setSpeech] = useState('');

  // const [ourText, setOurText] = useState("")
  // const msg = new SpeechSynthesisUtterance()
  // msg.text = "Hello World"

  // useEffect(() => {
  //   window.speechSynthesis.speak(msg)
  // }, [msg])

  const initialValues: CreateTextProps = {
    title: '',
    type: 'dictation',
    isPublic: false,
    description: '',
    originalText: '',
    originalLanguage: 'en',
    translatedText: '',
    translatedLanguage: i18n.language,
    ownerId: 'a59278e0-b631-4ba2-9c18-b53d57c489eb',
    // users: [],
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

  useEffect(() => {
    console.log('useState translatedText', translatedText);
  }, [translatedText]);

  const translateText = useCallback(async () => {
    const { originalLanguage, originalText, translatedLanguage } =
      formik.values;
    const data = await translateRequest({
      from: originalLanguage,
      to: translatedLanguage,
      text: originalText,
    });
    console.log(' data.translatedText', data);
    setTranslatedText(() => get(data, 'translatedText', ''));
  }, [formik.values]);

  const startSpeech = async () => {
    const text = formik.values.originalText;

    const speechTemp = await speechRequest(text);
    // @ts-ignore
    setSpeech(() => '<mark>hello</mark>' + speechTemp.data);
  };

  return (
    <Main title={t('page_titles.Dictation')}>
      <div>Dictation {id}</div>
      <Box>
        <Select
          {...FormikField('originalLanguage')}
          label={t('fields.originalLanguage')}
          // onChange={handleChange}
          defaultValue="en"
          sx={{ ...fieldsStyle }}
        >
          {languages.map(lang => (
            <MenuItem value={lang.code}>{lang.code}</MenuItem>
          ))}
        </Select>
        <TextField
          {...FormikField('originalText')}
          label={t('fields.originalText')}
          sx={{ ...fieldsStyle }}
          multiline
          minRows={7}
        />
        <Select
          {...FormikField('translatedLanguage')}
          label={t('fields.translatedLanguage')}
          // onChange={handleChange}
          defaultValue={i18n.language}
          sx={{ ...fieldsStyle }}
        >
          {languages.map(lang => (
            <MenuItem value={lang.code}>{lang.code}</MenuItem>
          ))}
        </Select>
        <TextField
          // {...FormikField('translatedText')}
          label={t('fields.translatedText')}
          sx={{ ...fieldsStyle }}
          multiline
          minRows={7}
          value={translatedText}
          // @ts-ignore
          onChange={e => setTranslatedText(e.target)}
        />
        <Button onClick={translateText}>{t('buttons.translate')}</Button>

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
      </Box>
    </Main>
  );
};

export default Dictation;
