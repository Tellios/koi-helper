import { t } from '@app/i18n';
import { useAppState } from '@app/state';
import { IVariety, Id } from '@app/storage';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
  const [newVariety, setNewVariety] = React.useState<IVariety | undefined>(undefined);
  const { varieties } = useAppState();

  const closeDialog = () => {
    setNewVariety(undefined);
    onClose();
  };

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
            color={
              newVariety?.id === v.id
                ? 'primary'
                : selectedVariety === v.id
                  ? 'secondary'
                  : 'default'
            }
            onClick={() => setNewVariety(v)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          disabled={newVariety === undefined || newVariety.id === selectedVariety}
          color="primary"
          onClick={() => {
            onSelected(newVariety!);
            closeDialog();
          }}
        >
          {t.common.selectAction}
        </Button>
        <Button color="primary" onClick={closeDialog}>
          {t.common.cancelAction}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
