import React from 'react';
import {
  Box,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
  OutlinedInput,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
  Typography,
} from '@material-ui/core';
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { anObject } from '../../types';
import DebouncedTextField, {
  DebouncedTextFieldProps,
} from '../DebouncedTextField';
import { WrappedAutocompleteMultipleProps } from '../WithDataAutocompleteMultiple';

export interface HookFormProps {
  control: Control<FieldValues, object>;
  name: Path<FieldValues>;
  rules?: UseControllerProps['rules'];
  helperText?: string;
}

interface HookFormWrapperProps extends HookFormProps {
  Field: (
    props: ControllerRenderProps<FieldValues, Path<FieldValues>> & {
      error?: boolean;
    },
  ) => JSX.Element;
}

export function HookFormWrapper({
  control,
  name,
  rules,
  helperText,
  Field,
}: HookFormWrapperProps) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState,
  } = useController({
    rules,
    name,
    control,
  });
  return (
    <>
      {Field({
        onChange,
        onBlur,
        value,
        name,
        ref,
        error: typeof fieldState.error !== 'undefined',
      })}
      <Box display="flex" flexDirection="column">
        {helperText && (
          <Typography variant="subtitle2" color="textSecondary">
            <FormHelperText>{helperText}</FormHelperText>
          </Typography>
        )}
        {fieldState.error && (
          <Typography variant="subtitle2">
            <FormHelperText error>{fieldState.error.message}</FormHelperText>
          </Typography>
        )}
      </Box>
    </>
  );
}

type TextHookFormProps = HookFormProps & TextFieldProps;
export function TextHookForm({
  control,
  name,
  rules,
  helperText,
  ...fieldProps
}: TextHookFormProps) {
  return (
    <HookFormWrapper
      helperText={helperText}
      control={control}
      rules={rules}
      name={name}
      Field={(hookFormProps) => (
        <TextField variant="outlined" {...hookFormProps} {...fieldProps} />
      )}
    />
  );
}

type DebouncedTextHookFormProps = HookFormProps & DebouncedTextFieldProps;
export function DebouncedTextHookForm({
  control,
  name,
  rules,
  helperText,
  ...fieldProps
}: DebouncedTextHookFormProps) {
  return (
    <HookFormWrapper
      helperText={helperText}
      control={control}
      rules={rules}
      name={name}
      Field={(hookFormProps) => (
        <DebouncedTextField {...hookFormProps} {...fieldProps} />
      )}
    />
  );
}

type AutocompleteHookFormProps = HookFormProps & {
  AutocompleteComponent: (props: {
    value: string;
    onChange: (value: string | undefined) => void;
  }) => JSX.Element;
};
export function AutocompleteHookForm({
  control,
  name,
  helperText,
  rules,
  AutocompleteComponent,
  ...fieldProps
}: AutocompleteHookFormProps) {
  return (
    <HookFormWrapper
      helperText={helperText}
      control={control}
      rules={rules}
      name={name}
      Field={(hookFormProps) => (
        <AutocompleteComponent {...hookFormProps} {...fieldProps} />
      )}
    />
  );
}

type AutocompleteMultipleHookFormProps<
  DataType extends anObject,
  FormValues extends FieldValues,
> = HookFormProps &
  WrappedAutocompleteMultipleProps<DataType> & {
    AutocompleteComponent: (
      props: WrappedAutocompleteMultipleProps<DataType>,
    ) => JSX.Element;
  };
export function AutocompleteMultipleHookForm<
  DataType extends anObject,
  FormValues extends FieldValues,
>({
  control,
  name,
  helperText,
  rules,
  AutocompleteComponent,
  ...fieldProps
}: AutocompleteMultipleHookFormProps<DataType, FieldValues>) {
  return (
    <HookFormWrapper
      helperText={helperText}
      control={control}
      rules={rules}
      name={name}
      Field={(hookFormProps) => (
        <AutocompleteComponent {...hookFormProps} {...fieldProps} />
      )}
    />
  );
}

type CheckboxHookFormProps = HookFormProps &
  CheckboxProps & { label: string | JSX.Element };
export function CheckboxHookForm({
  control,
  name,
  rules,
  helperText,
  ...fieldProps
}: CheckboxHookFormProps) {
  return (
    <HookFormWrapper
      helperText={helperText}
      control={control}
      rules={rules}
      name={name}
      Field={(hookFormProps) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={hookFormProps.value}
              {...hookFormProps}
              {...fieldProps}
            />
          }
          label={fieldProps.label}
        />
      )}
    />
  );
}

type SelectHookFormProps = HookFormProps & SelectProps;
export function SelectHookForm({
  control,
  name,
  rules,
  helperText,
  ...fieldProps
}: SelectHookFormProps) {
  return (
    <HookFormWrapper
      helperText={helperText}
      control={control}
      rules={rules}
      name={name}
      Field={(hookFormProps) => (
        <Select
          input={<OutlinedInput margin="dense" />}
          {...hookFormProps}
          {...fieldProps}
        />
      )}
    />
  );
}
