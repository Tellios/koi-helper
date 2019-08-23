import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { useAppState } from "app/state";
import { RouteComponentProps } from "react-router";
import { t } from "app/i18n";
import { FormButtonBar } from "app/ui";

export const VarietyDetailsView: React.FunctionComponent<
  RouteComponentProps<{ varietyId: string }>
> = ({ match }) => {
  const { state, actions } = useAppState();
  const variety = state.varieties.filter(
    variety => variety.id === match.params.varietyId
  )[0];

  return (
    <Formik
      enableReinitialize
      initialValues={variety}
      onSubmit={async (values, formikActions) => {
        await actions.updateVariety(values);
        formikActions.setSubmitting(false);
      }}
      render={props => (
        <Form>
          <Typography variant="h4">{variety.name}</Typography>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Field
                name="name"
                label={t.common.form.nameLabel}
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

          <FormButtonBar dirty={props.dirty} />
        </Form>
      )}
    />
  );
};
