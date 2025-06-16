import { Paper } from '@mui/material';
import * as React from 'react';

interface IContentColumnProps {
  children: React.ReactNode;
  fillWidth?: boolean;
  disableScroll?: boolean;
}

export const ContentCard: React.FC<IContentColumnProps> = ({
  children,
  fillWidth,
  disableScroll,
}) => {
  return (
    <Paper
      sx={{
        overflowY: 'auto',
        m: 1,
        p: 2,
        ...(fillWidth ? { flex: '2 1 0px' } : undefined),
        ...(disableScroll ? { overflowY: 'hidden' } : undefined),
      }}
    >
      {children}
    </Paper>
  );
};
