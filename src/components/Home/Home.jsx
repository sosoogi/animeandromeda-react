import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import AnimeThumb from '../AnimeThumb/AnimeThumb';
import AnimeBanner from '../AnimeBanner/AnimeBanner';
import AnimeCarousel from '../AnimeCarousel/AnimeCarousel';
import AnimeSearchField from '../AnimeSearchField/AnimeSearchField';
import AndromedaDark from '../../assets/banner.webp';
import Paypal from '../../assets/paypal.svg';
// import Github from '../../assets/github.svg';
import { fromEvent, ReplaySubject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import globals from '../../globals/variables';
import ReactGA from 'react-ga';
import './Home.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latest: [],
            airing: [],
            random: [],
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

        this.refetchSub = fromEvent(this.randomButton.current, 'click')
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

        ReactGA.pageview(window.location.pathname + window.location.search);
        ReactGA.event({
            category: 'Home',
            action: 'User landed on the site'
        });
    }

    componentWillUnmount() {
        this.latestSub.unsubscribe();
        this.randomSub.unsubscribe();
        this.airingSub.unsubscribe();
        this.refetchSub.unsubscribe();
    }

    render() {
        return (
            <main className='Home'>
                <AnimeBanner text={'AnimeAndromeda'} pic={AndromedaDark}></AnimeBanner>
                <AnimeSearchField className='container shadow rounded bg-dark-as-box mb-3 p-3 w-100'></AnimeSearchField>
                <Container className='home-anime-container shadow rounded mobile-responsive'>
                    {this.state.airing?.length > 0 ?
                        <AnimeCarousel /> :
                        <div>
                            <br></br>
                            <Spinner animation="grow" className='loader-themed' />
                        </div>
                    }
                </Container>
                <div className='mt-3'></div>
                <Container className='home-anime-container p-3 shadow rounded'>
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
                <Container className='home-anime-container p-3 shadow rounded'>
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
                <Container className='home-anime-container p-3 shadow rounded'>
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

                <div className='mt-3'></div>
                <Container className='p-0'>
                    <a href='https://paypal.me/pools/c/8somkJXivr'>
                        <Alert className='pp-h'>
                            <span>
                                <img alt='telegram' src={Paypal} height={16}></img>&nbsp;
                            </span>
                            Aiuta lo sviluppo con una piccola donazione
                        </Alert>
                    </a>
                </Container>

                {/* <Container className='p-0'>
                    <a href='https://github.com/oppaoppai/animeandromeda-python'>
                        <Alert className='pp-g'>
                            <span>
                                <img alt='telegram' src={Github} height={16}></img>&nbsp;
                            </span>
                            Dai pure un'occhiata alle sorgenti su Github
                        </Alert>
                    </a>
                </Container> */}

            </main>
        );
    }
}

export default Home;