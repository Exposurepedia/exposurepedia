import { CircularProgress, makeStyles, Theme } from '@material-ui/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { useRef } from 'react';
import { FocusEvent } from 'react';
import debounce from 'lodash/debounce';

const DEBOUNCE_TIME_MS = 500;

type InputValue = string | number | null;
export type DebouncedTextFieldProps = TextFieldProps & {
  handleFormChange: (value: InputValue) => void;
  value: InputValue;
  element?: (defaultProps: TextFieldProps) => JSX.Element;
  clearable?: boolean;
};

function DebouncedTextField({
  handleFormChange,
  value,
  element = (defaultProps) => <TextField {...defaultProps} />,
  onFocus,
  clearable,
  ...fieldProps
}: DebouncedTextFieldProps): JSX.Element {
  const [inputValue, setInputValue] = React.useState<InputValue>(value ?? '');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hasFocus = useRef(false);
  const debouncedFormChange = React.useMemo(() => {
    return debounce((val: InputValue) => {
      handleFormChange(val);
    }, DEBOUNCE_TIME_MS);
  }, [handleFormChange]);

  React.useEffect(() => {
    if (!hasFocus.current) {
      // Only set the value if the input does not have focus. otherwise, this useEffect will cause a bug that erases user input
      setInputValue(value ?? '');
    }
  }, [value]);

  React.useEffect(() => {
    function handlePopState() {
      if (inputRef.current) {
        // blur the input on popstate so that the value can be updated in the field
        hasFocus.current = false;
        inputRef.current.blur();
      }
    }

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return element({
    ...fieldProps,
    value: inputValue ?? '',
    onChange: (event) => {
      const v =
        fieldProps.type === 'number'
          ? clearable && event.target.value === ''
            ? null
            : +event.target.value
          : event.target.value; // material converts any target value to a string even for number type
      setInputValue(v);
      debouncedFormChange(v);
    },
    onFocus: (e) => {
      onFocus && onFocus(e);
      onFocusSetAutocompleteToNewPassword(e);
    },
    inputRef: (input) => {
      inputRef.current = input;
    },
    InputProps: {
      ...fieldProps.InputProps,
      onFocus: () => {
        hasFocus.current = true;
      },
      onBlur: () => {
        hasFocus.current = false;
      },
    },
  });
}

const useStyles = makeStyles<Theme, { isLoading: boolean }>(() => ({
  loading: {
    visibility: (props) => (props.isLoading ? 'visible' : 'hidden'),
  },
}));
type DebouncedTextFieldWithProgressIndicatorProps = DebouncedTextFieldProps & {
  isLoading: boolean;
};
export function DebouncedTextFieldWithProgressIndicator(
  props: DebouncedTextFieldWithProgressIndicatorProps,
) {
  const { loading } = useStyles({ isLoading: props.isLoading });
  return (
    <DebouncedTextField
      {...props}
      InputProps={{
        endAdornment: (
          <CircularProgress color="inherit" size={20} className={loading} />
        ),
      }}
    />
  );
}

type TextFieldWithProgressIndicatorProps = TextFieldProps & {
  isLoading: boolean;
  element: (defaultProps: TextFieldProps) => JSX.Element;
};
export function TextFieldWithProgressIndicator({
  element,
  isLoading,
  ...rest
}: TextFieldWithProgressIndicatorProps) {
  const { loading } = useStyles({ isLoading });
  return element({
    ...rest,
    InputProps: {
      endAdornment: (
        <CircularProgress color="inherit" size={20} className={loading} />
      ),
    },
  });
}

export default DebouncedTextField;

//when this function is passed to the onFocus attribute of a component
//it will disable browsers' native autofill
export const onFocusSetAutocompleteToNewPassword = (event: FocusEvent) => {
  event.target.setAttribute('autocomplete', 'new-password');
};
