import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
				<Link to='/'>
					<Navbar.Brand>
						<span className='icon-logo'></span>Joycom
					</Navbar.Brand>
				</Link>
				{dimensions.width > 991 ? (
					<Nav>
						<Link to={`/myAccount/${user._id}`} className='myAccount nav-link'>
							Mein Profil<i className='icon-gear'></i>
						</Link>
						<Link to='/' className='myAccount nav-link' onClick={logout}>
							Ausloggen<i className='icon-log-out'></i>
						</Link>
					</Nav>
				) : (
					<Dropdown className='user-dropdown' drop='left'>
						<Dropdown.Toggle variant='primary' id='dropdown-basic'>
							<i className='icon-user'></i>
						</Dropdown.Toggle>
						<Dropdown.Menu className='border-inverted'>
							<Link
								to={`/myAccount/${user._id}`}
								className='nav-link myAccount dropdown-item'
							>
								Mein Profil<i className='icon-gear'></i>
							</Link>

							<Dropdown.Divider />

							<Link
								className='nav-link logout dropdown-item'
								to='/'
								onClick={logout}
							>
								Ausloggen
								<i className='icon-log-out'></i>
							</Link>

							{/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item> */}
						</Dropdown.Menu>
					</Dropdown>
				)}

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<Link to='/aboutUs' className='aboutUs nav-link'>
							Über uns
						</Link>

						<Link to='/idea' className='idea nav-link'>
							Idee
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	) : (
		<Navbar collapseOnSelect bg='primary' variant='dark' expand='lg'>
			<Container>
				<Link to='/'>
					<Navbar.Brand>
						<span className='icon-logo'></span>Joycom
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav>
						<Link to='/login' className='nav-link'>
							Einloggen<i className='icon-key'></i>
						</Link>
						<Link to='/register' className='nav-link'>
							Registrieren
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);

	return <>{menuBar}</>;
};

export default NavBar;
