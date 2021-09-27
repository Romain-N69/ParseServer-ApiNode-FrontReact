import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppRoute } from './AppRoute';
// import { AuthRoute } from './AuthRoute';
import Home from './Home';
import NotFound from './NotFound';

export const Router = (): React.ReactElement => (
  <Switch>
    <AppRoute exact={true} path={'/'} component={Home} />
    {/* <AuthRoute path={'/register'} component={Register} /> */}
    <Route component={NotFound} />
  </Switch>
);
