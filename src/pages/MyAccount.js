import React from 'react';

import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Container, Image } from 'react-bootstrap';

const MyAccount = props => {
	const userId = props.match.params.userId;

	const { loading, data } = useQuery(GET_USER_QUERY, {
		variables: { userId }
	});

	const pageBack = () => {
		window.history.back();
	};

	let myAccountMarkup;

	if (loading) {
		myAccountMarkup = <p>Dein Profil lädt...</p>;
	} else {
		const { username, email, createdAt, avatar } = data.getUser;

		myAccountMarkup = (
			<Container>
				<Button className='back-button' onClick={() => pageBack()}>
					<span className='icon-left-circle'></span>
					Zurück
				</Button>
				<Button className='category-button' href='/'>
					<span className='icon-categories'></span> zu den Kategorien
				</Button>
				<div className='myAccount content-wrapper'>
					<Image src={require(`../assets/img/avatar-${avatar}.png`)} />
					<div className='accountInfos'>
						<p>Benutzername: {username}</p>
						<p>Email-Adresse: {email}</p>
						<p>Registriert seit: {moment(createdAt).fromNow(true)}</p>
					</div>
				</div>
			</Container>
		);
	}

	return (
		<>
			<div className='myAccount-wrapper'>{myAccountMarkup}</div>
		</>
	);
};

const GET_USER_QUERY = gql`
	query getUser($userId: ID!) {
		getUser(userId: $userId) {
			_id
			username
			email
			password
			createdAt
			updatedAt
			avatar
		}
	}
`;

export default MyAccount;
