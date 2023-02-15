import Main from '../../components/Main';
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CreateDictation from './CreateDictation';
import Dictation from './Dictation';
import { getTextListRequest } from '../text-requests';
import { TextProps } from '../../utils/constants/props';

const DictationList = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    getTextListRequest({ where: { type: 'dictation' } }).then(res =>
      // @ts-ignore
      setData(res)
    );
  }, []);

  return (
    <Main title={t('page_titles.DictationList')}>
      <div>DictationList</div>
      <Button variant="outlined" href="/dictations/create">
        create
      </Button>
      <Link to="/dictations/create">create 2</Link>
      <Link to="/dictations/434">get </Link>
      {data.map((text: TextProps) => (
        <Typography>{text.title}</Typography>
      ))}

      <List sx={{}}>
        {data.map((item: TextProps) => (
          <ListItem>
            <ListItemButton href={`/dictations/${item.id}`}>
              <Typography color="grey" variant="h4">
                {item.title}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Main>
  );
};

export default DictationList;
