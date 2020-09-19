import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import globals from '../../globals/variables';
import { Subject, fromEvent } from 'rxjs';
import { fromFetch } from 'rxjs/fetch'
import { debounceTime, map, switchMap, distinctUntilChanged } from 'rxjs/operators'
import { Link } from 'react-router-dom';
// import { Search } from 'react-bootstrap-icons'
import './AnimeSearchField.scss';

const AnimeSearchField = () => {
    const [query, setQuery] = useState([]);
    const search = useRef(null);

    useEffect(() => {
        let subscription = new Subject();
        subscription = fromEvent(search.current, 'keyup').pipe(
            map((event) => {
                if (event.target.value.length > 1) {
                    return event.target.value;
                }
                return '';
            }),
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(res => {
            fromFetch(`${globals.API_URL}anime/search/${res}`)
                .pipe(
                    switchMap(res => res.json()),
                )
                .subscribe(data => setQuery(data), e => console.error(e))
        });
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className='search-container'>
            <input className='search-input' type='text' ref={search} placeholder='Cerca' aria-label='Cerca'></input>
            {query.length > 0 ?
                query.map((anime, idx) => (
                    <Link key={idx} className='results-wrapper search-link' to={{ pathname: `/anime/details/${anime.redundant}` }}>
                        <div className='results'>
                            <Container>
                                <Row>
                                    <Col xs={4} md={3} lg={3}>
                                        <div>
                                            <img alt={anime.redundant} className='spacer-left' width={96} src={anime.pic}></img>
                                        </div>
                                    </Col>
                                    <Col xs={8} md={9} lg={9}>
                                        <div className='pt-4 font-weight-bold'>{anime.title}</div>
                                        <div>episodi:&nbsp;{anime.count}</div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Link>)
                ) : null}
        </div>
    );
}

export default AnimeSearchField;