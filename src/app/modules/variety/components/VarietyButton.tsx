import { t } from '@shared/i18n';
import { ImageProfile } from '@app/modules/image';
import { Pets } from '@mui/icons-material';
import { Box, Button, SxProps, Theme, Typography } from '@mui/material';
import { IVariety } from '@shared/models';
import * as React from 'react';

interface IVarietyButtonProps {
  variety?: IVariety;
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'error' | 'warning' | 'default';
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export const VarietyButton: React.FC<IVarietyButtonProps> = ({ variety, color, onClick, sx }) => {
  return (
    <Button
      sx={{
        textTransform: 'none',
        minWidth: 260,
        display: 'flex',
        justifyContent: 'flex-start',
        ...sx,
      }}
      color={color === 'default' ? undefined : color}
      variant="outlined"
      onClick={onClick}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        {variety && (
          <>
            <ImageProfile referenceId={variety.id} fallback={<Pets />} />
            <Typography sx={{ ml: 1 }}>{variety.name}</Typography>
          </>
        )}
        {variety === undefined && <Typography>{t.variety.notSelected}</Typography>}
      </Box>
    </Button>
  );
};
