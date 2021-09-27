import { COLORS } from '@data/consts';
import {
  Button,
  ButtonProps,
  createStyles,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core';
import React from 'react';

// tslint:disable:typedef
const styles = (_theme: Theme) =>
  createStyles({
    primary: {
      background: COLORS.button.primary.default,
      borderRadius: 3,
      border: 0,
      color: '#FFF',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      '&$disabled': {
        background: COLORS.button.primary.disabled,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
        color: '#FFF'
      },
      '&:hover': {
        backgroundColor: COLORS.button.primary.hover
      }
    },
    secondary: {
      background: COLORS.button.secondary.default,
      borderRadius: 3,
      border: '1px solid',
      borderColor: COLORS.button.secondary.hover,
      color: COLORS.button.secondary.hover,
      height: 48,
      padding: '0 30px',
      '&$disabled': {
        background: COLORS.button.secondary.disabled,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
        color: '#FFF'
      },
      '&:hover': {
        backgroundColor: COLORS.button.secondary.hover,
        color: '#FFF'
      }
    },
    three: {
      background: COLORS.button.three.default,
      borderRadius: 3,
      color: '#000',
      height: 48,
      padding: '0 30px',
      boxShadow:
        '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      '&$disabled': {
        background: COLORS.button.three.disabled,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
        color: '#000'
      },
      '&:hover': {
        backgroundColor: COLORS.button.three.hover,
        color: '#000'
      }
    },
    disabled: {}
  });
// tslint:enable:typedef

type StyleProps = WithStyles<typeof styles>;

type OwnProps = {
  myType?: 'primary' | 'secondary' | 'three';
};

const DoctoButtonFunc = ({
  myType,
  classes,
  children,
  ...buttonProps
}: OwnProps & StyleProps & ButtonProps): React.ReactElement => {
  let myStyle = classes.primary;
  if (myType && myType === 'primary') {
    myStyle = classes.primary;
  } else if (myType && myType === 'secondary') {
    myStyle = classes.secondary;
  } else if (myType && myType === 'three') {
    myStyle = classes.three;
  }
  return (
    <Button
      {...buttonProps}
      classes={{
        root: myStyle,
        disabled: classes.disabled
      }}>
      {children}
    </Button>
  );
};

export const DoctoButton = withStyles(styles)(DoctoButtonFunc);
