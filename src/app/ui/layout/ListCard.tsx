import { Paper } from '@mui/material';
import * as React from 'react';

interface IListColumnProps {
  children: React.ReactNode;
}

export const ListCard: React.FC<IListColumnProps> = ({ children }) => {
  return (
    <Paper
      className="list-card"
      sx={{
        overflowY: 'auto',
        m: 1,
        mt: 0.75,
        pt: 2,
        px: 2,
        minWidth: 280,
        flex: '1 1 0px',
        borderRadius: 4,
      }}
    >
      {children}
    </Paper>
  );
};
