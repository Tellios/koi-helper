import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { FormButtonBar } from "app/ui";
import { Id } from "app/storage";
import { ImageProfileSelector } from "app/modules/image";

interface IVarietyDetailsViewProps {
  varietyId: Id;
}

export const VarietyDetailsView: React.FunctionComponent<IVarietyDetailsViewProps> = ({
  varietyId
}) => {
  const { state, actions } = useAppState();
  const variety = state.varieties.filter(
    variety => variety.id === varietyId
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
            <Grid item>
              <ImageProfileSelector referenceId={variety.id} />
            </Grid>

            <Grid item xs={8}>
              <Field
                name="name"
                label={t.common.form.nameLabel}
                component={TextField}
                fullWidth
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
