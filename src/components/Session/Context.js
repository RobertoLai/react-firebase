import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const AuthUserContext = React.createContext(null);

const withAuthentication = (Component) => {
	class withAuthentication extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				authUser: null
			};
		}

		componentDidMount() {
			this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
				authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
			});
		}

		componentWillUnmount() {
			this.listener();
		}
		render() {
			return (
				<AuthUserContext.Provider value={this.state.authUser}>
					<Component {...this.props} />
				</AuthUserContext.Provider>
			);
		}
	}

	return withFirebase(withAuthentication);
};

const withAuthorization = (condition) => (Component) => {
	class WithAuthorization extends React.Component {
		componentDidMount() {
			this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
				if (!condition(authUser)) {
					this.props.history.push(ROUTES.SIGN_IN);
				}
			});
		}

		componentWillUnmount() {
			this.listener();
		}

		render() {
			return (
				<AuthUserContext.Consumer>
					{(authUser) => (condition(authUser) ? <Component {...this.props} /> : null)}
				</AuthUserContext.Consumer>
			);
		}
	}

	return compose(withRouter, withFirebase)(WithAuthorization);
};

export { withAuthentication, withAuthorization };

export default AuthUserContext;