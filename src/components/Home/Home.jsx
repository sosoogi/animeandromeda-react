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
import AnimeScroller from '../HScroller/SimpleScroller';
// import Instagram from '../../assets/instagram.svg';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import globals from '../../globals/variables';
import './Home.scss';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            // latest: [],
            airing: [],
            random: [],
            upcoming: [],
            showSupport: false,
        }

        this.$airingAnimes = new BehaviorSubject([]);
        this.$upcomingAnimes = new BehaviorSubject([]);
        this.$randomAnimes = new BehaviorSubject();
        this.randomButton = new React.createRef()
    }

    async componentDidMount() {
        window.scrollTo(0, 0);

        this.$upcomingAnimes = fromFetch(`${globals.API_URL}anime/upcoming`)
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => this.setState({ upcoming: data }), e => console.error(e));

        this.$airingAnimes = fromFetch(`${globals.API_URL}anime/latest/airing`)
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => this.setState({ airing: data }), e => console.error(e));

        this.$randomAnimes = fromFetch(`${globals.API_URL}anime/random`)
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => this.setState({ random: data }), e => console.error(e));

        this.$randomAnimes = fromEvent(this.randomButton.current, 'click')
            .pipe(
                debounceTime(175),
            )
            .subscribe(() => {
                fromFetch(`${globals.API_URL}anime/random`)
                    .pipe(
                        switchMap(res => res.json()),
                    )
                    .subscribe(data => this.setState({ random: data }), e => console.error(e))
            });
    }

    toggleSupport = () => {
        this.setState(state => ({ showSupport: !state.showSupport }));
    }

    componentWillUnmount() {
        this.$upcomingAnimes.unsubscribe();
        this.$airingAnimes.unsubscribe();
        this.$randomAnimes.unsubscribe();
    }

    render() {
        const helmetContext = {}
        return (
            <main className='Home'>
                <HelmetProvider context={helmetContext}>
                    <Helmet>
                        <meta name='language' content='it' />
                        <meta name="description" content={'Archivio Anime senza pubblicità, communitiy driven ed ottimizzato per l\'uso mobile.' +
                            'Aggiungi l\'applicazione alla schermata home per averla sempre a portata di mano!'} />
                        <title>{'AnimeAndromeda - Streaming Anime SUB ITA senza pubblicità - Anime Andromeda'}</title>
                        <link rel='canonical' href='https://www.animeandromeda.net' />
                    </Helmet>
                </HelmetProvider>
                <AnimeSearchField className='container shadow rounded bg-dark-as-box mb-3 p-3 w-100'></AnimeSearchField>
                {this.state.showSupport ?
                    <Container className='p-0'>
                        <Alert variant='primary' onClose={() => this.toggleSupport()} dismissible>
                            <strong>Abbiamo bisogno del tuo aiuto! Puoi supportare il progetto partecipando allo
                                sviluppo!</strong>
                            <hr />
                            <span>{'Se hai qualche dubbio, domanda, qualisasi cosa, contattaci su '}
                                <Alert.Link href={'https://www.instagram.com/animeandromeda/'}>Instagram</Alert.Link>
                            </span>
                        </Alert>
                    </Container> : null
                }
                <Container className='home-anime-container shadow rounded mobile-responsive'>
                    {this.state.airing?.length > 0 ?
                        <AnimeCarousel apiResponse={this.state.upcoming.concat(this.state.airing)} /> :
                        <React.Fragment>
                            <Spinner animation="grow" className='loader-themed mt-5' />
                        </React.Fragment>
                    }
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
                            <h3 className='home-section-title'>{this.state.airing?.length > 0 ? 'Utlime aggiunte' : ''}</h3>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.airing?.map((anime, idx) => (
                            <Col xs={6} md={3} lg={2} key={idx} className='mobile-responsive-col'>
                                <AnimeThumb
                                    series={anime._id.series}
                                    pic={anime.pic}
                                    title={anime.pretty}
                                    ep={anime.count}
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
                                            premiere={anime.premiere}
                                            loved={true}
                                            key={anime.idMAL}>
                                        </AnimeThumb>
                                    </Col>
                                )) : null
                        }
                    </Row>
                    <Row>
                        <Col>
                            {(this.state.random.length > 0) && (window.innerWidth > globals.MOBILE_MAX_WIDTH) ?
                                <Button ref={this.randomButton} className='button-random'>{'Random '}</Button> :
                                <Button ref={this.randomButton} style={{ display: 'none' }} className='button-random'>Random</Button>
                            }
                        </Col>
                    </Row>
                </Container>

                {/* <div className='mt-3'></div>
                <Container className='p-0'>
                    <Alert className='pp-i' onClick={() => window.open('https://www.instagram.com/animeandromeda/')}>
                        Contattaci su Instagram
                        <span>
                            <img alt='instagram' src={Instagram} height={18}></img>&nbsp;
                        </span>
                    </Alert>
                </Container> */}

            </main>
        );
    }
}

export default Home;