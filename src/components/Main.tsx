import { Box } from '@mui/material';
import React, { useMemo } from 'react';

import { PropsWithChildren } from 'react';

import Footer from './Footer';
import Header from './Header';

export interface IFooBarComponentProps {
  title: string;
}

const Main = (props: PropsWithChildren<IFooBarComponentProps>) => {
  const { title, children } = props;

  const changedTitle = useMemo(()=>title,[title])

  return (
    <>
      <Header title={changedTitle} />
      <Box
        className="body-content"
        padding="10px 0"
        height="80vh"
        display="flex"
        flexDirection="column"
        width="100%"
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Main;
