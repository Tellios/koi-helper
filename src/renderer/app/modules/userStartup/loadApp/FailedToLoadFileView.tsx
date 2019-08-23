import * as React from "react";
import { useAppState } from "app/state";
import { Box, Typography } from "@material-ui/core";
import { t } from "app/i18n";
import { CreateOrOpenFile } from "./CreateOrOpenFile";

export const FailedToLoadFileView: React.FunctionComponent = () => {
  const { state } = useAppState();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4">{t.file.errors.errorViewHeader}</Typography>
      <Typography>{state.loadFileErrorMessage}</Typography>

      <Typography>{state.settings.settings.lastLoadedFile}</Typography>

      <Box mt={2}>
        <CreateOrOpenFile />
      </Box>
    </Box>
  );
};
