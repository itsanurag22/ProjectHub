import React from 'react';
import {Box, CircularProgress} from '@mui/material';

export default function Progress() {
  return (
    <Box display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      <CircularProgress />
    </Box>
  );
}