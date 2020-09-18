import React, { useState, useEffect } from 'react';
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

const Archive = (props) => {
    const [animes, setAnimes] = useState([]);
    let subscription = new Subject();

    const helmetContext = {}
    const genre = decodeURIComponent(props.location.pathname.substring(10));

    useEffect(() => {
        window.scrollTo(0, 0);
        if (genre)
            subscription = fromFetch(`${globals.API_URL}anime/genre/${genre}`)
                .pipe(
                    switchMap(res => res.json())
                )
                .subscribe(data => setAnimes(data), e => console.error(e));
        return () => subscription.unsubscribe();
    }, [])

    const filterByGenre = (e) => {
        const { value } = e.target;
        subscription = fromFetch(`${globals.API_URL}anime/genre/${value}`)
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => setAnimes(data), e => console.error(e));
        return () => subscription.unsubscribe();
    }

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
                            <Form.Control as="select" defaultValue={genre} onChange={filterByGenre}>
                                {genresDomain.map((genre, idx) => (
                                    <option key={idx}>{genre}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                </div>
                <div className='row'>
                    {animes?.length <= 0 && props.location.pathname.substring(16) ?
                        <div className='col text-center'>
                            <Spinner animation='grow' className='loader-themed' />
                        </div> : null
                    }
                    {animes?.map((anime, k) => (
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


export default Archive;