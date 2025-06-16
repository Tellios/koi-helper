import { t } from '@app/i18n';
import { useActions } from '@app/state';
import { IPond } from '@app/storage';
import { FormButtonBar } from '@app/ui';
import { Box, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';

interface IInfoPanelProps {
  pond: IPond;
}

export const InfoPanel: React.FunctionComponent<IInfoPanelProps> = ({ pond }) => {
  const actions = useActions();

  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={pond}
        onSubmit={async (values, formikActions) => {
          await actions.updatePond(values);
          formikActions.setSubmitting(false);
        }}
        render={(props) => (
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
      />
    </Box>
  );
};
