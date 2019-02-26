import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const withAuthentication = Component => {
  class withAuthentication extends React.Component {
    constructor(props) {
      super(props);

      /* this.state = {
        authUser: JSON.parse(localStorage.getItem("authUser"))
      }; */

      this.props.onSetAuthUser(JSON.parse(localStorage.getItem("authUser")));
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem("authUser", JSON.stringify(authUser));
          //this.setState({ authUser });
          this.props.onSetAuthUser(authUser);
        },
        () => {
          localStorage.removeItem("authUser");
          //this.setState({ authUser: null });
          this.props.onSetAuthUser(null);
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }
    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => dispatch({ type: "AUTH_USER_SET", authUser })
  });

  return compose(
    withFirebase,
    connect(
      null,
      mapDispatchToProps
    )
  )(withAuthentication);
};

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN)
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return condition(this.props.authUser) ? (
        <Component {...this.props} />
      ) : null;
    }
  }

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser
  });

  return compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps)
  )(WithAuthorization);
};

export { withAuthentication, withAuthorization };
