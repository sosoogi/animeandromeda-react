import React, { useState, useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import cookie from 'js-cookie';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import AnimeBanner from '../AnimeBanner/AnimeBanner';
import { CameraFill, Back, X } from 'react-bootstrap-icons';
import globals from '../../globals/variables';
import './Profile.scss';

const Profile = (props) => {
    const [userData] = useContext(UserContext);
    const [uploaded, setUploaded] = useState(false);

    const submitPictures = (event, endpoint) => {
        let subscription = new BehaviorSubject([]);

        const files = event.target.files;
        const formData = new FormData();
        formData.append(event.target.name, files[0], files[0].name);

        subscription = fromFetch(`${globals.AUTH_API_URL}/user/${endpoint}`, {
            method: 'POST',
            headers: {
                'x-auth-token': cookie.get('auth-token'),
            },
            body: formData,
        })
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(() => setUploaded(true));
        return () => subscription.unsubscribe();
    }

    const changeUsername = (event, endpoint) => {
        let subscription = new BehaviorSubject([]);

        subscription = fromFetch(`${globals.AUTH_API_URL}/user/changeusername`, {
            method: 'PATCH',
            headers: {
                'x-auth-token': cookie.get('auth-token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: event.target.value
            })
        })
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(() => setUploaded(true));
        return () => subscription.unsubscribe();
    }

    const deleteLoved = (series) => {
        let subscription = new BehaviorSubject([]);

        subscription = fromFetch(`${globals.AUTH_API_URL}/user/loved`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': cookie.get('auth-token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                loved: series
            })
        })
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(() => setUploaded(true));
        return () => subscription.unsubscribe();
    }

    return (
        userData.username ?
            <main>
                <AnimeBanner pic={userData.background}></AnimeBanner>
                <div className='mt-3'></div>
                <Container className='home-anime-container shadow rounded p-3'>
                    <Row>
                        <Col lg={2} md={4}>
                            <Image src={userData.img} height={150} rounded />
                            <h5
                                className='mt-2 font-weight-bold'
                                onChange={(e) => changeUsername(e)}
                            >
                                {userData.username}
                            </h5>
                        </Col>
                        <Col lg={10} md={8} className='text-left'>
                            <Row>
                                <Col>
                                    <h3 className='home-section-title'>Serie salvate</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ListGroup>
                                        {userData.loved?.map((x, idx) => (
                                            <ListGroup.Item className='list-group-profile' key={x.series + idx}>
                                                <Link to={`/anime/details/${x.series}`} className='profile-links'>
                                                    <span>{x.title}</span>
                                                </Link>
                                                <X onClick={() => deleteLoved(x)} className='float-right' style={{ cursor: 'pointer' }}></X>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <div className='mt-3'></div>
                <Container className='anime-container shadow rounded p-3'>
                    <Row>
                        <Col sm={12}>
                            <Form className='m-1' onChange={(e) => submitPictures(e, 'pic')}>
                                <CameraFill></CameraFill> Foto profilo
                                <Form.File className='text-left'
                                    id="file-propic"
                                    name='propic'
                                    data-browse='Scegli'
                                    label='Grandezza massima file: 1MB'
                                    custom
                                    accept="image/png, image/jpeg"
                                >
                                </Form.File>

                            </Form>
                        </Col>
                        <Col sm={12}>
                            <Form className='m-1' onChange={(e) => submitPictures(e, 'background')} >
                                <Back></Back> Immagine sfondo
                                <Form.File className='text-left'
                                    id="file-background"
                                    name='background'
                                    data-browse='Scegli'
                                    label='Grandezza massima file: 1MB'
                                    custom
                                    accept="image/png, image/jpeg"
                                >
                                </Form.File>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className='mt-5 float-left' variant="danger"
                                onClick={() => {
                                    cookie.remove('auth-token');
                                    props.history.push('/')
                                }}>
                                Logout
                            </Button>
                        </Col>
                    </Row>
                </Container>

                <React.Fragment>
                    <Toast
                        show={uploaded}
                        onClose={() => setUploaded(false)}
                        className='fixed-top ml-auto'
                    >
                        <Toast.Header>
                            <strong className="mr-auto">Successo!</strong>
                            <small>ora</small>
                        </Toast.Header>
                        <Toast.Body style={{ color: '#343a40 ' }}>
                            Ottimo, ricarica la pagina per rendere effettive le modifiche
                        </Toast.Body>
                    </Toast>
                </React.Fragment>

            </main > :
            <React.Fragment>
                <Spinner animation="grow" className='loader-themed mt-5' />
            </React.Fragment>
    );
}

export default Profile;