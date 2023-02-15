import Main from '../../components/Main';
import {
  Button,
  CardMedia,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CreateTranslation from './CreateTranslation';
import Translation from './Translation';
import { getTextListRequest } from '../text-requests';
import { TextProps } from '../../utils/constants/props';

const TranslationList = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    getTextListRequest({ where: { type: 'translation' } }).then(res =>
      // @ts-ignore
      setData(res)
    );
  }, []);

  return (
    <Main title={t('page_titles.TranslationList')}>
      <div>TranslationList</div>
      <Button variant="outlined" href="/translations/create">
        create
      </Button>
      <Link to="/translations/create">create 2</Link>
      <Link to="/translations/434">get </Link>
      {data.map((text: TextProps) => (
        <Typography>{text.title}</Typography>
      ))}

      <List>
        {data.map((item: TextProps) => (
          <ListItem>
            <CardMedia
              component="img"
              sx={{ width: 70, height: 70 }}
              image={item.imageUrl || '../images/no-camera.png'}
              alt=""
            />
            <ListItemButton href={`/translations/${item.id}`}>
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

export default TranslationList;
