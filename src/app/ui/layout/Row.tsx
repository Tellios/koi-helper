import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';

export interface RowProps {
  fillHeight?: boolean;
}

export const Row = ({ children, fillHeight }: PropsWithChildren<RowProps>) => {
  return (
    <Box
      className="row"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        width: '100%',
        height: fillHeight ? '100%' : undefined,
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  );
};
