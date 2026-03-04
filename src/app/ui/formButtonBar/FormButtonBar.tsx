import * as React from 'react';
import { Box, Grid, Button } from '@mui/material';
import { Save } from '@mui/icons-material';
import { t } from '@app/i18n';

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
          >
            <Save />
            {t.common.saveAction}
          </Button>
        </Grid>
        <Grid>
          <Button variant="contained" disabled={!props.dirty} size="large" type="reset">
            {t.common.resetAction}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
