import { CssBaseline, WithStyles, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

import styles from './styles';

// tslint:disable-next-line: no-submodule-imports
type OwnProps = {};

type DispatchProps = {};

type StateProps = {};

type StyleProps = WithStyles<typeof styles>;

type Props = StyleProps & OwnProps & DispatchProps & StateProps & RouteProps;

type State = {};

// tslint:disable:jsx-no-lambda no-shadowed-variable
class AppRouteClass extends Component<Props, State> {
  public state: State = {};

  public render(): React.ReactNode {
    const { classes, component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        // tslint:disable-next-line: cyclomatic-complexity
        render={(props: RouteComponentProps<any>): React.ReactNode => {
          if (!Component) return null;

          // return <Redirect to={'/'} />;

          return (
            <>
              <div className={classes.appContainer}>
                <CssBaseline />
                <main className={classes.appContent}>
                  <div className={classes.appToolbar} />
                  <Component {...props} />
                </main>
              </div>
            </>
          );
        }}
      />
    );
  }
}

export const AppRoute = withStyles(styles)(AppRouteClass);
