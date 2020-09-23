import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Subject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';
import globals from '../../globals/variables';
import AnimeThumb from '../AnimeThumb/AnimeThumb';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const TopAnime = () => {
    const [topAnime, setTopAnime] = useState([]);
    const helmetContext = {}

    useEffect(() => {
        window.scrollTo(0, 0);
        let subscription = new Subject();
        subscription = fromFetch(`${globals.API_URL}anime/top`)
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => setTopAnime(data), e => console.error(e));
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div>
            <HelmetProvider context={helmetContext}>
                <Helmet>
                    <meta name='language' content='it' />
                    <meta name="description" content={
                        `I migliori anime di sempre.
                            Sempre in alta definizione e senza pubblicità!`
                    } />
                    <title>Top Anime - AnimeAndromeda - Anime Andromeda</title>
                    <link rel='canonical' href='https://www.animeandromeda.net' />
                </Helmet>
            </HelmetProvider>
            <div className='mt-3'></div>
            <div className='container home-anime-container p-3 shadow rounded'>
                <div className='row'>
                    <div className='col'>
                        <h3 className='home-section-title'>{'Top Anime'}</h3>
                    </div>
                </div>
                {topAnime?.length > 0 ?
                    <div className='row'>
                        {
                            topAnime.map((x, idx) => (
                                <div className='col-6 col-md-3 col-lg-2 mobile-responsive-col' key={x._id.series}>
                                    {`${idx + 1}°`}
                                    <AnimeThumb series={x._id.series} pic={x.pic} title={x.title} premiere={x.premiere} loved />
                                </div>
                            ))

                        }
                    </div>
                    :
                    <React.Fragment>
                        <Spinner animation="grow" className='loader-themed mt-5' />
                        <div className='mb-5'></div>
                    </React.Fragment>
                }
            </div>
        </div>
    );
}


export default TopAnime;