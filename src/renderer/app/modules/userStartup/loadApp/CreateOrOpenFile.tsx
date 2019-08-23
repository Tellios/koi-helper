import * as React from "react";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { Button, Grid } from "@material-ui/core";
import { Add, FolderOpen } from "@material-ui/icons";

export const CreateOrOpenFile: React.FunctionComponent = () => {
  const { actions } = useAppState();

  return (
    <Grid container direction="row" justify="flex-end" spacing={2}>
      <Grid item>
        <Button variant="outlined" size="large">
          <FolderOpen />
          {t.file.openFileAction}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          size="large"
          onClick={() => actions.newFile()}
        >
          <Add />
          {t.file.newFileAction}
        </Button>
      </Grid>
    </Grid>
  );
};
