import Main from '../../components/Main';
import useFormikHook from '../../hooks/FormikField';
import { Formik, useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TextProps } from '../../utils/constants/props';
import i18n from '../../i18n';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import { StyleOptions } from '@mui/system';
import { languages } from '../../utils/constants/base';
import { createTextRequest } from '../text-requests';
import { useNavigate } from 'react-router-dom';

export type CreateTextProps = Omit<TextProps, 'id'>;

const CreateTranslations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  //   const validate = useCallback(values => {
  //     const errors = {};

  //     const tryValidate = () => {
  //       const requiredFields = ['name'];
  //       const emptyFields = requiredFields.filter(field => !values[field]);
  //       if (emptyFields.length) {
  //         emptyFields.forEach(field => (errors[field] = 'Нужно заполнить'));
  //         return;
  //       }
  //     };
  //     tryValidate();

  //     return errors;
  //   }, []);

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
    // users: [],
  };

  const onSubmit = async (values: CreateTextProps) => {
    // console.log({ formik });
    console.log({ values });
    alert(`formik values ${JSON.stringify(values)}`);
    const created = await createTextRequest(values);
    // @ts-ignore
    navigate(`/translations/${created.id}`);
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

  return (
    <Main title={t('page_titles.CreateTranslations')}>
      <Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            {...FormikField('title')}
            label={t('fields.title')}
            sx={{ ...fieldsStyle }}
          />
          <TextField
            {...FormikField('description')}
            label={t('fields.description')}
            sx={{ ...fieldsStyle }}
            multiline
            minRows={5}
          />
          <FormControlLabel
            control={<CheckBox />}
            {...FormikField('isPublic')}
            label={t('fields.IsPublic')}
            sx={{ ...fieldsStyle }}
          />

          <Button
            type="submit"
            variant="contained"
            // @ts-ignore
            disabled={formik.errors.length}
            // @ts-ignore
            onClick={() => formik.handleSubmit(formik.values)}
            // onClick={formik.handleSubmit}
            sx={{
              // backgroundColor: 'primary.main',
              // color: 'white',
              width: '100px',
              marginTop: '10px',
            }}
          >
            {t('buttons.Create')}
          </Button>
        </Box>
      </Box>
    </Main>
  );
};

export default CreateTranslations;
