import { Paper } from '@mui/material';
import * as React from 'react';

interface IListColumnProps {
  children: React.ReactNode;
}

export const ListCard: React.FC<IListColumnProps> = ({ children }) => {
  return (
    <Paper
      sx={{
        overflowY: 'auto',
        m: 1,
        minWidth: 280,
        flex: '1 1 0px',
      }}
    >
      {children}
    </Paper>
  );
};
