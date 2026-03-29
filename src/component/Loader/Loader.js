import React from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

// loader style
const LoaderWrapper = styled('div')(() => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2001
}));

// ==============================|| LOADER ||============================== //

const Loader = () => {
  return (
    <LoaderWrapper>
      <CircularProgress color="secondary" />
    </LoaderWrapper>
  );
};

export default Loader;
