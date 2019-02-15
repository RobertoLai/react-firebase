import React from 'react';

class UserListBase extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			users: []
		};
	}

	componentDidMount() {
		this.setState({ loading: true });

		this.props.firebase.users().on('value', (snapshot) => {
			const usersObject = snapshot.val();

			const usersList = Object.keys(usersObject).map((key) => ({
				...usersObject[key],
				uid: key
			}));

			this.setState({
				users: usersList,
				loading: false
			});
		});
	}

	componentWillUnmount() {
		this.props.firebase.users().off();
	}

	render() {
		const { users, loading } = this.state;

		return (
			<div>
				<h2>Users</h2>
				{loading && <div>Loading ...</div>}
				<ul>
					{users.map((user) => (
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

export default UsersListBase;
