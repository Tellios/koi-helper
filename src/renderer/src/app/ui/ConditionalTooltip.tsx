import { Tooltip } from '@mui/material';
import React from 'react';
import { PropsWithChildren } from 'react';

interface IConditionalTooltipProps {
  when: boolean;
  title: string;
}

export const ConditionalTooltip = ({
  when,
  title,
  children,
}: PropsWithChildren<IConditionalTooltipProps>) => {
  if (when === false) {
    return children;
  }

  return (
    <Tooltip title={title}>
      <>{children}</>
    </Tooltip>
  );
};
