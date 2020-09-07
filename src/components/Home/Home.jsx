import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import AnimeThumb from '../AnimeThumb/AnimeThumb';
import AnimeBanner from '../AnimeBanner/AnimeBanner';
import AnimeCarousel from '../AnimeCarousel/AnimeCarousel';
import AnimeSearchField from '../AnimeSearchField/AnimeSearchField';
import AndromedaDark from '../../assets/banner.webp';
import AndromedaLight from '../../assets/banner-light.webp';
import { fromEvent, ReplaySubject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import globals from '../../globals/variables';
import './Home.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latest: [],
            airing: [],
            random: [],
            banner: ''
        }

        this.latestSub = new Subject();
        this.airingSub = new Subject();
        this.randomSub = new Subject();
        this.refetchSub = new ReplaySubject();
        this.randomButton = new React.createRef()
    }

    componentDidMount() {
        this.latestSub = fromFetch(globals.API_URL + 'anime/latest')
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => this.setState({ latest: data }), e => console.error(e));

        this.airingSub = fromFetch(globals.API_URL + 'anime/latest/airing')
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => this.setState({ airing: data }), e => console.error(e));

        this.randomSub = fromFetch(globals.API_URL + 'anime/random')
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => this.setState({ random: data }), e => console.error(e));

        fromEvent(this.randomButton.current, 'click')
            .pipe(
                debounceTime(250),
            )
            .subscribe(() => {
                fromFetch(globals.API_URL + 'anime/random')
                    .pipe(
                        switchMap(res => res.json()),
                    )
                    .subscribe(data => this.setState({ random: data }), e => console.error(e))
            });

        (localStorage.getItem('theme') || 'dark') === 'dark' ?
            this.setState({ banner: AndromedaDark }) :
            this.setState({ banner: AndromedaLight })
    }

    componentWillUnmount() {
        this.latestSub.unsubscribe();
        this.randomSub.unsubscribe();
        this.airingSub.unsubscribe();
        this.refetchSub.unsubscribe();
    }

    render() {
        return (
            <div className='Home'>
                <AnimeBanner text={'AnimeAndromeda'} pic={this.state.banner}></AnimeBanner>
                <AnimeSearchField className='container shadow rounded bg-dark-as-box mb-3 p-3 w-100'></AnimeSearchField>
                <Container className='anime-container shadow rounded mobile-responsive'>
                    {this.state.airing?.length > 0 ?
                        <AnimeCarousel /> :
                        <div>
                            <br></br>
                            <Spinner animation="grow" className='loader-themed' />
                        </div>
                    }
                </Container>
                <div className='mt-3'></div>
                <Container className='anime-container p-3 shadow rounded'>
                    <Row>
                        <Col>
                            {this.state.latest?.length > 0 ?
                                null :
                                <div>
                                    <br></br>
                                    <Spinner animation="grow" className='loader-themed' />
                                </div>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3 className='home-section-title'>{this.state.latest?.length > 0 ? 'Ultimi Anime inseriti' : ''}</h3>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.latest?.map((anime, idx) => (
                            <Col xs={6} md={3} lg={2} key={idx} className='mobile-responsive-col'>
                                <AnimeThumb
                                    series={anime._id.series}
                                    pic={anime.pic}
                                    thumb={anime.thumb}
                                    title={anime.pretty}
                                    key={anime._id.series}>
                                </AnimeThumb>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <div className='mt-3'></div>
                <Container className='anime-container p-3 shadow rounded'>
                    <Row>
                        <Col>
                            {this.state.airing?.length > 0 ?
                                null :
                                <div>
                                    <br></br>
                                    <Spinner animation="grow" className='loader-themed' />
                                </div>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3 className='home-section-title'>{this.state.airing?.length > 0 ? 'Anime in corso' : ''}</h3>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.airing?.map((anime, idx) => (
                            <Col xs={6} md={3} lg={2} key={idx} className='mobile-responsive-col'>
                                <AnimeThumb
                                    series={anime._id.series}
                                    pic={anime.pic}
                                    thumb={anime.thumb}
                                    title={anime.pretty}
                                    key={anime._id.series}>
                                </AnimeThumb>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <div className='mt-3'></div>
                <Container className='anime-container p-3 shadow rounded'>
                    <Row>
                        <Col>
                            {this.state.random?.length > 0 ?
                                null :
                                <div>
                                    <br></br>
                                    <Spinner animation="grow" className='loader-themed' />
                                </div>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3 className='home-section-title'>{this.state.random.length > 0 ? 'Anime random' : ''}</h3>
                        </Col>
                    </Row>
                    <Row>
                        {
                            this.state.random.map((anime, idx) => (
                                <Col xs={6} md={3} lg={2} key={idx} className='mobile-responsive-col'>
                                    <AnimeThumb
                                        series={anime.series}
                                        pic={anime.pic}
                                        title={anime.series_pretty}
                                        key={anime.idMAL}>
                                    </AnimeThumb>
                                </Col>
                            ))
                        }
                    </Row>
                    <Row>
                        <Col>
                            {this.state.random.length > 0 ?
                                <Button ref={this.randomButton} className='button-random'>Random</Button> :
                                <Button ref={this.randomButton} style={{ display: 'none' }} className='button-random'>Random</Button>
                            }
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

export default Home;