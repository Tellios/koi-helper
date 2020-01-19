import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  Typography
} from "@material-ui/core";
import { useAppState } from "app/state";
import { t } from "app/i18n";

export const AppProgressDialog: React.FunctionComponent = () => {
  const {
    state: {
      appProgressOpen,
      appProgressMessage,
      appProgressMode,
      appProgressCurrentCount,
      appProgressTotalCount
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
    </Dialog>
  );
};
