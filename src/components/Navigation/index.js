import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import SignOutButton from '../SignOut';
import AuthUserContext from '../Session/Context';

const NavigationAuth = ({ authUser }) => (
	<div>
		<h2>Navigation</h2>
		<ul>
			<li>
				<Link to={ROUTES.LANDING}>Landing</Link>
			</li>
			<li>
				<Link to={ROUTES.HOME}>Home</Link>
			</li>
			<li>
				<Link to={ROUTES.ACCOUNT}>Account</Link>
			</li>
			{authUser.roles.includes(ROLES.ADMIN) && (
				<li>
					<Link to={ROUTES.ADMIN}>Admin</Link>
				</li>
			)}
			<li>
				<SignOutButton />
			</li>
		</ul>
	</div>
);

const NavigationNonAuth = () => (
	<div>
		<h2>Navigation</h2>
		<ul>
			<li>
				<Link to={ROUTES.SIGN_IN}>Sign In</Link>
			</li>
			<li>
				<Link to={ROUTES.LANDING}>Landing</Link>
			</li>
		</ul>
	</div>
);

const Navigation = () => (
	<div>
		<AuthUserContext.Consumer>
			{(authUser) => (authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />)}
		</AuthUserContext.Consumer>
	</div>
);

export default Navigation;
