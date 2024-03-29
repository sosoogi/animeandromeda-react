import React, { useState, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/Illustration4.svg';
import { Link } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import './Navbar.scss';

const AnimeNavbar = () => {
    const [navExpanded, setExpanded] = useState(false);
    const [userData] = useContext(UserContext);

    return (
        <div className='container-fluid home-navbar'>
            <div className='container p-0'>
                <Navbar expand='lg'
                    expanded={navExpanded}
                    onToggle={(expanded) => setExpanded(expanded)}
                    className='home-navbar px-0 py-1'
                    variant="dark"
                >
                    <Link to='/' aria-label="Ritorna alla Home">
                        <Navbar.Brand onClick={() => setExpanded(false)}>
                            <img alt='animeandromeda logo' height='42' src={Logo} />{' '}
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar" aria-label="toggle navbar" />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => { setExpanded(false) }} as={Link} to='/archivio'>Archivio</Nav.Link>
                            <Nav.Link onClick={() => { setExpanded(false) }} as={Link} to='/calendario'>Calendario</Nav.Link>
                            <Nav.Link onClick={() => { setExpanded(false) }} as={Link} to='/top'>Top Anime</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => { setExpanded(false) }} as={Link} to='/about'>Altro</Nav.Link>
                            <Nav.Link onClick={() => { setExpanded(false) }} as={Link} to='/profile'>
                                {userData.username ? userData.username : 'Login'}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
}

export default AnimeNavbar;