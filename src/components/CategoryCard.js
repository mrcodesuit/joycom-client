import React from 'react';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CategoryCard = ({ category }) => {
	const { _id, name, eventCount } = category;

	return (
		<>
			<LinkContainer to={eventCount < 1 ? '' : `/categoryPage/${_id}`}>
				<Card className={`category bg-dark text-white category_${_id}`}>
					<Card.Img
						src={require(`../assets/img/categoryThumbnail_${_id}.jpg`)}
					/>
					<Card.ImgOverlay>
						<Card.Title>{name}</Card.Title>
						{eventCount < 1 ? (
							<></>
						) : (
							<>
								<Card.Link className='counter' href={`/categoryPage/${_id}`}>
									Events: {eventCount}
								</Card.Link>
								<Card.Link
									className='arrow'
									href={`/categoryPage/${_id}`}
								></Card.Link>
							</>
						)}
					</Card.ImgOverlay>
				</Card>
			</LinkContainer>
		</>
	);
};

export default CategoryCard;
