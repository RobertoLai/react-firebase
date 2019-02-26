import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withAuthorization, withEmailVerification } from "../Session";
import { UserItem, UsersList } from "../Users";


const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);


const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UsersList} />
    </Switch>
  </div>
);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AdminPage);
