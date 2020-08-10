import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import globals from '../../globals/variables'
import Button from 'react-bootstrap/Button';
// import Pagination from 'react-bootstrap/Pagination';
import './AnimeDetails.scss';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import AnimeBanner from '../AnimeBanner/AnimeBanner';
import Pagination from '../Pagination/Pagination';
import { Subject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

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
        this.subscription = fromFetch(globals.API_URL + 'anime/get/' + this.props.location.pathname.substring(15))
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => this.setState({ animes: data }), e => console.error(e));
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    render() {
        const { currentPage, episodesPerPage, animes } = this.state;
        const indexOfLastPost = currentPage * episodesPerPage;
        const indexOfFirstPost = indexOfLastPost - episodesPerPage;
        const currentAnimes = animes.slice(indexOfFirstPost, indexOfLastPost);
        const paginate = pageNum => this.setState({ currentPage: pageNum });
        const nextPage = () => this.setState({ currentPage: currentPage + 1 });
        const prevPage = () => this.setState({ currentPage: currentPage - 1 });

        return (
            <div className='View'>
                <AnimeBanner pic={this.state.animes[0]?.thumb} title={this.state.animes[0]?.title}></AnimeBanner>
                <Container>
                    <Row>
                        <Col>
                            {this.state.animes?.length > 0 ?
                                null :
                                <div>
                                    <br></br>
                                    <Spinner animation="grow" variant="light" />
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
                <div className='mt-3'></div>
                <Container
                    className={this.state.animes?.length > 0 ? 'anime-container shadow rounded bg-dark-as-box mb-3 p-3 w-100' : null}>
                    <Row>
                        <Col xs={6} md={6} lg={6}>
                            <img alt={this.state.animes[0]?.series} className='series-pic' src={this.state.animes[0]?.pic}></img>
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
                    <Row>
                        {currentAnimes.map((x, idx) => (
                            <Col xs={6} md={6} lg={6} key={idx}>
                                <Link key={idx} to={
                                    {
                                        pathname: '/anime/view', state: {
                                            stream: x.url,
                                            banner: this.state.animes[0]?.thumb,
                                            title: this.state.animes[0]?.title
                                        }
                                    }
                                }>
                                    <Button className='button-ep' key={idx}>
                                        {'Episodio ' + (x.ep.toLowerCase().split('ep').slice(-1).pop().split('_')[1])}
                                    </Button>
                                </Link>
                            </Col>
                        ))}
                    </Row>
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
            </div >
        );
    }
}

export default AnimeDetails;
