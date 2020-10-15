import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Subject, BehaviorSubject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';
import { HeartFill } from 'react-bootstrap-icons';
import { UserContext } from '../Contexts/UserContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { convertDate, convertAiredFrom } from '../../globals/functions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import globals from '../../globals/variables'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AnimeBanner from '../AnimeBanner/AnimeBanner';
import Pagination from '../Pagination/Pagination';
import ReactGA from 'react-ga';
import cookie from 'js-cookie';
import './AnimeDetails.scss';

const AnimeDetails = (props) => {

    const [animes, setAnimes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [episodesPerPage] = useState(48);
    const [userData, setUserData] = useContext(UserContext);
    const [loved, setLoved] = useState(false);

    const series = props.location.pathname.substring(15);

    useEffect(() => {
        window.scrollTo(0, 0);
        let $animes = new Subject();

        $animes = fromFetch(`${globals.API_URL}anime/get/${series}`)
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => setAnimes(data), e => console.error(e));

        return () => $animes.unsubscribe();
    }, [series]);

    useEffect(() => {
        const loved = userData?.loved;
        const test = loved?.filter(x => x?.series === series);
        if (test?.length > 0) {
            setLoved(true)
        }
    }, [series, userData]);

    // google analytics
    ReactGA.pageview(window.location.pathname + window.location.search);
    ReactGA.event({
        category: 'Details',
        action: 'User landed on the details of ' + series
    });

    const helmetContext = {};
    const indexOfLastPost = currentPage * episodesPerPage;
    const indexOfFirstPost = indexOfLastPost - episodesPerPage;
    const currentAnimes = animes.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNum) => setCurrentPage(pageNum)
    const nextPage = () => setCurrentPage(currentPage + 1)
    const prevPage = () => setCurrentPage(currentPage - 1)

    const _episodes = animes.map(x => Number(x.ep));
    const alternateStreaming = [];
    let hasAlternate = false;

    const episodes = [];
    _episodes.forEach(ep => {
        if (ep) {
            episodes.push(ep)
        }
    })

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

    const toggleLoved = ($loved) => {
        let subscription = new BehaviorSubject({});

        if (!loved) {
            subscription = fromFetch(`${globals.AUTH_API_URL}/user/loved`, {
                method: 'POST',
                headers: {
                    'x-auth-token': cookie.get('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    loved: $loved
                })
            })
                .pipe(
                    switchMap(res => res.json())
                )
                .subscribe(
                    () => {
                        if (userData !== 'expired token') {
                            setLoved(!loved);
                            const prevState = { ...userData };
                            const nextState = { loved: prevState.loved.concat($loved) };
                            setUserData({ ...prevState, ...nextState });
                        } else {
                            window.location.href = '/login'
                        }
                    },
                );
        } else {
            deleteLoved($loved)
        }
        return () => subscription.unsubscribe();
    }

    const deleteLoved = ($loved) => {
        let subscription = new BehaviorSubject([]);

        subscription = fromFetch(`${globals.AUTH_API_URL}/user/loved`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': cookie.get('auth-token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                loved: $loved
            })
        })
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(() => {
                setLoved(false);
                const prevState = { ...userData };
                const nextState = {
                    loved: prevState.loved.filter(el => {
                        return el.series !== $loved.series
                    })
                };
                setUserData({ ...prevState, ...nextState });
            });
        return () => subscription.unsubscribe();
    }

    return (
        <div className='View'>
            <HelmetProvider context={helmetContext}>
                <Helmet>
                    <meta name='language' content='it' />
                    <meta name="description" content={
                        `Guarda tutti gli episodi di ${animes[0]?.title || animes[0]?.series} su AnimeAndromeda.
                            Sempre in alta definizione e senza pubblicità!`
                    } />
                    <title>{`${animes[0]?.title || animes[0]?.series} streaming SUB ITA - AnimeAndromeda`}</title>
                    <link rel='canonical' href='https://www.animeandromeda.net' />
                </Helmet>
            </HelmetProvider>
            <AnimeBanner pic={animes[0]?.thumb} title={animes[0]?.title}></AnimeBanner>
            <Container>
                <Row>
                    <Col>
                        {animes?.length > 0 ?
                            null :
                            <React.Fragment>
                                <Spinner animation="grow" className='loader-themed mt-5' />
                            </React.Fragment>
                        }
                    </Col>
                </Row>
            </Container>
            <div className='mt-3'></div>
            <Container
                className={animes?.length > 0 ? 'anime-container shadow rounded bg-dark-as-box mb-3 p-3 w-100' : 'hidden'}>
                <Row>
                    <Col md={3} xl={2}>
                        <img alt='' className='series-pic' src={animes[0]?.pic}></img>
                    </Col>
                    <Col md={9} xl={10}>
                        <ListGroup>
                            <ListGroup.Item className='list-group-details'>
                                <strong>Titolo: </strong>{animes[0]?.title}
                            </ListGroup.Item>
                            <ListGroup.Item className='list-group-details'>
                                <strong>Anno: </strong>{convertAiredFrom(animes[0]?.aired)}
                            </ListGroup.Item>
                            <ListGroup.Item className='list-group-details'>
                                <strong>In corso: </strong>{animes[0]?.airing ? 'Si' : 'Terminato'}
                            </ListGroup.Item>
                            <ListGroup.Item className='list-group-details'>
                                <strong>Punteggio: </strong>{(animes[0]?.score || '-') + '/10'}
                            </ListGroup.Item>
                            <ListGroup.Item className='list-group-details'>
                                <strong>Durata: </strong>{(animes[0]?.duration || '-')}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='series-desc text-justify'>
                            {animes[0]?.desc}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='text-left'>
                            {animes[0]?.genres.map((x, idx) => (
                                <React.Fragment key={idx}>
                                    <Link to={`/archivio/${x}`}>
                                        <Badge pill variant="light" className='genre-badge'>{x}</Badge>
                                        <span>{' '}</span>
                                    </Link>
                                </React.Fragment>
                            ))}
                            <div className='mt-2'></div>
                            <div className='add-to-loved'>
                                <Badge variant={loved ? 'danger' : 'secondary'} className='genre-badge'
                                    onClick={() => toggleLoved({
                                        series: animes[0].series,
                                        title: animes[0]?.title,
                                        pic: animes[0]?.pic,
                                        premiere: animes[0]?.premiere,
                                    })}>
                                    {loved ? 'Aggiunto ai preferiti ' : 'Aggiungilo ai preferiti '}
                                    <HeartFill />
                                </Badge>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className='mt-3'></div>
            <Container className={animes?.length > 0 ? 'anime-container p-3 shadow rounded' : null}>
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
                                                            banner: animes[0]?.thumb,
                                                            title: animes[0]?.title,
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
                                                            banner: animes[0]?.thumb,
                                                            title: animes[0]?.title,
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
                                            banner: animes[0]?.thumb,
                                            title: animes[0]?.title,
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
                {animes?.length > 0 ?
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
            <Container className={animes?.length > 0 ? 'anime-container p-3 shadow rounded' : null}>
                {animes?.length > 0 ?
                    <Button className='button-ep' onClick={() => props.history.goBack()}>Torna alla home</Button> : null
                }
            </Container>

            <div className='mt-3'></div>
            <Container className={animes?.length > 0 ? 'anime-container p-3 shadow rounded' : null}>
                {animes?.length > 0 ?
                    <small>Aggiunto il {convertDate(new Date(animes[0]?.updated.$date || animes[0]?.updated))} da Peocchi</small> : 'Chotto matte'
                }
            </Container>
        </div >
    );
}


export default AnimeDetails;
