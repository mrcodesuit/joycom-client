import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
	Accordion,
	Card,
	Container,
	Col,
	Row,
	Jumbotron,
	Spinner,
	Button
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import { FETCH_CATEGORY_EVENTS_QUERY } from '../util/graphql';
import EventItem from '../components/EventItem';
import EventForm from '../components/EventForm';

const CategoryPage = props => {
	const categoryId = props.match.params.categoryId;
	const { user } = useContext(AuthContext);
	let history = useHistory();

	const { loading, data } = useQuery(FETCH_CATEGORY_EVENTS_QUERY, {
		variables: { categoryId }
	});
	console.log(data);

	const pageBack = () => {
		history.go(-1);
	};

	if (data) {
		var eventsCount = data.getEventsCategory.length > 0;
		if (eventsCount) {
			var categoryName = data.getEventsCategory[0].category;
		}
	}

	const categoryMarkup = (
		<>
			<div className='categoryPage pageWrapper'>
				<Container className='container-mobile'>
					<Jumbotron
						className={`jumbotron-categories jumbotron-${categoryId} text-white`}
					>
						<h1 className='page-header'>{categoryName}</h1>
						<p className='page-header-subtitle'></p>
					</Jumbotron>
				</Container>
				<Container>
					<h2 className='page-header--no-m text-center d-block'>
						Neueste Events
					</h2>
					<div className='categoryPageActions'>
						<Button className=' mt-3' onClick={() => pageBack()}>
							<span className='icon-categories'></span> zu den Kategorien
						</Button>
						{user && (
							<Accordion className='addEventAccordion'>
								<Card>
									<Accordion.Toggle
										className='mt-3 toggleButton'
										as={Button}
										variant='primary'
										eventKey='0'
									>
										<span className='icon-pencil'></span>
										Neues Event
									</Accordion.Toggle>

									<Accordion.Collapse eventKey='0'>
										<Card.Body>
											<EventForm categoryName={categoryName} />
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						)}
					</div>

					<Row>
						{data &&
							data.getEventsCategory.map((event, index) => (
								<Col key={index} xs={12} lg={6}>
									<EventItem event={event} />
								</Col>
							))}
					</Row>
				</Container>
			</div>
		</>
	);

	return (
		<>
			{eventsCount ? (
				<>
					{loading ? (
						<Spinner animation='border' variant='primary' />
					) : (
						<>{categoryMarkup}</>
					)}
				</>
			) : (
				<div className='categoryPage'>
					<Jumbotron
						className={`jumbotron-categories jumbotron-${categoryId} text-white`}
					>
						<Container>
							<h1 className='page-header'>{categoryName}</h1>
							<p className='page-header-subtitle'></p>
						</Container>
					</Jumbotron>
					<Container>
						<h2 className='page-header--no-m text-center d-block'>
							Neueste Events
						</h2>
						<div className='categoryPageActions'>
							<Button className=' mt-3' href='/'>
								zu den Kategorien
							</Button>
							<Accordion className='addEventAccordion'>
								<Card>
									<Accordion.Toggle
										className='mt-3 toggleButton'
										as={Button}
										variant='primary'
										eventKey='0'
									>
										Neues Event
									</Accordion.Toggle>

									<Accordion.Collapse eventKey='0'>
										<Card.Body>
											<EventForm />
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						</div>

						<Row>
							<Col>
								<p className='mt-5'>
									Es existieren keine Events für die Kategorie...
								</p>
							</Col>
						</Row>
					</Container>
				</div>
			)}
		</>
	);
};
export default CategoryPage;
