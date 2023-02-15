import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const EditDialogue = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { id } = params;
  return <div>{t('page_titles.EditDialogue')}</div>;
};

export default EditDialogue;
