import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/styles';

function LoadingCircle() {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center">
      <CircularProgress size="4rem" color="inherit" style={{ color: theme.palette.mode === 'light' ? '#3582D8' : '#bf151d' }} />
    </Box>
  );
}

export default LoadingCircle;
