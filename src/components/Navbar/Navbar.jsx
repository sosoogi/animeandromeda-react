import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../assets/Illustration4.svg';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const AnimeNavbar = () => {
    const [navExpanded, setExpanded] = useState(false);

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
                            <img
                                alt=''
                                height='42'
                                src={Logo}
                            />{' '}
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar" aria-label="toggle navbar" />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => { setExpanded(false) }} as={Link} to='/anime/archivio'>Archivio</Nav.Link>
                            <Nav.Link onClick={() => { setExpanded(false) }} as={Link} to='/anime/calendario'>Calendario</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Altro" bsPrefix='typo-normal' id='navbardropdown-h'>
                                <NavDropdown.Item onClick={() => { setExpanded(false) }} as={Link} to='/about'>About us</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="https://paypal.me/pools/c/8somkJXivr">Supporta lo sviluppo</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
}

export default AnimeNavbar;