import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { FormButtonBar } from "app/ui";
import { Id } from "app/storage";

interface IDiseaseDetailsViewProps {
  diseaseId: Id;
}

export const DiseaseDetailsView: React.FC<IDiseaseDetailsViewProps> = ({
  diseaseId
}) => {
  const { state, actions } = useAppState();
  const disease = state.diseases.filter(disease => disease.id === diseaseId)[0];

  return (
    <Formik
      enableReinitialize
      initialValues={disease}
      onSubmit={async (values, formikActions) => {
        await actions.updateDisease(values);
        formikActions.setSubmitting(false);
      }}
      render={props => (
        <Form>
          <Typography variant="h4">{disease.name}</Typography>
          <Grid container spacing={3}>
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
                label={t.common.form.descriptionLabel}
                component={TextField}
                multiline
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                name="medication"
                label={t.disease.medicationLabel}
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
