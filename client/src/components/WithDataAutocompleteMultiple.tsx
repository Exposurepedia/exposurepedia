import { anObject } from '../types';
import {
  CustomAutocompleteMultiple,
  CustomAutocompleteMultipleProps,
} from './CustomAutocomplete';
import { DataWrapperProps } from './WithDataAutocomplete';

export type WithDataAutocompleteMultipleProps<DataType extends anObject> = Omit<
  CustomAutocompleteMultipleProps<DataType>,
  'options' | 'loading'
> & {
  DataWrapper: (props: DataWrapperProps<DataType>) => JSX.Element;
  popper?: boolean;
  query?: string;
  paginated?: boolean;
  label?: string;
};

export type WrappedAutocompleteMultipleProps<DataType extends anObject> = Omit<
  WithDataAutocompleteMultipleProps<DataType>,
  'options' | 'loading' | 'labelKey' | 'idKey' | 'DataWrapper'
>;

export function WithDataAutocompleteMultiple<DataType extends anObject>({
  DataWrapper,
  ...props
}: WithDataAutocompleteMultipleProps<DataType>) {
  return (
    <DataWrapper query={props.query}>
      {({ options, loading, count }) => (
        <CustomAutocompleteMultiple
          {...props}
          options={options}
          loading={loading}
          count={count}
        />
      )}
    </DataWrapper>
  );
}
