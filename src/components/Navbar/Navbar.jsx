import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/Illustration4.svg';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const AnimeNavbar = () => {
    return (
        <div>
            <Navbar className='home-navbar py-1' variant="dark" >
                <Link to='/'>
                    <Navbar.Brand>
                        <img
                            alt=''
                            height='48'
                            src={Logo}
                        />{' '}
                    </Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to='/anime/archivio'>Archivio</Nav.Link>
                    <Nav.Link as={Link} to='/anime/calendario'>Calendario</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}

export default AnimeNavbar;