import * as React from "react";
import { FieldProps } from "formik";
import { useAppState } from "app/state";
import { IVariety } from "app/storage";
import { VarietySelectDialog } from "./VarietySelectDialog";
import { VarietyButton } from "./VarietyButton";

interface IVarietySelectorFieldProps extends FieldProps {}

export const VarietySelectorField: React.FC<IVarietySelectorFieldProps> = ({
  field,
  form
}) => {
  const {
    state: { varieties }
  } = useAppState();
  const [selectorOpen, setSelectorOpen] = React.useState(false);

  const onChange = React.useCallback(
    (selectedVariety: IVariety) => {
      form.setFieldValue(field.name, selectedVariety.id);
    },
    [field.name]
  );

  const currentVariety = varieties.find(v => v.id === field.value);

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
