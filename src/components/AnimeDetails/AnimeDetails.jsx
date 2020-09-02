import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import globals from '../../globals/variables'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import AnimeBanner from '../AnimeBanner/AnimeBanner';
import Pagination from '../Pagination/Pagination';
import { Subject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga';
import './AnimeDetails.scss';

class AnimeDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            animes: [],
            currentPage: 1,
            episodesPerPage: 50,
        }
        this.subscription = new Subject();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const series = this.props.location.pathname.substring(15);
        this.subscription = fromFetch(globals.API_URL + 'anime/get/' + series)
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => this.setState({ animes: data }), e => console.error(e));

        // google analytics
        ReactGA.pageview(window.location.pathname + window.location.search);
        ReactGA.event({
            category: 'Details',
            action: 'User landed on the details of ' + series
        });
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.history.goBack();
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        const helmetContext = {};
        const { currentPage, episodesPerPage, animes } = this.state;
        const indexOfLastPost = currentPage * episodesPerPage;
        const indexOfFirstPost = indexOfLastPost - episodesPerPage;
        const currentAnimes = animes.slice(indexOfFirstPost, indexOfLastPost);
        const paginate = pageNum => this.setState({ currentPage: pageNum });
        const nextPage = () => this.setState({ currentPage: currentPage + 1 });
        const prevPage = () => this.setState({ currentPage: currentPage - 1 });
        const alternateStreaming = [];

        const episodes = animes.map(x => x.ep);
        let hasAlternate = false;

        if ((new Set(episodes)).size !== episodes.length) {
            hasAlternate = true;
        }

        if (hasAlternate) {
            animes.forEach((x, idx) => {
                if (idx % 2 !== 0) {
                    alternateStreaming.push(x)
                }
            });
            for (let i = 0; i < currentAnimes.length; i++) {
                currentAnimes.splice(i + 1, 1);
            }
        }

        return (
            <div className='View'>
                <HelmetProvider context={helmetContext}>
                    <Helmet>
                        <meta name='language' content='it' />
                        <meta name="description" content={'Guarda ' + this.state.animes[0]?.title + ' su AnimeAndromeda'} />
                        <title>{'AnimeAndromeda - ' + this.state.animes[0]?.title}</title>
                        <link rel='canonical' href='https://www.animeandromeda.net' />
                    </Helmet>
                </HelmetProvider>
                <AnimeBanner pic={this.state.animes[0]?.thumb} title={this.state.animes[0]?.title}></AnimeBanner>
                <Container>
                    <Row>
                        <Col>
                            {this.state.animes?.length > 0 ?
                                null :
                                <div>
                                    <br></br>
                                    <Spinner animation="grow" className='loader-themed' />
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
                <div className='mt-3'></div>
                <Container
                    className={this.state.animes?.length > 0 ? 'anime-container shadow rounded bg-dark-as-box mb-3 p-3 w-100' : null}>
                    <Row>
                        <Col xs={6} md={4} lg={3}>
                            <img alt='' className='series-pic' src={this.state.animes[0]?.pic}></img>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className='series-desc'>
                                {this.state.animes[0]?.desc}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className='series-desc'>
                                {this.state.animes.length > 0 ? 'Genere: ' : ''}
                                {this.state.animes[0]?.genres.map((x, idx) => (
                                    <span key={idx}>{x + ', '}</span>
                                ))}
                            </p>
                        </Col>
                    </Row>
                </Container>
                <div className='mt-3'></div>
                <Container className={this.state.animes?.length > 0 ? 'anime-container p-3 shadow rounded' : null}>
                    {alternateStreaming?.length > 0 ?
                        <Row>
                            <Col>
                                <Tabs variant='pills' defaultActiveKey='default' className='streaming-tabs'>
                                    <Tab eventKey='default' title='Streaming 1'>
                                        <div className='spacer-s'></div>
                                        <Row>
                                            {currentAnimes.map((x, idx) => (
                                                <Col xs={6} md={4} lg={2} key={idx}>
                                                    <Link key={idx} to={
                                                        {
                                                            pathname: '/anime/view', state: {
                                                                stream: x.url,
                                                                banner: this.state.animes[0]?.thumb,
                                                                title: this.state.animes[0]?.title,
                                                                ep: 'Episodio ' + x.ep
                                                            }
                                                        }
                                                    }>
                                                        <Button className='button-ep' key={idx}>
                                                            {'Episodio ' + x.ep}
                                                        </Button>
                                                    </Link>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Tab>
                                    <Tab eventKey='alternate' title='Streaming 2' className='tabs-streaming'>
                                        <div className='spacer-s'></div>
                                        <Row>
                                            {alternateStreaming.map((x, idx) => (
                                                <Col xs={6} md={4} lg={2} key={idx}>
                                                    <Link key={idx} to={
                                                        {
                                                            pathname: '/anime/view', state: {
                                                                stream: x.url,
                                                                banner: this.state.animes[0]?.thumb,
                                                                title: this.state.animes[0]?.title,
                                                                ep: 'Episodio ' + x.ep
                                                            }
                                                        }
                                                    }>
                                                        <Button className='button-ep' key={idx}>
                                                            {'Episodio ' + x.ep}
                                                        </Button>
                                                    </Link>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row> :

                        <Row>
                            {currentAnimes.map((x, idx) => (
                                <Col xs={6} md={4} lg={2} key={idx}>
                                    <Link key={idx} to={
                                        {
                                            pathname: '/anime/view', state: {
                                                stream: x.url,
                                                banner: this.state.animes[0]?.thumb,
                                                title: this.state.animes[0]?.title,
                                                ep: 'Episodio ' + x.ep
                                            }
                                        }
                                    }>
                                        <Button className='button-ep' key={idx}>
                                            {'Episodio ' + x.ep}
                                        </Button>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    }
                    <div className='mt-3'></div>
                    {this.state.animes?.length > 0 ?
                        <Row>
                            <Col>
                                <Pagination
                                    episodesPerPage={episodesPerPage}
                                    totalEpisodes={animes.length}
                                    paginate={paginate}
                                    nextPage={nextPage}
                                    prevPage={prevPage}
                                    currentPage={Math.ceil(animes.indexOf(currentAnimes[0]) / episodesPerPage) + 1}
                                />
                            </Col>
                        </Row>
                        : null}
                </Container>
                <div className='mt-3'></div>
                <Container className={this.state.animes?.length > 0 ? 'anime-container p-3 shadow rounded' : null}>
                    {this.state.animes?.length > 0 ?
                        <Button className='button-ep' onClick={this.goBack}>Torna alla home</Button> : null
                    }
                </Container>
            </div >
        );
    }
}

export default AnimeDetails;
