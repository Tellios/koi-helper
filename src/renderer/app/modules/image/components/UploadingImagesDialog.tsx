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

export const UploadingImagesDialog: React.FunctionComponent = () => {
  const { state } = useAppState();

  return (
    <Dialog open={state.isUploadingImages} fullWidth>
      <DialogTitle>{t.common.imageGallery.uploadTitle}</DialogTitle>
      <DialogContent>
        <Typography>
          {t.common.imageGallery.uploadMessage(
            state.imagesUploaded,
            state.totalImagesToUpload
          )}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={
            ((state.imagesUploaded - 1) * 100) / (state.totalImagesToUpload - 1)
          }
        />
      </DialogContent>
    </Dialog>
  );
};
