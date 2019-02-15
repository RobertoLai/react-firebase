import React from 'react';

const UsersList = ({ users }) => (
	<ul>
		{users.map((user) => (
			<li key={user.id}>
				<span>
					<strong>ID</strong>
				</span>
				{user.id}
				<span>
					<strong>E-Mail</strong>
				</span>
				{user.email}
				<span>
					<strong>Username</strong>
				</span>
				{user.username}
			</li>
		))}
	</ul>
);

export default UsersList;
