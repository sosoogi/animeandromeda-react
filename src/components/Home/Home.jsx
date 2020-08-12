import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import AnimeThumb from '../AnimeThumb/AnimeThumb';
import AnimeBanner from '../AnimeBanner/AnimeBanner';
import AnimeSearchField from '../AnimeSearchField/AnimeSearchField';
import Andromeda from '../../assets/banner.jpg';
import globals from '../../globals/variables';
import { Subject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, debounceTime, take } from 'rxjs/operators';
import './Home.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            random: this.props.random,
        }
        this.refetchSub = new Subject();
    }

    handleRandomRefetch = () => {
        this.refetchSub = fromFetch(globals.API_URL + 'anime/random/')
            .pipe(
                switchMap(res => res.json()),
                debounceTime(250),
                take(1)
            )
            .subscribe(data => this.setState({ random: data }), e => console.error(e))
    }

    componentWillUnmount() {
        this.refetchSub.unsubscribe();
    }

    render() {
        return (
            <div className='Home'>
                <AnimeBanner text={'AnimeAndromeda'} pic={Andromeda}></AnimeBanner>
                <AnimeSearchField className='container shadow rounded bg-dark-as-box mb-3 p-3 w-100' />
                <Container className='anime-container p-3 shadow rounded'>
                    <Row>
                        <Col>
                            {this.props.latest?.length > 0 ?
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
                            <h3 className='home-section-title'>{this.props.latest?.length > 0 ? 'Ultimi Anime inseriti' : ''}</h3>
                        </Col>
                    </Row>
                    <Row>
                        {this.props.latest?.map((anime, idx) => (
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
                </Container>
                <div className='mt-3'></div>
                <Container className='anime-container p-3 shadow rounded'>
                    <Row>
                        <Col>
                            {this.props.airing?.length > 0 ?
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
                            <h3 className='home-section-title'>{this.props.airing?.length > 0 ? 'Anime in corso' : ''}</h3>
                        </Col>
                    </Row>
                    <Row>
                        {this.props.airing?.map((anime, idx) => (
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
                </Container>
                <div className='mt-3'></div>
                <Container className='anime-container p-3 shadow rounded'>
                    <Row>
                        <Col>
                            {this.props.random?.length > 0 ?
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
                            <h3 className='home-section-title'>{this.props.random.length > 0 ? 'Anime random' : ''}</h3>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.random.length > 0 ? this.state.random.map((anime, idx) => (
                            <Col xs={6} md={3} lg={2} key={idx + 200}>
                                <AnimeThumb
                                    series={anime.series}
                                    pic={anime.pic}
                                    title={anime.series_pretty}
                                    key={idx}>
                                </AnimeThumb>
                            </Col>
                        )) :
                            this.props.random.map((anime, idx) => (
                                <Col xs={6} md={3} lg={2} key={idx + 200}>
                                    <AnimeThumb
                                        series={anime.series}
                                        pic={anime.pic}
                                        title={anime.series_pretty}
                                        key={idx}>
                                    </AnimeThumb>
                                </Col>
                            ))
                        }
                    </Row>
                    <Row>
                        <Col>
                            {this.props.random.length > 0 ?
                                <Button className='button-random' onClick={this.handleRandomRefetch}>Randomizza</Button> : null}
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

export default Home;