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
			this.listener = this.props.firebase.onAuthUserListener(
				(authUser) => this.setState({ authUser }),
				() => this.setState({ authUser: null })
			);
			/* this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
				//authUser ? this.setState({ authUser }) : this.setState({ authUser: null });

				if (authUser) {
					this.props.firebase.user(authUser.uid).once('value').then((snapshot) => {
						const dbUser = snapshot.val();
						
						if (!dbUser.roles) {
							dbUser.roles = [];
						}

						authUser = {
							uid: authUser.uid,
							email: authUser.email,
							...dbUser
						};

						this.setState({ authUser });
					});
				} else {
					this.setState({ authUser: null });
				}
			}); */
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
			this.listener = this.props.firebase.onAuthUserListener(
				(authUser) => {
					if (!condition(authUser)) {
						this.props.history.push(ROUTES.SIGN_IN);
					}
				},
				() => this.props.history.push(ROUTES.SIGN_IN)
			);

			/* 	this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
				// 	if (!condition(authUser)) {
				// 	this.props.history.push(ROUTES.SIGN_IN);
				// } 

				if (authUser) {
					this.props.firebase.user(authUser.uid).once('value').then((snapshot) => {
						const dbUser = snapshot.val();

						if (!dbUser.roles) {
							dbUser.roles = [];
						}

						authUser = {
							uid: authUser.uid,
							email: authUser.email,
							...dbUser
						};

						if (!condition(authUser)) {
							this.props.history.push(ROUTES.SIGN_IN);
						}
					});
				} else {
					this.props.history.push(ROUTES.SIGN_IN);
				}
			}); */
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
