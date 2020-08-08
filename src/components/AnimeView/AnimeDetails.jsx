import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AnimeThumb from '../AnimeThumb/AnimeThumb';
import './Home.scss';
import { Button } from 'react-bootstrap';

const AnimeView = ({ anime }) => {
    let animes = [];
    fetch(globals.API_URL + 'anime/search/' + anime)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            animes = data;
        })
        .catch(console.error);

    return (
        <div className='Home'>
            <Container>
                <Row>

                </Row>
                <Row>
                    <Col>
                        {animes?.map((anime, idx) => (
                            <Link to={'/anime/search/' + this.props.series} key={idx}>
                                <Button key={idx}>{}</Button>
                            </Link>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AnimeView;
