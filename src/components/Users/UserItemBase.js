import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
class UserItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    /*  if (this.state.user) {
      return;
    } */

    if (!this.props.user) {
      this.setState({ loading: true });
    }

    this.props.firebase
      .user(this.props.match.params.id)
      .on("value", snapshot => {
        this.props.onSetUser(snapshot.val(), this.props.match.params.id);
      });
  }
  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.props.user.email);
  };

  render() {
    const { user } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            ...
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <button type="button" onClick={this.onSendPasswordResetEmail}>
                Send Password Reset
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: (state.userState.users || {})[props.match.params.id]
});

const mapDispatchToProps = dispatch => ({
  onSetUser: (user, uid) => dispatch({ type: "USER_SET", user, uid })
});

const UserItem = compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserItemBase);
export { UserItemBase, UserItem };
