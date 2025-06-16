import { t } from '@app/i18n';
import { VarietySelectorField } from '@app/modules/variety';
import { useActions } from '@app/state';
import { IFish } from '@app/storage';
import { DatePickerField, FormButtonBar } from '@app/ui';
import { Grid, InputLabel, MenuItem } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Select, TextField } from 'formik-mui';
import * as React from 'react';

interface IInfoPanelProps {
  fish: IFish;
}

export const InfoPanel: React.FunctionComponent<IInfoPanelProps> = ({ fish }) => {
  const actions = useActions();

  return (
    <Formik
      enableReinitialize
      initialValues={fish}
      onSubmit={async (values, formikActions) => {
        await actions.updateFish(values);
        formikActions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Grid container spacing={3}>
            <Grid size={8}>
              <Field name="name" label={t.common.form.nameLabel} component={TextField} />
            </Grid>

            <Grid size={5}>
              <Field name="breeder" label={t.fish.breederLabel} component={TextField} fullWidth />
            </Grid>

            <Grid size={5}>
              <Field
                name="born"
                label={t.fish.bornLabel}
                component={DatePickerField}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid size={5}>
              <InputLabel sx={{ mr: 1 }} htmlFor="sex-select">
                {t.fish.sexLabel}
              </InputLabel>
              <Field
                sx={{ mr: 1 }}
                name="sex"
                label={t.fish.sexLabel}
                component={Select}
                fullWidth
                inputProps={{
                  id: 'sex-select',
                }}
              >
                <MenuItem value="male">{t.fish.maleLabel}</MenuItem>
                <MenuItem value="female">{t.fish.femaleLabel}</MenuItem>
              </Field>
            </Grid>

            <Grid size={5}>
              <Field
                name="value"
                label={t.fish.valueLabel}
                component={TextField}
                fullWidth
                type="number"
              />
            </Grid>

            <Grid size={6}>
              <InputLabel sx={{ mr: 1 }}>{t.fish.varietyLabel}</InputLabel>
              <Field name="variety" component={VarietySelectorField} fullWidth />
            </Grid>

            <Grid size={12}>
              <Field
                name="origin"
                label={t.fish.originLabel}
                component={TextField}
                fullWidth
                multiline
              />
            </Grid>
          </Grid>

          <FormButtonBar dirty={props.dirty} />
        </Form>
      )}
    </Formik>
  );
};
