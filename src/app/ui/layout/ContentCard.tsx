import { Paper } from '@mui/material';
import * as React from 'react';
import { PropsWithChildren } from 'react';

interface ContentCardProps {
  children: React.ReactNode;
  id?: string;
  fillWidth?: boolean;
  fillHeight?: boolean;
  disableScroll?: boolean;
}

export const ContentCard = ({
  children,
  fillWidth,
  fillHeight,
  disableScroll,
  id,
}: PropsWithChildren<ContentCardProps>) => {
  return (
    <Paper
      id={id}
      component="section"
      sx={{
        m: 1,
        p: 2,
        flex: fillWidth ? '2 1 0px' : undefined,
        height: fillHeight ? '100%' : undefined,
        overflowY: disableScroll ? 'hidden' : 'auto',
      }}
    >
      {children}
    </Paper>
  );
};
