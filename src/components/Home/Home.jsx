import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import AnimeThumb from '../AnimeThumb/AnimeThumb';
import AnimeCarousel from '../AnimeCarousel/AnimeCarousel';
import AnimeSearchField from '../AnimeSearchField/AnimeSearchField';
import AnimeScroller from '../SideScroller/SimpleScroller';
import Paypal from '../../assets/paypal.svg';
import { fromEvent, ReplaySubject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import globals from '../../globals/variables';
import './Home.scss';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            latest: [],
            airing: [],
            random: [],
        }

        this.latestSub = new Subject();
        this.airingSub = new Subject();
        this.randomSub = new ReplaySubject();
        this.randomButton = new React.createRef()
    }

    async componentDidMount() {
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

        this.randomSub = fromEvent(this.randomButton.current, 'click')
            .pipe(
                debounceTime(200),
            )
            .subscribe(() => {
                fromFetch(globals.API_URL + 'anime/random')
                    .pipe(
                        switchMap(res => res.json()),
                    )
                    .subscribe(data => this.setState({ random: data }), e => console.error(e))
            });
    }

    componentWillUnmount() {
        this.latestSub.unsubscribe();
        this.airingSub.unsubscribe();
        this.randomSub.unsubscribe();
    }

    render() {
        return (
            <main className='Home'>
                {/* <AnimeBanner text={'AnimeAndromeda'} pic={AndromedaDark}></AnimeBanner> */}
                <AnimeSearchField className='container shadow rounded bg-dark-as-box mb-3 p-3 w-100'></AnimeSearchField>
                <Container className='home-anime-container shadow rounded mobile-responsive'>
                    {this.state.airing?.length > 0 ?
                        <AnimeCarousel apiResponse={this.state.airing} /> :
                        <React.Fragment>
                            <Spinner animation="grow" className='loader-themed mt-5' />
                        </React.Fragment>
                    }
                </Container>
                <div className='mt-3'></div>
                <Container className='home-anime-container p-3 shadow rounded'>
                    <Row>
                        <Col>
                            {this.state.latest?.length > 0 ?
                                null :
                                <React.Fragment>
                                    <Spinner animation="grow" className='loader-themed mt-5' />
                                </React.Fragment>
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
                <Container className='home-anime-container p-3 shadow rounded'>
                    <Row>
                        <Col>
                            {this.state.airing?.length > 0 ?
                                null :
                                <React.Fragment>
                                    <Spinner animation="grow" className='loader-themed mt-5' />
                                </React.Fragment>
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
                <Container className='home-anime-container p-3 shadow rounded'>
                    <Row>
                        <Col>
                            {this.state.random?.length > 0 ?
                                null :
                                <React.Fragment>
                                    <Spinner animation="grow" className='loader-themed mt-5' />
                                </React.Fragment>
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
                            window.innerWidth <= globals.MOBILE_MAX_WIDTH ?
                                <AnimeScroller data={this.state.random}></AnimeScroller> : null
                        }
                    </Row>
                    <Row>
                        {
                            window.innerWidth > globals.MOBILE_MAX_WIDTH ?
                                this.state.random.map((anime, idx) => (
                                    <Col xs={6} md={3} lg={2} key={idx} className='mobile-responsive-col'>
                                        <AnimeThumb
                                            series={anime.series}
                                            pic={anime.pic}
                                            title={anime.series_pretty}
                                            key={anime.idMAL}>
                                        </AnimeThumb>
                                    </Col>
                                )) : null
                        }
                    </Row>
                    <Row>
                        <Col>
                            {this.state.random.length > 0 ?
                                <Button ref={this.randomButton} className='button-random'>{'Random '}</Button> :
                                <Button ref={this.randomButton} style={{ display: 'none' }} className='button-random'>Random</Button>
                            }
                        </Col>
                    </Row>
                </Container>

                <div className='mt-3'></div>
                <Container className='p-0'>
                    <Alert className='pp-h' onClick={() => window.open('https://paypal.me/pools/c/8somkJXivr')}>
                        <span>
                            <img alt='telegram' src={Paypal} height={16}></img>&nbsp;
                        </span>
                         Aiuta lo sviluppo con una piccola donazione
                    </Alert>
                </Container>

            </main>
        );
    }
}

export default Home;