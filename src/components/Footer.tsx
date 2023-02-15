import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  const frontLibrariesList = ['React', 'Material UI', 'React Router', 'i18n'];
  const backLibrariesList = ['Nest', 'PostgreSQL', 'Sequelize', 'JWT'];

  return (
    <Box
      className="footer"
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'secondary.main',
        paddingTop: '1rem',
        paddingBottom: '0.57rem',
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="h6">
              Rikki Tikki Tavi
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle2">
              {frontLibrariesList.join(' | ')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle2">
              {backLibrariesList.join(' | ')}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
