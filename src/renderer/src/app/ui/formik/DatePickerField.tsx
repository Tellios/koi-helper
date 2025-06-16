import React from 'react';
import { FieldProps } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';

export const DatePickerField: React.FC<FieldProps> = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <DatePicker
      name={field.name}
      value={field.value}
      format="yyyy-MM-dd"
      slotProps={{
        textField: {
          helperText: currentError as string,
          error: Boolean(currentError),
        },
      }}
      onError={(error) => {
        if (error !== currentError) {
          form.setFieldError(field.name, error as string);
        }
      }}
      // if you are using custom validation schema you probably want to pass `true` as third argument
      onChange={(date) => form.setFieldValue(field.name, date, false)}
      {...other}
    />
  );
};
