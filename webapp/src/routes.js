import React, { Fragment } from 'react';
import { PrivateLayout, PublicLayout, NotLoggedInLayout } from '@layouts';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { Login, Register, PageNotFound, Welcome, RegistrationSuccess, GoogleMap, Locations,Chat, friends, Users} from './containers';


const privateRoutes = [
  {
    id: 'welcome',
    path: '/welcome',
    component: Welcome
  },
  {
    id: 'locations',
    path: '/locations',
    component: Locations,
  },
  {
    id: 'friends',
    path: '/friends',
    component: friends
  }
  ,
  {
    id: 'map',
    path: '/map',
    component: GoogleMap,
  },
  {
    id: 'chat',
    path: '/chat',
    component: Chat,
  },
  {
    id: 'users',
    path: '/users',
    component: Users,
  }


];

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={Login} path="/login" exact />
        <NotLoggedInLayout component={Register} path="/register" exact />
        <NotLoggedInLayout path="/register/success" component={RegistrationSuccess} exact />
        <PublicLayout path="/404" component={PageNotFound} exact />
        <Redirect from="/" to="/welcome" exact />
        <PrivateLayout path="/" routes={privateRoutes} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;