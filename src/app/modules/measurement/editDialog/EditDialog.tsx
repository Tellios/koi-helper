import { t } from '@app/i18n';
import { useActions } from '@app/state';
import { IMeasurement } from '@shared/models';
import { DatePickerField } from '@app/ui';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';

interface IEditDialogProps {
  open: boolean;
  measurement: IMeasurement;
  onClose: () => void;
}

export const EditDialog: React.FC<IEditDialogProps> = ({ open, measurement, onClose }) => {
  const actions = useActions();

  return (
    <Dialog open={open}>
      <Formik
        initialValues={measurement}
        enableReinitialize
        onSubmit={async (
          newMeasurement: IMeasurement,
          formikActions: FormikHelpers<IMeasurement>,
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
                <Box display="flex" flexDirection="column" gap={1}>
                  <Field
                    name="date"
                    label={t.measurement.dateLabel}
                    component={DatePickerField}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                  <Field
                    name="length"
                    label={t.measurement.lengthLabel}
                    component={TextField}
                    type="number"
                    required
                  />
                  <Field
                    name="weight"
                    label={t.measurement.weightLabel}
                    component={TextField}
                    type="number"
                    required
                  />
                  <Field
                    name="comment"
                    label={t.measurement.commentLabel}
                    component={TextField}
                    multiline
                    rows="4"
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button disabled={!dirty || isSubmitting} color="primary" type="submit">
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
