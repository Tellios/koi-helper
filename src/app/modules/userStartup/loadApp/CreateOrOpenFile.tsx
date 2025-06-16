import { t } from '@app/i18n';
import { useActions } from '@app/state';
import { Add, FolderOpen } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import * as React from 'react';

export const CreateOrOpenFile: React.FunctionComponent = () => {
  const actions = useActions();

  return (
    <Grid container direction="row" justifyContent="flex-end" spacing={2}>
      <Grid>
        <Button variant="outlined" size="large">
          <FolderOpen />
          {t.file.openFileAction}
        </Button>
      </Grid>
      <Grid>
        <Button variant="outlined" size="large" onClick={() => actions.newFile()}>
          <Add />
          {t.file.newFileAction}
        </Button>
      </Grid>
    </Grid>
  );
};
