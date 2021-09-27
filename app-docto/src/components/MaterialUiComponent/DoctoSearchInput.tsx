import { DoctoTextField } from '@components/MaterialUiComponent/DoctoTextField';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderOptionState } from '@material-ui/lab';
import React from 'react';

// tslint:disable:typedef
const styles = (_theme: Theme) =>
  createStyles({
    container: {}
  });
// tslint:enable:typedef

type StyleProps = WithStyles<typeof styles>;

type OwnProps<T> = {
  label?: string;
  value?: any;
  className?: string;
  options: T[];
  onChange?(value: T): void;
  onChangeTextInput?(value: string): void;
  getOptionLabel?(option: T): string;
  renderOption?(
    option: T,
    state: AutocompleteRenderOptionState
  ): React.ReactNode;
};

const DoctoSearchInputFunc = function<T>(
  props: OwnProps<T> & StyleProps
): React.ReactElement {
  const {
    classes,
    className,
    options,
    getOptionLabel,
    renderOption,
    label,
    value,
    onChange
  } = props;

  const onChangeFunc = (_event: React.ChangeEvent<{}>, newValue: any): void => {
    if (onChange) {
      onChange(newValue);
    }
  };
  const onChangeTextInputFunc = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (props.onChangeTextInput) {
      props.onChangeTextInput(event.currentTarget.value);
    }
  };

  return (
    <Autocomplete
      className={`${classes.container} ${className}`}
      freeSolo={true}
      disableClearable={true}
      options={options}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      value={value}
      size={'medium'}
      fullWidth={false}
      onChange={onChangeFunc}
      // tslint:disable-next-line:jsx-no-lambda
      renderInput={(params): React.ReactElement => (
        <DoctoTextField
          {...params}
          onChange={onChangeTextInputFunc}
          label={label}
          margin={'normal'}
          variant={'outlined'}
          InputProps={{ ...params.InputProps, type: 'search' }}
        />
      )}
    />
  );
};

export const DoctoSearchInput = withStyles(styles)(DoctoSearchInputFunc);
