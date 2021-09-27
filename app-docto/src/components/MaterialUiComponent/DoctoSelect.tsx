import { Without } from '@custom-types/index';
import {
  createStyles,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core';
import React from 'react';
import { WrappedFieldProps } from 'redux-form';

// tslint:disable:typedef
const styles = (_theme: Theme) =>
  createStyles({
    root: {
      minWidth: 120
    }
  });
// tslint:enable:typedef

type StyleProps = WithStyles<typeof styles>;

type OwnProps = {
  name?: string;
};

const renderFromHelper = ({
  touched,
  error
}: {
  touched: boolean;
  error: any;
}): React.ReactNode => {
  if (!(touched && error)) {
    return null;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const DoctoSelectFunc = (
  props: OwnProps &
    StyleProps &
    Without<SelectProps, 'input'> &
    Partial<WrappedFieldProps>
): React.ReactElement => {
  const { input, name, label, meta, children, onChange, ...custom } = props;

  return (
    <FormControl error={meta !== undefined && meta.touched && meta.invalid}>
      <InputLabel id={'Docto-select-standard'}>{label}</InputLabel>
      <Select
        variant={'outlined'}
        labelId={'Docto-select-standard'}
        {...input}
        onChange={input !== undefined ? input.onChange : onChange}
        {...custom}>
        {children}
      </Select>
      {renderFromHelper({
        touched: meta !== undefined && meta.touched,
        error: meta !== undefined && meta.error
      })}
    </FormControl>
  );
};

export const DoctoSelect = withStyles(styles)(DoctoSelectFunc);
