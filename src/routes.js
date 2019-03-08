import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/login';
import UserPage from './components/userPage';
import NewPartner from './components/newPartner';
import AllCustomers from './components/admin/allCustomers';
import PlateCheck from './components/admin/plateCheck';
import NavBar from './components/navbar';

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/userpage" component={UserPage} />
    <Route path="/newpartner" component={NewPartner} />
    <Route path="/allcustomers" component={AllCustomers} />
    <Route path="/platecheck" component={PlateCheck} />
    <Route
      path="/adsfijadgpoiagkawer;ldjiosdfhnaert;lkasdfl;kjasdf"
      component={NavBar}
    />
  </Switch>
);
