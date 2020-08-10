import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import AnimeThumb from '../AnimeThumb/AnimeThumb';
import AnimeBanner from '../AnimeBanner/AnimeBanner';
import AnimeSearchField from '../AnimeSearchField/AnimeSearchField';
import Andromeda from '../../assets/andromeda2.jpg'
import './Home.scss';

const Home = ({ latest, airing, random }) => {
    return (
        <div className='Home'>
            <AnimeBanner text={'AnimeAndromeda'} pic={Andromeda}></AnimeBanner>
            <AnimeSearchField className='container shadow rounded bg-dark-as-box mb-3 p-3 w-100' />
            <Container>
                <Row>
                    <Col>
                        {latest?.length > 0 && airing?.length > 0 && random?.length > 0 ?
                            null :
                            <div>
                                <br></br>
                                <Spinner animation="grow" variant="light" />
                            </div>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className='home-section-title'>{latest?.length > 0 ? 'Ultimi Anime inseriti' : ''}</h3>
                    </Col>
                </Row>
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
                    <Col>
                        <h3 className='home-section-title'>{airing?.length > 0 ? 'Anime in corso' : ''}</h3>
                    </Col>
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
                    <Col>
                        <h3 className='home-section-title'>{random?.length > 0 ? 'Anime random' : ''}</h3>
                    </Col>
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
