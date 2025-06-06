import { Box, SxProps, Theme, Typography } from '@mui/material';
import * as React from 'react';

export type ListHeaderTitleVariant = 'large' | 'small' | 'none';

export interface IListHeaderProps {
  title: string;
  actionArea?: React.ReactNode;
  titleVariant?: ListHeaderTitleVariant;
  sx?: SxProps<Theme>;
}

export const ListHeader: React.FunctionComponent<IListHeaderProps> = ({
  title,
  actionArea,
  titleVariant = 'large',
  sx
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        mt: 2,
        mb: 2,
        ...sx
      }}
    >
      {titleVariant !== 'none' && (
        <Typography variant={titleVariant === 'large' ? 'h4' : 'h6'}>{title}</Typography>
      )}

      {actionArea && (
        <Box
          sx={{
            marginLeft: 'auto',
            display: 'flex',
            alignContent: 'center'
          }}
        >
          {actionArea}
        </Box>
      )}
    </Box>
  );
};
