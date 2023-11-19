import React from 'react';
import { anObject } from '../types';
import {
  CustomAutocomplete,
  CustomAutocompleteProps,
} from './CustomAutocomplete';

export interface DataWrapperProps<DataType extends anObject> {
  children: ({
    validateFn,
    loading,
    options,
    count,
  }: {
    validateFn?: (val: string[]) => string | undefined;
    loading?: boolean;
    options: DataType[];
    count?: number;
  }) => React.ReactNode;
  query?: string;
}

export type WithDataAutocompleteProps<DataType extends anObject> = Omit<
  CustomAutocompleteProps<DataType>,
  'options' | 'loading'
> & {
  DataWrapper: (props: DataWrapperProps<DataType>) => JSX.Element;
};

export function WithDataAutocomplete<DataType extends anObject>({
  DataWrapper,
  ...props
}: WithDataAutocompleteProps<DataType>) {
  return (
    <DataWrapper>
      {({ options, loading }) => (
        <CustomAutocomplete {...props} options={options} loading={loading} />
      )}
    </DataWrapper>
  );
}
