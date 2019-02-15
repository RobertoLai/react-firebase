import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

class AdminPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			users: []
		};
	}

	render() {
		return (
			<div>
				<h1>Admin</h1>
				<p>The Admin Page is accessible by every signed in admin user.</p>
			</div>
		);
	}
}

const condition = (authUser) => !!authUser && authUser.roles.includes(ROLES.ADMIN);

//export default withAuthorization(condition)(AdminPage);

export default compose(withAuthorization(condition), withFirebase)(AdminPage);
