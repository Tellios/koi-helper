import { t } from '@app/i18n';
import { Save } from '@mui/icons-material';
import { Box, Button, Grid } from '@mui/material';
import * as React from 'react';

export interface IFormButtonBarProps {
  dirty: boolean;
}

export const FormButtonBar: React.FunctionComponent<IFormButtonBarProps> = (props) => {
  return (
    <Box py={3}>
      <Grid container direction="row" justifyContent="flex-end" spacing={2}>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={!props.dirty}
            type="submit"
            startIcon={<Save />}
          >
            {t.common.saveAction}
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            color="warning"
            disabled={!props.dirty}
            size="large"
            type="reset"
          >
            {t.common.resetAction}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
