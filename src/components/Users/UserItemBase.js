import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";

class UserItemBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            user: null,
            ...props.location.state
        };
    }

    componentDidMount() {
        if (this.state.user) {
            return;
        }

        this.setState({ loading: true });

        this.props.firebase
            .user(this.props.match.params.id)
            .on("value", snapshot => {
                this.setState({
                    user: snapshot.val(),
                    loading: false
                });
            });
    }
    onSendPasswordResetEmail = () => {
        this.props.firebase.doPasswordReset(this.state.user.email);
    };

    render() {
        const { user, loading } = this.state;

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

export default UserItemBase