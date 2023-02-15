import Main from '../../../components/Main';
import { t } from 'i18next';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Divider,
  IconProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconClasses,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { CommonProps } from '@mui/material/OverridableComponent';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import AudioFileIcon from '@mui/icons-material/AudioFile';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const Home = () => {
  // let { id = '' } = useParams();
  const { t } = useTranslation();
  // console.log({ home: id });
  const translated = t('page_titles.Home');
  console.log({ translated });

  const menuItemProps = { fontSize: 'large' };
  const menu = [
    {
      name: t('menu_names.Dialogues'),
      link: '/dialogues',
      icon: (props: any) => <Diversity1Icon {...props} />,
    },
    {
      name: t('menu_names.Dictation'),
      link: '/dictations',
      icon: (props: any) => <HeadsetMicIcon {...props} />,
    },
    {
      name: t('menu_names.Translations'),
      link: '/translations',
      icon: (props: any) => <HistoryEduIcon {...props} />,
    },
    {
      name: t('menu_names.Comics'),
      link: '/comics',
      icon: (props: any) => <LocalLibraryIcon {...props} />,
    },
  ];

  return (
    <Main title={t('page_titles.Home')}>
      <Box
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%', height: '100%' }}
      >
        <List sx={{}}>
          {menu.map(item => (
            <ListItem>
              <ListItemButton href={item.link}>
                <ListItemIcon>
                  {item.icon({
                    fontSize: 'large',
                    sx: { color: 'grey' },
                  })}
                </ListItemIcon>
                <Typography color="grey" variant="h4">
                  {item.name}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}

          {/* <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem> */}
        </List>
      </Box>
    </Main>
  );
};

export default Home;
