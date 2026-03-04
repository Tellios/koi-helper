import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import { useActions, useAppState } from '@app/state';
import { t } from '@app/i18n';
import { FormButtonBar } from '@app/ui';
import { Id } from '@shared/models';
import { ImageProfileSelector } from '@app/modules/image';

interface IVarietyDetailsViewProps {
  varietyId: Id;
}

export const VarietyDetailsView: React.FunctionComponent<IVarietyDetailsViewProps> = ({
  varietyId,
}) => {
  const state = useAppState();
  const actions = useActions();
  const variety = state.varieties.filter((variety) => variety.id === varietyId)[0];

  return (
    <Formik
      enableReinitialize
      initialValues={variety}
      onSubmit={async (values, formikActions) => {
        await actions.updateVariety(values);
        formikActions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Typography variant="h4" gutterBottom>
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
