import { t } from '@shared/i18n';
import { FormButtonBar } from '@app/ui';
import { Box, Grid } from '@mui/material';
import { IPond } from '@shared/models';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import { usePondStore } from '../pond-store';

interface IInfoPanelProps {
  pond: IPond;
}

export const InfoPanel: React.FunctionComponent<IInfoPanelProps> = ({ pond }) => {
  const { updatePond } = usePondStore();

  return (
    <Formik
      enableReinitialize
      initialValues={pond}
      onSubmit={async (values, formikActions) => {
        await updatePond(values);
        formikActions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Box>
            <Grid container spacing={3}>
              <Grid size={8}>
                <Field
                  component={TextField}
                  fullWidth
                  label={t.common.form.nameLabel}
                  name="name"
                />
              </Grid>

              <Grid size={5}>
                <Field
                  component={TextField}
                  fullWidth
                  label={t.pond.volumeLabel}
                  type="number"
                  name="volume"
                />
              </Grid>

              <Grid size={5}>
                <Field
                  component={TextField}
                  fullWidth
                  label={t.pond.depthLabel}
                  type="number"
                  name="depth"
                />
              </Grid>

              <Grid size={5}>
                <Field
                  component={TextField}
                  fullWidth
                  label={t.pond.lengthLabel}
                  type="number"
                  name="length"
                />
              </Grid>

              <Grid size={5}>
                <Field component={TextField} fullWidth label={t.pond.widthLabel} name="width" />
              </Grid>
            </Grid>

            <FormButtonBar dirty={props.dirty} />
          </Box>
        </Form>
      )}
    </Formik>
  );
};
