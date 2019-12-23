import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  makeStyles
} from "@material-ui/core";
import { Formik, Form, FormikActions, Field } from "formik";
import { TextField } from "formik-material-ui";
import { IMeasurement } from "app/storage";
import { useAppState } from "app/state";
import { t } from "app/i18n";
import { DatePickerField } from "app/ui";

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(1)
  }
}));

interface IEditDialogProps {
  open: boolean;
  measurement: IMeasurement;
  onClose: () => void;
}

export const EditDialog: React.FC<IEditDialogProps> = ({
  open,
  measurement,
  onClose
}) => {
  const classes = useStyles();
  const { actions } = useAppState();

  return (
    <Dialog open={open}>
      <Formik
        initialValues={measurement}
        enableReinitialize
        onSubmit={async (
          newMeasurement: IMeasurement,
          formikActions: FormikActions<IMeasurement>
        ) => {
          await actions.updateMeasurement(newMeasurement);
          formikActions.setSubmitting(false);
          onClose();
        }}
        render={({ dirty, isSubmitting }) => {
          return (
            <Form>
              <DialogTitle>{t.measurement.editHeader}</DialogTitle>
              <DialogContent>
                <Box display="flex" flexDirection="column">
                  <Field
                    name="date"
                    label={t.measurement.dateLabel}
                    component={DatePickerField}
                    required
                    className={classes.field}
                    InputLabelProps={{ shrink: true }}
                  />
                  <Field
                    name="length"
                    label={t.measurement.lengthLabel}
                    component={TextField}
                    type="number"
                    required
                    className={classes.field}
                  />
                  <Field
                    name="weight"
                    label={t.measurement.weightLabel}
                    component={TextField}
                    type="number"
                    required
                    className={classes.field}
                  />
                  <Field
                    name="comment"
                    label={t.measurement.commentLabel}
                    component={TextField}
                    multiline
                    rows="4"
                    className={classes.field}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={!dirty || isSubmitting}
                  color="primary"
                  type="submit"
                >
                  {t.common.saveAction}
                </Button>
                <Button color="primary" onClick={onClose}>
                  {t.common.cancelAction}
                </Button>
              </DialogActions>
            </Form>
          );
        }}
      />
    </Dialog>
  );
};
