import * as React from "react";
import { Box, Grid, Button } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { t } from "app/i18n";

export interface IFormButtonBarProps {
  dirty: boolean;
}

export const FormButtonBar: React.FunctionComponent<IFormButtonBarProps> = props => {
  return (
    <Box mt={2}>
      <Grid container direction="row" justify="flex-end" spacing={2}>
        <Grid item>
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
        <Grid item>
          <Button
            variant="contained"
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
