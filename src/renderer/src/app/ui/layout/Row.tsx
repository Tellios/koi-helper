import { Box } from '@mui/material';
import React from 'react';

export const Row: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        width: '100%'
      }}
    >
      {children}
    </Box>
  );
};
