import React from 'react';
import { Subject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';
import { genresDomain } from '../../globals/domains';
import globals from '../../globals/variables';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import AnimeThumb from '../AnimeThumb/AnimeThumb';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './Archive.scss';

class Archive extends React.Component {
    constructor() {
        super();
        this.state = {
            animes: []
        }
        this.subscription = new Subject();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const genre = decodeURIComponent(this.props.location.pathname.substring(10));
        if (genre)
            this.subscription = fromFetch(`${globals.API_URL}anime/genre/${genre}`)
                .pipe(
                    switchMap(res => res.json())
                )
                .subscribe(data => this.setState({ animes: data }), e => console.error(e));
    }

    filterByGenre = (e) => {
        const { value } = e.target;
        this.subscription = fromFetch(`${globals.API_URL}anime/genre/${value}`)
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => this.setState({ animes: data }), e => console.error(e));
    }

    render() {
        const _genre = decodeURIComponent(this.props.location.pathname.substring(10));
        const helmetContext = {}
        return (
            <div>
                <HelmetProvider context={helmetContext}>
                    <Helmet>
                        <meta name='language' content='it' />
                        <meta name="description" content={
                            `Certe volte è dura ricordarsi istantaneamente il nome di una serie :/ , per questo ti offriamo dei comodi 
                            filtri per la ricerca`
                        } />
                        <title>Archivio Anime - ricerca filtrata - AnimeAndromeda - Anime Andromeda</title>
                        <link rel='canonical' href='https://www.animeandromeda.net' />
                    </Helmet>
                </HelmetProvider>
                <div className='mt-3'></div>
                <div className='container anime-container p-3 shadow rounded'>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='home-section-title'>{'Archivio Anime'}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Form.Group as={'div'} controlId="formGridState">
                                <Form.Control as="select" defaultValue={_genre} onChange={this.filterByGenre}>
                                    {genresDomain.map((genre, idx) => (
                                        <option key={idx}>{genre}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        {this.state.animes?.length <= 0 && this.props.location.pathname.substring(16) ?
                            <div className='col text-center'>
                                <Spinner animation='grow' className='loader-themed' />
                            </div> : null
                        }
                        {this.state.animes.map((anime, k) => (
                            <div className='col-6 col-md-3 col-lg-2 mobile-responsive-col' key={k}>
                                <AnimeThumb
                                    series={anime._id.series}
                                    pic={anime.pic}
                                    thumb={anime.thumb}
                                    title={anime.pretty}>
                                </AnimeThumb>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Archive;