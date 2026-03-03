import { Typography } from '@mui/material';
import * as React from 'react';

interface IMeasureDiff {
  newValue: number;
  oldValue?: number;
}

type DiffType = 'Increase' | 'Decrease' | 'NoChange';

export const MeasureDiff: React.FC<IMeasureDiff> = ({ newValue, oldValue }) => {
  const diff = Math.round((newValue - (oldValue ?? newValue)) * 1e10) / 1e10;

  let diffType: DiffType = 'NoChange';

  if (diff > 0) {
    diffType = 'Increase';
  } else if (diff < 0) {
    diffType = 'Decrease';
  }

  let text: string = '';

  if (diffType !== 'NoChange') {
    text += '(';

    if (diffType === 'Increase') {
      text += '+';
    } else if (diffType === 'Decrease') {
      text += '-';
    }

    text += Math.abs(diff);
    text += ')';
  }

  return <Typography color="textSecondary">{text}</Typography>;
};
