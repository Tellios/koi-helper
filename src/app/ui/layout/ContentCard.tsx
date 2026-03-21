import { Paper } from '@mui/material';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { motion } from 'motion/react';

const MotionPaper = motion.create(Paper);

interface ContentCardProps {
  children: React.ReactNode;
  id?: string;
  fillWidth?: boolean;
  fillHeight?: boolean;
  disableScroll?: boolean;
  animate?: boolean;
}

export const ContentCard = ({
  children,
  fillWidth,
  fillHeight,
  disableScroll,
  id,
  animate = false,
}: PropsWithChildren<ContentCardProps>) => {
  return (
    <MotionPaper
      id={id}
      className="content-card"
      initial={animate ? { opacity: 0, x: 40 } : false}
      animate={animate ? { opacity: 1, x: 0 } : undefined}
      sx={{
        m: 1,
        p: 2,
        flex: fillWidth ? '2 1 0px' : undefined,
        height: fillHeight ? '100%' : undefined,
        overflowY: disableScroll ? 'hidden' : 'auto',
        borderRadius: 4,
      }}
    >
      {children}
    </MotionPaper>
  );
};
