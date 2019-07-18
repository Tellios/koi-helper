import * as React from "react";
import {
  Typography,
  Box,
  Paper,
  Divider,
  TextField,
  Grid,
  Button
} from "@material-ui/core";
import { useAppState } from "app/state";
import { RouteComponentProps } from "react-router";
import { IVariety } from "app/storage";
import { t } from "app/i18n";
import { omit, defaultTo } from "lodash";
import { Save } from "@material-ui/icons";

type EditedVarietyProperties = Partial<IVariety>;

export const VarietyDetailsView: React.FunctionComponent<
  RouteComponentProps<{ id: string }>
> = ({ match }) => {
  const [formState, setFormState] = React.useState<EditedVarietyProperties>({});
  const { state, actions } = useAppState();
  const variety = state.varieties.filter(
    variety => variety.id === match.params.id
  )[0];

  React.useEffect(() => {
    actions.setMainBar({
      title: variety.name,
      showBackButton: true,
      actions: []
    });
  });

  const handleChange = (property: keyof IVariety, value: any) => {
    if (value === variety[property]) {
      return setFormState(currentState => omit(currentState, [property]));
    }

    setFormState(currentState => ({
      ...currentState,
      [property]: value
    }));
  };

  const resetForm = () => setFormState({});

  const isChanged = Object.keys(formState).length > 0;

  return (
    <Box m={1}>
      <Paper>
        <Box m={2}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label={t.variety.nameLabel}
                value={defaultTo(formState.name, variety.name)}
                onChange={e => handleChange("name", e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                label={t.variety.descriptionLabel}
                value={defaultTo(formState.description, variety.description)}
                onChange={e => handleChange("description", e.target.value)}
              />
            </Grid>
          </Grid>

          <Box mt={2}>
            <Grid container direction="row" justify="flex-end" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!isChanged}
                  onClick={() => {
                    actions.updateVariety({ ...variety, ...formState });
                    resetForm();
                  }}
                >
                  <Save />
                  {t.common.saveAction}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  disabled={!isChanged}
                  size="large"
                  onClick={() => resetForm()}
                >
                  {t.common.resetAction}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
