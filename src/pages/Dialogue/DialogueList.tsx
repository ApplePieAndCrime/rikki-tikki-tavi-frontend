import Main from '../../components/Main';
import { DialogueProps } from '../../utils/constants/props';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getDialogueListRequest } from './requests';
import { Link } from 'react-router-dom';

const DialogueList = () => {
  const [dialogueList, setDialogueList] = useState<DialogueProps[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getDialogueListRequest().then(res => setDialogueList(res.data));
  }, []);

  return (
    <Main title={t('page_titles.DialogueList')}>
      <div>
        <Link to="/dialogues/2">Get</Link>
        <Link to="/dialogues/2/update">Update</Link>
        {dialogueList.length ? (
          dialogueList.map(dialogue => {
            return (
              <Box>
                {dialogue.id}:{dialogue.title}
              </Box>
            );
          })
        ) : (
          <>
            <Box>ничего нету</Box>
          </>
        )}
      </div>
    </Main>
  );
};

export default DialogueList;
