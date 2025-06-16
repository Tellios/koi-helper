import { Box } from '@mui/material';
import * as React from 'react';

interface IImageTileBarProps {
  title: string;
}

export const ImageTileBar: React.FunctionComponent<IImageTileBarProps> = ({ title }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        bottom: '40px',
        left: '0',
        right: '0',
        width: '240px',
        height: '40px',

        color: '#ffffff',
        backgroundColor: '#1b1b1bad',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span>{title}</span>
    </Box>
  );
};
