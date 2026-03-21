import { ImageProfileSelector } from '@app/modules/image';
import { FormButtonBar } from '@app/ui';
import { Grid, Typography } from '@mui/material';
import { t } from '@shared/i18n';
import { Id } from '@shared/models';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import { useVarietyStore } from '../variety-store';

interface IVarietyDetailsViewProps {
  varietyId: Id;
}

export const VarietyDetailsView: React.FunctionComponent<IVarietyDetailsViewProps> = ({
  varietyId,
}) => {
  const { varieties, updateVariety } = useVarietyStore();
  const variety = varieties.find((v) => v.id === varietyId)!;

  return (
    <Formik
      enableReinitialize
      initialValues={variety}
      onSubmit={async (values, formikActions) => {
        await updateVariety(values);
        formikActions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Typography variant="h4" gutterBottom pt={2}>
            {variety.name}
          </Typography>

          <Grid container spacing={3}>
            <Grid>
              <ImageProfileSelector referenceId={variety.id} />
            </Grid>

            <Grid size={8}>
              <Field name="name" label={t.common.form.nameLabel} component={TextField} fullWidth />
            </Grid>

            <Grid size={12}>
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
    </Formik>
  );
};
