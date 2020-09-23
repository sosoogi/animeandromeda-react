import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch';
import cookie from 'js-cookie'
import globals from '../../globals/variables';
import './Login.scss';


const Login = (props) => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let subscription = new Observable();

    const performLogin = () => {
        subscription = fromFetch(`${globals.AUTH_API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => {
                cookie.set('auth-token', data);
                props.history.push('/profile')

            }, () => { setError(true) });

        return () => subscription.unsubscribe();
    }

    const performSignup = () => {
        subscription = fromFetch(`${globals.AUTH_API_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
            })
        })
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(() => {
                props.history.push('/')

            }, () => { setError(true) });

        return () => subscription.unsubscribe();
    }

    return (
        <main>
            <div className='mt-3'></div>
            <Container className='home-anime-container p-3 shadow rounded'>
                <Row>
                    <Col>
                        <h3 className='home-section-title'>Login</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <InputGroup className='mb-3'>
                            <FormControl
                                placeholder='Username o email'
                                aria-label='Username o email'
                                name='username'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <FormControl
                                placeholder='Password'
                                aria-label='Password'
                                name='password'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputGroup>
                        <Button className='login-button' onClick={() => performLogin()}>Login</Button>
                    </Col>
                    <Col md={6} className='text-left p-0'>
                        <ul style={{ listStyleType: 'none' }}>
                            Con il tuo account sarai in grado di
                            <li><span role='img' aria-label='el1'>⌚</span> Riprendere la visione da dove ti sei fermato</li>
                            <li><span role='img' aria-label='el2'>❤️</span> Salvare i tuoi anime preferiti in una comoda lista</li>
                            <li><span role='img' aria-label='el3'>✨</span> Boh</li>
                        </ul>
                    </Col>
                </Row>
                {error ?
                    <React.Fragment>
                        <div className='mt-3'></div>
                        <Row>
                            <Col>
                                <Alert variant={'danger'}>
                                    Username o password incorretti
                            </Alert>
                            </Col>
                        </Row>
                    </React.Fragment> : null
                }
                <div className='mt-4 text-center'>oppure</div>
                <Row>
                    <Col>
                        <h3 className='home-section-title'>Registrati</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <InputGroup className='mb-3'>
                            <FormControl
                                placeholder='Username'
                                aria-label='Username'
                                name='username'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <FormControl
                                placeholder='email'
                                aria-label='email'
                                name='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <FormControl
                                placeholder='Password'
                                aria-label='Password'
                                name='rpassword'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputGroup>
                        <Button className='login-button' onClick={() => performSignup()}>Login</Button>
                    </Col>
                    <Col md={6} className='text-left p-0'>
                        <ul style={{ listStyleType: 'none' }}>
                            Crea il tuo account
                                <li>&nbsp;La password deve essere almeno di <strong>6 caratteri</strong></li>
                            <li>&nbsp;L'username può contenere <strong>caratteri speciali</strong></li>
                            <li>&nbsp;L'email momentaneamente <strong>non verrà validata</strong></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </main >
    );
}


export default Login;
