import { t } from '@app/i18n';
import { Add, FolderOpen } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import * as React from 'react';
import { useStartupStore } from '../startup-store';

export const CreateOrOpenFile: React.FunctionComponent = () => {
  const { openExistingFile, newFile } = useStartupStore();

  return (
    <Grid container direction="row" justifyContent="flex-end" spacing={2}>
      <Grid>
        <Button
          startIcon={<FolderOpen />}
          variant="outlined"
          size="large"
          onClick={() => openExistingFile()}
        >
          {t.file.openFileAction}
        </Button>
      </Grid>
      <Grid>
        <Button startIcon={<Add />} variant="outlined" size="large" onClick={() => newFile()}>
          {t.file.newFileAction}
        </Button>
      </Grid>
    </Grid>
  );
};
