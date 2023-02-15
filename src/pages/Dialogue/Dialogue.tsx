import Main from '../../components/Main';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const Dialogue = () => {
  const params = useParams();
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = params;
  return <Main title={t('page_titles.Dialogue')}>Dialogue {id}</Main>;
};

export default Dialogue;
