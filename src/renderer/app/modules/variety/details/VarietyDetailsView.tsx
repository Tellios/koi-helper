import * as React from "react";
import { Box, Paper, Grid, Button } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { useAppState } from "app/state";
import { RouteComponentProps, Route } from "react-router";
import { t } from "app/i18n";

export const VarietyDetailsView: React.FunctionComponent<
  RouteComponentProps<{ id: string }>
> = ({ match }) => {
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

  return (
    <Box m={1}>
      <Paper>
        <Box m={2}>
          <Route
            render={({ history }) => (
              <Formik
                initialValues={variety}
                onSubmit={async (values, formikActions) => {
                  await actions.updateVariety(values);
                  formikActions.setSubmitting(false);
                  history.goBack();
                }}
                render={props => (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={8}>
                        <Field
                          name="name"
                          label={t.variety.nameLabel}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          name="description"
                          label={t.variety.descriptionLabel}
                          component={TextField}
                          multiline
                          fullWidth
                        />
                      </Grid>
                    </Grid>

                    <Box mt={2}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        spacing={2}
                      >
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
                  </Form>
                )}
              />
            )}
          />
        </Box>
      </Paper>
    </Box>
  );
};
