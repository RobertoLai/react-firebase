import React from "react";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { compose } from "recompose";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session";

import { connect } from "react-redux";

const AccountPage = ({ authUser }) => (
  <div>
    <h1>Account: {authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const condition = authUser => !!authUser;
export default compose(
  connect(mapStateToProps),
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
