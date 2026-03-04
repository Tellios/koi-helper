import { t } from '@app/i18n';
import { useActions, useAppState } from '@app/state';
import { Id } from '@shared/models';
import { FormButtonBar } from '@app/ui';
import { Grid, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';

interface IDiseaseDetailsViewProps {
  diseaseId: Id;
}

export const DiseaseDetailsView: React.FC<IDiseaseDetailsViewProps> = ({ diseaseId }) => {
  const state = useAppState();
  const actions = useActions();
  const disease = state.diseases.filter((disease) => disease.id === diseaseId)[0];

  return (
    <Formik
      enableReinitialize
      initialValues={disease}
      onSubmit={async (values, formikActions) => {
        await actions.updateDisease(values);
        formikActions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Typography variant="h4" gutterBottom>
            {disease.name}
          </Typography>

          <Grid container spacing={3}>
            <Grid size={8}>
              <Field name="name" label={t.common.form.nameLabel} component={TextField} fullWidth />
            </Grid>

            <Grid size={12}>
              <Field
                name="description"
                label={t.common.form.descriptionLabel}
                component={TextField}
                multiline
                fullWidth
              />
            </Grid>

            <Grid size={12}>
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
    </Formik>
  );
};
