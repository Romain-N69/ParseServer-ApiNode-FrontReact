import { withStyles, WithStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

import styles from './styles';

type OwnProps = {};

type DispatchProps = {
  flush(): void;
};

type StateProps = {};

type StyleProps = WithStyles<typeof styles>;

type Props = StyleProps & OwnProps & DispatchProps & StateProps & RouteProps;

type State = {};

// tslint:disable:jsx-no-lambda no-shadowed-variable
class AuthRouteClass extends Component<Props, State> {
  public state: State = {};

  public render(): React.ReactNode {
    const { ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props: RouteComponentProps<any>): React.ReactNode => {
          return (
            <>
              <Component {...props} />
            </>
          );
        }}
      />
    );
  }
}

export const AuthRoute = withStyles(styles)(AuthRouteClass);
