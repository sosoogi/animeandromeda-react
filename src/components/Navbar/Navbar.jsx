import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../assets/Illustration4.svg';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const AnimeNavbar = () => {
    return (
        <div className='container-fluid home-navbar'>
            <div className='container p-0'>
                <Navbar className='home-navbar px-0 py-1' variant="dark" >
                    <Link to='/'>
                        <Navbar.Brand>
                            <img
                                alt=''
                                height='42'
                                src={Logo}
                            />{' '}
                        </Navbar.Brand>
                    </Link>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/anime/archivio'>Archivio</Nav.Link>
                        <Nav.Link as={Link} to='/anime/calendario'>Calendario</Nav.Link>
                    </Nav>
                    <NavDropdown drop='left' title="Altro" bsPrefix='typo-normal px-1' id='navbardropdown-h'>
                        <NavDropdown.Item as={Link} to='/about'>About us</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="https://paypal.me/pools/c/8somkJXivr">Supporta lo sviluppo</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>
            </div>
        </div>
    );
}

export default AnimeNavbar;