import {
  Chip,
  ChipProps,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { ReactElement } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AutocompleteProps, Autocomplete } from '@mui/material';
import { isANumber } from '../utils';
import { aDictionary, anObject } from '../types';

export interface BaseAutocompleteProps<
  Option extends anObject,
  Multiple extends boolean,
> extends Omit<
    AutocompleteProps<Option, Multiple, false, false>,
    | 'value'
    | 'onChange'
    | 'disableClearable'
    | 'freeSolo'
    | 'renderInput'
    | 'label'
  > {
  /**
   * ex. labelKey="display_name" options=[{ id: 1, display_name: 'one'}]
   * TypeScript validates that labelKey is an attribute on options object */
  labelKey: keyof Option;
  /**
   * ex. idKey="item_id" options=[{ item_id: 1, label: 'one'}]
   * TypeScript validates that idKey is an attribute on options object */
  idKey: keyof Option;
  label?: React.ReactNode;
  onChange: (value?: string) => void;
  onClear?: () => void;
  options: Option[];
  value?: Option[keyof Option];
  loading?: boolean;
  error?: boolean;
  required?: boolean;
  helperText?: string;
  inputProps?: TextFieldProps;
  enableDrag?: boolean;
  onChangeOverride?: (val: Option | null) => void;
  isCustom?: boolean;
  customEndAdornment?: JSX.Element;
  focused?: boolean;
  startAdornment?: (val: Option | null) => React.ReactNode;
  overrideDisableClearable?: boolean;
  addedOnInputChange?: (val: string) => void;
}

export type CustomAutocompleteProps<Option extends anObject> = Omit<
  BaseAutocompleteProps<Option, false>,
  'multiple'
>;

export function CustomAutocomplete<Opt extends anObject>({
  labelKey,
  idKey,
  inputProps = {},
  helperText,
  onClear,
  fullWidth = true,
  isCustom,
  focused,
  startAdornment,
  overrideDisableClearable,
  getOptionLabel,
  addedOnInputChange,
  ...props
}: CustomAutocompleteProps<Opt>) {
  const value =
    props.options.find((d) => {
      return isCustom
        ? (d as { custom_data: Opt }).custom_data[idKey] === props.value
        : d[idKey] === props.value;
    }) || null;
  return (
    <Autocomplete<Opt>
      {...props}
      disableClearable={overrideDisableClearable as undefined} // Hack to allow disableClearable without overhauling the CustomAutocomplete types
      fullWidth={fullWidth}
      onInputChange={(e, val, reason) => {
        addedOnInputChange && addedOnInputChange(val);
        props.onInputChange && props.onInputChange(e, val, reason);
      }}
      renderInput={(p) => {
        return (
          <TextField
            focused={focused}
            label={props.label}
            variant="outlined"
            helperText={helperText}
            error={props.error}
            {...p}
            {...inputProps}
            required={props.required}
            InputProps={{
              ...p.InputProps,
              autoComplete: 'new-password',
              startAdornment: startAdornment && startAdornment(value),
              endAdornment: (
                <>
                  {props.loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {{
                    ...(p.InputProps.endAdornment as ReactElement),
                    props: {
                      ...(p.InputProps.endAdornment as ReactElement).props,
                      children: [
                        ...(p.InputProps.endAdornment as ReactElement).props
                          .children,
                        ...(props.customEndAdornment
                          ? [props.customEndAdornment]
                          : []),
                      ],
                    },
                  }}
                </>
              ),
            }}
          ></TextField>
        );
      }}
      getOptionLabel={
        getOptionLabel ??
        ((opt) => {
          const label = isCustom
            ? (opt as { custom_data: aDictionary<string, string> }).custom_data[
                labelKey as string
              ]?.toString()
            : (opt as aDictionary<string, string>)[
                labelKey as string
              ]?.toString();
          const id = isCustom
            ? (opt as { custom_data: aDictionary<string, string> }).custom_data[
                idKey as string
              ]
            : (opt as aDictionary<string, string>)[idKey as string];
          return label ? label : id ?? '';
        })
      }
      value={value} // fix uncontrolled warning
      onChange={(_, opt) => {
        const val = isCustom
          ? (opt as { custom_data: aDictionary<string, string> })?.custom_data[
              idKey as string
            ]
          : (opt as aDictionary<string, string>)?.[idKey as string];
        if (onClear && !val) {
          onClear();
        }
        props.onChangeOverride
          ? props.onChangeOverride(opt)
          : props.onChange(val);
      }}
    />
  );
}

export type CustomAutocompleteMultipleProps<Opt extends anObject> = Omit<
  BaseAutocompleteProps<Opt, true>,
  'value' | 'onChange'
> & {
  value?: string[];
  overrideValueOpts?: Opt[];
  onChange?: (value: string[], valueOpts?: Opt[]) => void;
  limitTagsOnFocus?: number;
  onChangePage?: (change: number) => void;
  pageNum?: number;
  pageSize?: number;
  count?: number;
};

const useDragChipStyles = makeStyles((theme) => ({
  chip: {
    cursor: 'move',
  },
  limitNum: {
    marginLeft: theme.spacing(0.5),
  },
}));

export function CustomAutocompleteMultiple<Opt extends anObject>({
  options,
  labelKey,
  idKey,
  onClear,
  ...props
}: CustomAutocompleteMultipleProps<Opt>) {
  const classes = useDragChipStyles();

  let value: string[] = [];
  // guard against invalid value like an empty string value
  if (props.value && Array.isArray(props.value)) {
    value = props.value;
  }
  const valueOpts: Opt[] =
    props.overrideValueOpts ??
    value.map((id) => {
      const maybeOption = options.find(
        (opt) => (opt as aDictionary<string, string>)[idKey as string] === id,
      );
      if (maybeOption) {
        return maybeOption;
      }
      // if for some reason that value is not in the options, show the idKey at least
      return {
        [idKey]: id,
        [labelKey]: `ID: ${id}`,
      } as Opt;
    });
  return (
    <>
      <Autocomplete<Opt, true>
        {...props}
        multiple
        fullWidth
        options={options}
        filterOptions={(opts, { inputValue }) => {
          // Need to filter based on text typed into input
          // Also need to allow options that match by opt[idKey] in addition to the default of opt[labelKey]
          return opts.filter((opt) => {
            const input = inputValue.toLocaleLowerCase();
            const label = (opt as aDictionary<string, string>)[
              labelKey as string
            ]
              ?.toString()
              ?.toLocaleLowerCase();
            const id = (opt as aDictionary<string, string>)[
              idKey as string
            ]?.toLocaleLowerCase();
            return label?.includes(input) || id?.includes(input);
          });
        }}
        renderInput={(p) => {
          const sharedTextFieldProps: TextFieldProps = {
            ...p,
            label: props.label,
            variant: 'outlined',
            helperText: props.helperText,
            error: props.error,
            InputProps: {
              ...p.InputProps,
              endAdornment: (
                <React.Fragment>
                  {props.loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {p.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          };
          return (
            <>
              {props.enableDrag ? (
                <DragDropContext
                  onDragEnd={(result) => {
                    const { destination, source } = result;
                    if (!destination) {
                      return;
                    }
                    if (
                      destination.droppableId == source.droppableId &&
                      destination.index == source.index
                    ) {
                      return;
                    }
                    const newArray = Array.from(valueOpts);
                    newArray.splice(source.index, 1);
                    newArray.splice(
                      destination.index,
                      0,
                      valueOpts[source.index],
                    );

                    const output = newArray.map((name) => {
                      return (name as aDictionary<string, string>)?.[
                        idKey as string
                      ];
                    }) as string[];
                    if (props.onChange) {
                      props.onChange(output, newArray);
                    }
                  }}
                >
                  <Droppable droppableId="droppable" direction="horizontal">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <TextField {...sharedTextFieldProps} />
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                <TextField {...sharedTextFieldProps} />
              )}
            </>
          );
        }}
        renderTags={(tags, getTagProps) => {
          const totalTags = tags.length;
          const shownTags = isANumber(props.limitTagsOnFocus)
            ? tags.slice(0, props.limitTagsOnFocus)
            : tags;
          const chipComponents = shownTags.map((option, index) => {
            const label = (option as aDictionary<string, string>)[
              labelKey as string
            ]?.toString();
            const id = (option as aDictionary<string, string>)[idKey as string];
            const sharedChipProps: ChipProps = {
              ...getTagProps({ index }),
              key: id,
              label: label ? label : id ?? '',
            };
            return props.enableDrag ? (
              <Draggable key={id} draggableId={id ?? 'draggable'} index={index}>
                {(provided) => (
                  <Chip
                    {...sharedChipProps}
                    ref={provided.innerRef}
                    classes={{
                      root: classes.chip,
                    }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  />
                )}
              </Draggable>
            ) : (
              <Chip {...sharedChipProps} />
            );
          });
          return isANumber(props.limitTagsOnFocus) ? (
            <>
              {chipComponents}
              {isANumber(props.limitTagsOnFocus) &&
                totalTags > props.limitTagsOnFocus && (
                  <span className={classes.limitNum}>
                    +{totalTags - props.limitTagsOnFocus}
                  </span>
                )}
            </>
          ) : (
            chipComponents
          );
        }}
        getOptionLabel={(opt) => {
          const label = (opt as aDictionary<string, string>)[
            labelKey as string
          ];
          const id = (opt as aDictionary<string, string>)[idKey as string];
          return label ? label : id ?? '';
        }}
        value={valueOpts}
        onChange={(_, newValue) => {
          const val = newValue.map(
            (opt) => (opt as Record<string, string>)?.[idKey as string],
          );
          if (onClear && !val) {
            onClear();
          }
          if (props.onChange) {
            props.onChange(val, newValue);
          }
        }}
      />
    </>
  );
}
