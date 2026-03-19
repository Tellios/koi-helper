import { IVariety } from '@shared/models';
import { FieldProps } from 'formik';
import * as React from 'react';
import { useVarietyStore } from '../variety-store';
import { VarietyButton } from './VarietyButton';
import { VarietySelectDialog } from './VarietySelectDialog';

interface IVarietySelectorFieldProps extends FieldProps {}

export const VarietySelectorField: React.FC<IVarietySelectorFieldProps> = ({ field, form }) => {
  const { varieties } = useVarietyStore();
  const [selectorOpen, setSelectorOpen] = React.useState(false);

  const onChange = React.useCallback(
    (selectedVariety: IVariety) => {
      form.setFieldValue(field.name, selectedVariety.id);
    },
    [form, field.name],
  );

  const currentVariety = varieties.find((v) => v.id === field.value);

  return (
    <>
      <VarietyButton variety={currentVariety} onClick={() => setSelectorOpen(true)} />

      <VarietySelectDialog
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        selectedVariety={currentVariety?.id}
        onSelected={onChange}
      />
    </>
  );
};
