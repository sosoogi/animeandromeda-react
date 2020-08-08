import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AnimeThumb from '../AnimeThumb/AnimeThumb';
import './Home.scss';

const Home = ({ latest, airing, random }) => {
    return (
        <div className='Home'>
            <Container>
                <Row>
                    {latest?.map((anime, idx) => (
                        <Col xs={6} md={3} lg={2} key={idx}>
                            <AnimeThumb
                                series={anime._id.series}
                                pic={anime.pic}
                                thumb={anime.thumb}
                                title={anime.pretty}
                                key={idx}>
                            </AnimeThumb>
                        </Col>
                    ))}
                </Row>
                <Row>
                    {airing?.map((anime, idx) => (
                        <Col xs={6} md={3} lg={2} key={idx}>
                            <AnimeThumb
                                series={anime._id.series}
                                pic={anime.pic}
                                thumb={anime.thumb}
                                title={anime.pretty}
                                key={idx}>
                            </AnimeThumb>
                        </Col>
                    ))}
                </Row>
                <Row>
                    {random?.map((anime, idx) => (
                        <Col xs={6} md={3} lg={2} key={idx}>
                            <AnimeThumb
                                series={anime.series}
                                pic={anime.pic}
                                title={anime.series_pretty}
                                key={idx}>
                            </AnimeThumb>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Home;
