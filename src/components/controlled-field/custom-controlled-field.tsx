"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RenderField } from "./render-field";
import { FormFieldType, SelectOption } from "./types";

type CustomControlledFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  fieldType: FormFieldType;
  id: string;
  label?: string;
  placeholder?: string;
  className?: string;
  options?: SelectOption[];
  inputType?: string;
};

function CustomControlledField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  id,
  label,
  placeholder,
  fieldType,
  className,
  options,
  inputType,
}: CustomControlledFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <Field className="gap-y-1.25" data-invalid={fieldState.invalid}>
          {label && fieldType !== "checkbox" && (
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
          )}

          <RenderField
            field={field}
            fieldType={fieldType}
            id={id}
            areaInvalid={fieldState.invalid}
            placeholder={placeholder}
            disabled={formState.isSubmitting}
            className={className}
            options={options}
            label={label}
            inputType={inputType}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export default CustomControlledField;
