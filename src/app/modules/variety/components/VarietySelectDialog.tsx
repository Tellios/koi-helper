import { t } from '@app/i18n';
import { useAppState } from '@app/state';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { IVariety, Id } from '@shared/models';
import * as React from 'react';
import { VarietyButton } from './VarietyButton';

interface IVarietySelectDialogProps {
  open: boolean;
  selectedVariety?: Id;
  onSelected: (variety: IVariety) => void;
  onClose: () => void;
}

export const VarietySelectDialog: React.FC<IVarietySelectDialogProps> = ({
  open,
  selectedVariety,
  onSelected,
  onClose,
}) => {
  const { varieties } = useAppState();

  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <DialogTitle>{t.variety.selectDialogHeader}</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {varieties.map((v) => (
          <VarietyButton
            key={v.id}
            sx={{
              mb: 1,
            }}
            variety={v}
            color={selectedVariety === v.id ? 'info' : 'default'}
            onClick={() => {
              onSelected(v);
              onClose();
            }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          {t.common.cancelAction}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
