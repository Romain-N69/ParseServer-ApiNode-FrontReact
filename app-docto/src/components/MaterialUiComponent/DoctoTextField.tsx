import {
  createStyles,
  TextField,
  TextFieldProps,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core';
import React from 'react';
import { WrappedFieldProps } from 'redux-form';

// tslint:disable:typedef
const styles = (_theme: Theme) =>
  createStyles({
    root: {}
  });
// tslint:enable:typedef

type StyleProps = WithStyles<typeof styles>;

type OwnProps = {
  capitalize?: boolean;
};

const DoctoTextFieldFunc = (
  props: OwnProps & StyleProps & TextFieldProps & Partial<WrappedFieldProps>
): React.ReactElement => {
  const { classes, label, meta, input, onChange, capitalize, ...rest } = props;

  const onChangeFunc = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (input) {
      if (capitalize !== undefined && capitalize) {
        const value =
          event.target.value.charAt(0).toUpperCase() +
          event.target.value.slice(1);
        input.onChange(value);
      } else {
        input.onChange(event.target.value);
      }
    } else if (onChange) {
      onChange(event);
    }
  };

  return (
    <TextField
      classes={classes}
      label={label}
      helperText={meta && meta.touched && meta.error}
      error={meta && meta.touched && meta.invalid}
      autoComplete={'nope'}
      {...input}
      onChange={onChangeFunc}
      {...rest}
      variant={'outlined'}
      color={'secondary'}
    />
  );
};

export const DoctoTextField = withStyles(styles)(DoctoTextFieldFunc);
