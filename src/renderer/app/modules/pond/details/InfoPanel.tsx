import * as React from "react";
import { Box, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { IPond } from "app/storage";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { FormButtonBar } from "app/ui";

interface IInfoPanelProps {
  pond: IPond;
}

export const InfoPanel: React.FunctionComponent<IInfoPanelProps> = ({
  pond
}) => {
  const { actions } = useAppState();

  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={pond}
        onSubmit={async (values, formikActions) => {
          await actions.updatePond(values);
          formikActions.setSubmitting(false);
        }}
        render={props => (
          <Form>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Field
                    component={TextField}
                    fullWidth
                    label={t.common.form.nameLabel}
                    name="name"
                  />
                </Grid>

                <Grid item xs={5}>
                  <Field
                    component={TextField}
                    fullWidth
                    label={t.pond.volumeLabel}
                    type="number"
                    name="volume"
                  />
                </Grid>

                <Grid item xs={5}>
                  <Field
                    component={TextField}
                    fullWidth
                    label={t.pond.depthLabel}
                    type="number"
                    name="depth"
                  />
                </Grid>

                <Grid item xs={5}>
                  <Field
                    component={TextField}
                    fullWidth
                    label={t.pond.lengthLabel}
                    type="number"
                    name="length"
                  />
                </Grid>

                <Grid item xs={5}>
                  <Field
                    component={TextField}
                    fullWidth
                    label={t.pond.widthLabel}
                    name="width"
                  />
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
