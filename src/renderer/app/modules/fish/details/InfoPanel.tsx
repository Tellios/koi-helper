import * as React from "react";
import { IFish } from "app/storage";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import {
  Typography,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem
} from "@material-ui/core";
import { t } from "app/i18n";
import { FormButtonBar } from "app/ui";
import { useAppState } from "app/state";

const useStyles = makeStyles(theme => ({
  sexSelector: {
    marginRight: theme.spacing(1)
  }
}));

interface IInfoPanelProps {
  fish: IFish;
}

export const InfoPanel: React.FunctionComponent<IInfoPanelProps> = ({
  fish
}) => {
  const { state, actions } = useAppState();
  const classes = useStyles();

  return (
    <Formik
      enableReinitialize
      initialValues={fish}
      onSubmit={async (values, formikActions) => {
        await actions.updateFish(values);
        formikActions.setSubmitting(false);
      }}
      render={props => (
        <Form>
          <Typography variant="h4">{fish.name}</Typography>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Field
                name="name"
                label={t.common.form.nameLabel}
                component={TextField}
              />
            </Grid>

            <Grid item xs={5}>
              <Field
                name="breeder"
                label={t.fish.breederLabel}
                component={TextField}
                fullWidth
              />
            </Grid>

            <Grid item xs={5}>
              <Field
                name="born"
                label={t.fish.bornLabel}
                component={TextField}
                type="date"
                fullWidth
              />
            </Grid>

            <Grid item xs={5}>
              <InputLabel className={classes.sexSelector} htmlFor="sex-select">
                {t.fish.sexLabel}
              </InputLabel>
              <Field
                className={classes.sexSelector}
                name="sex"
                label={t.fish.sexLabel}
                component={Select}
                fullWidth
                inputProps={{
                  id: "sex-select"
                }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Field>
            </Grid>

            <Grid item xs={5}>
              <Field
                name="value"
                label={t.fish.valueLabel}
                component={TextField}
                fullWidth
                type="number"
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel
                className={classes.sexSelector}
                htmlFor="variety-select"
              >
                {t.fish.varietyLabel}
              </InputLabel>
              <Field
                name="variety"
                component={Select}
                fullWidth
                inputProps={{
                  id: "variety-select"
                }}
              >
                {state.varieties.map(variety => (
                  <MenuItem key={variety.id} value={variety.id}>
                    {variety.name}
                  </MenuItem>
                ))}
              </Field>
            </Grid>

            <Grid item xs={12}>
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
    />
  );
};
