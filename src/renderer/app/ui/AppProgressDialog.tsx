import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  Typography,
  DialogActions,
  Button
} from "@material-ui/core";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { appProgressDialogActionEmitter } from "./AppProgressDialogActionEmitter";

export const AppProgressDialog: React.FunctionComponent = () => {
  const {
    state: {
      appProgressOpen,
      appProgressMessage,
      appProgressMode,
      appProgressCurrentCount,
      appProgressTotalCount,
      appProgressAction
    }
  } = useAppState();

  return (
    <Dialog open={appProgressOpen} fullWidth>
      <DialogTitle>{appProgressMessage}</DialogTitle>
      <DialogContent>
        {appProgressMode === "indeterminate" && (
          <LinearProgress variant="indeterminate" />
        )}
        {appProgressMode === "count" && (
          <>
            <Typography>
              {t.common.appProgress.progress(
                appProgressCurrentCount,
                appProgressTotalCount
              )}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={
                ((appProgressCurrentCount - 1) * 100) /
                (appProgressTotalCount - 1)
              }
            />
          </>
        )}
      </DialogContent>
      {appProgressAction.actionId.length > 0 && (
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disabled={appProgressAction.disabled ?? false}
            onClick={() =>
              appProgressDialogActionEmitter.emit(appProgressAction.actionId)
            }
          >
            {appProgressAction.label}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
