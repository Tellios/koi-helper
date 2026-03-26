import { TextField } from '@mui/material';
import { useField } from 'formik';
import React, { useEffect, useRef } from 'react';

export interface IDebouncedTextFieldProps {
  name: string;
  label: string;
  delay?: number;
  multiline?: boolean;
  fullWidth?: boolean;
}

export const DebouncedTextField = ({
  name,
  label,
  delay = 300,
  ...rest
}: IDebouncedTextFieldProps) => {
  const [field, meta, helpers] = useField<string>(name);
  const helpersRef = useRef(helpers);
  helpersRef.current = helpers;
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Sync external value changes (e.g. enableReinitialize) directly to the DOM
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== (field.value ?? '')) {
      inputRef.current.value = field.value ?? '';
    }
  }, [field.value]);

  // Clear pending timer on unmount
  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerRef.current);
    const value = e.target.value;
    timerRef.current = setTimeout(() => {
      helpersRef.current.setValue(value);
    }, delay);
  };

  return (
    <TextField
      {...rest}
      name={name}
      label={label}
      defaultValue={field.value ?? ''}
      inputRef={inputRef}
      onChange={handleChange}
      onBlur={field.onBlur}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};
