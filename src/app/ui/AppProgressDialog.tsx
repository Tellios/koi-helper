import { t } from '@shared/i18n';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { appProgressDialogActionEmitter } from './AppProgressDialogActionEmitter';
import { useAppProgressStore } from './app-progress-store';

export const AppProgressDialog: React.FunctionComponent = () => {
  const { open, message, mode, currentCount, totalCount, progressAction } = useAppProgressStore();

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>{message}</DialogTitle>
      <DialogContent>
        {mode === 'indeterminate' && <LinearProgress variant="indeterminate" />}
        {mode === 'count' && (
          <>
            <Typography>{t.common.appProgress.progress(currentCount, totalCount)}</Typography>
            <LinearProgress
              variant="determinate"
              value={((currentCount - 1) * 100) / (totalCount - 1)}
            />
          </>
        )}
      </DialogContent>
      {progressAction?.actionId.length > 0 && (
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disabled={progressAction.disabled ?? false}
            onClick={() => appProgressDialogActionEmitter.emit(progressAction.actionId)}
          >
            {progressAction.label}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
