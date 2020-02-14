import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap';

import { AuthContext } from '../context/auth';

const NavBar = () => {
	const { user, logout } = useContext(AuthContext);

	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth
	});

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth
			});
			return _ => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, [dimensions]);

	const menuBar = user ? (
		<Navbar collapseOnSelect bg='primary' variant='dark' expand='lg'>
			<Container>
				<a href='/'>
					<Navbar.Brand>
						<span className='icon-logo'></span>Joycom
					</Navbar.Brand>
				</a>
				{dimensions.width > 991 ? (
					<Nav>
						<Nav.Link href={`/myAccount/${user._id}`} className='myAccount'>
							Mein Profil<i className='icon-gear'></i>
						</Nav.Link>
						<Nav.Link href='/' className='myAccount' onClick={logout}>
							Ausloggen<i className='icon-log-out'></i>
						</Nav.Link>
					</Nav>
				) : (
					<Dropdown className='user-dropdown' drop='left'>
						<Dropdown.Toggle variant='primary' id='dropdown-basic'>
							<i className='icon-user'></i>
						</Dropdown.Toggle>
						<Dropdown.Menu className='border-inverted'>
							<Dropdown.Item
								className='nav-link myAccount'
								href={`/myAccount/${user._id}`}
							>
								Mein Profil<i className='icon-gear'></i>
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item
								className='nav-link logout'
								href='/'
								onClick={logout}
							>
								Ausloggen
								<i className='icon-log-out'></i>
							</Dropdown.Item>

							{/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item> */}
						</Dropdown.Menu>
					</Dropdown>
				)}

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Link href='/aboutUs' className='aboutUs'>
							Über uns
						</Nav.Link>

						<Nav.Link href='/idea' className='idea'>
							Idee
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	) : (
		<Navbar collapseOnSelect bg='primary' variant='dark' expand='lg'>
			<Container>
				<a href='/'>
					<Navbar.Brand>
						<span className='icon-logo'></span>Joycom
					</Navbar.Brand>
				</a>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav>
						<Nav.Link href='/login'>
							Einloggen<i className='icon-key'></i>
						</Nav.Link>
						<Nav.Link href='/register'>Registrieren</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);

	return <>{menuBar}</>;
};

export default NavBar;
