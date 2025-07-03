import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';

export interface RowProps {
  fillHeight?: boolean;
}

export const Row = ({ children, fillHeight }: PropsWithChildren<RowProps>) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        width: '100%',
        height: fillHeight ? '100%' : undefined,
      }}
    >
      {children}
    </Box>
  );
};
