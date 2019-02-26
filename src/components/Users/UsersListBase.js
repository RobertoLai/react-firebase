import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";

class UsersListBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    if (!this.props.users.length) {
      this.setState({ loading: true });
    }

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();
      console.log("snapshot");
      this.props.onSetUsers(snapshot.val());
      /*  const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      })); */

      this.setState({
        // users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users } = this.props;
    const { loading } = this.state;

    console.log("USERS", users);

    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <span>
                <strong>ID:</strong> {user.uid}
              </span>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>
              <span>
                <strong>Username:</strong> {user.username}
              </span>
              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>Details</Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: Object.keys(state.userState.users || {}).map(key => ({
    ...state.userState.users[key],
    uid: key
  }))
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: "USERS_SET", users })
});

const UsersList = compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UsersListBase);

export { UsersList, UsersListBase };
