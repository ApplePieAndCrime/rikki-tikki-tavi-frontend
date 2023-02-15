import React, { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { getRandomImage } from '../pages/different-requests';
import { get, isNull } from 'lodash';

const MediaControlCard = (props: {
  title: string;
  imageUrl: string | undefined;
  setImageUrl: any;
}) => {
  const theme = useTheme();
  const { title, imageUrl, setImageUrl } = props;

  useEffect(() => {
    if (isNull(imageUrl)) {
      getRandomImage().then(res => {
        console.log({ imageInfo: res });
        const extendedUrl = get(res, 'request.responseURL', '');

        if (extendedUrl) setImageUrl(extendedUrl);
      });
    }
  }, [imageUrl, setImageUrl]);

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" paddingBottom={5}>
            {title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pl: 1,
              pb: 1,
            }}
          >
            <IconButton aria-label="previous">
              {theme.direction === 'rtl' ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === 'rtl' ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </Box>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 300, height: 200 }}
          image={imageUrl}
          alt="Live from space album cover"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Mac Miller
          </Typography>
        </CardContent> */}
      </Box>
    </Card>
  );
};

export default MediaControlCard;
