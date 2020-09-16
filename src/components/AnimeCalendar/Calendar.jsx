import React from 'react';
import Table from 'react-bootstrap/Table';
import { Subject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';
import { Link } from 'react-router-dom';
import globals from '../../globals/variables'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './Calendar.scss';


class Calendar extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            calendar: {},
        }
        this.subscription = new Subject();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.subscription = fromFetch(globals.API_URL + 'anime/calendar')
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => this.setState({ calendar: data }), e => console.error(e));
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        const helmetContext = {}
        return (
            <div>
                <HelmetProvider context={helmetContext}>
                    <Helmet>
                        <meta name='language' content='it' />
                        <meta name="description" content={
                            `Controlla le prossime uscite delle tue serie preferite su AnimeAndromeda.
                            Sempre in alta definizione e senza pubblicità!`
                        } />
                        <title>Calendario Uscite - AnimeAndromeda - Anime Andromeda</title>
                        <link rel='canonical' href='https://www.animeandromeda.net' />
                    </Helmet>
                </HelmetProvider>
                <div className='mt-3'></div>
                <div className='container home-anime-container p-3 shadow rounded'>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='home-section-title'>{'Calendario Uscite'}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Table responsive borderless className='anime-calendar'>
                                <tbody>
                                    <tr>
                                        <th>Lunedì</th>
                                        {this.state.calendar?.mon?.map((day, idx) => (
                                            <td key={idx}>
                                                <Link className='link-calendar' to={`/anime/details/${day.series}`}>
                                                    <p>{day.title}</p>
                                                </Link>
                                                <p>{day.hours.slice(0, -3)}*</p>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <th>Martedì</th>
                                        {this.state.calendar?.tue?.map((day, idx) => (
                                            <td key={idx}>
                                                <Link className='link-calendar' to={`/anime/details/${day.series}`}>
                                                    <p>{day.title}</p>
                                                </Link>
                                                <p>{day.hours.slice(0, -3)}*</p>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <th>Mercoledì</th>
                                        {this.state.calendar?.wed?.map((day, idx) => (
                                            <td key={idx}>
                                                <Link className='link-calendar' to={`/anime/details/${day.series}`}>
                                                    <p>{day.title}</p>
                                                </Link>
                                                <p>{day.hours.slice(0, -3)}*</p>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <th>Giovedì</th>
                                        {this.state.calendar?.thu?.map((day, idx) => (
                                            <td key={idx}>
                                                <Link className='link-calendar' to={`/anime/details/${day.series}`}>
                                                    <p>{day.title}</p>
                                                </Link>
                                                <p>{day.hours.slice(0, -3)}*</p>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <th>Venerdì</th>
                                        {this.state.calendar?.fri?.map((day, idx) => (
                                            <td key={idx}>
                                                <Link className='link-calendar' to={`/anime/details/${day.series}`}>
                                                    <p>{day.title}</p>
                                                </Link>
                                                <p>{day.hours.slice(0, -3)}*</p>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <th>Sabato</th>
                                        {this.state.calendar?.sat?.map((day, idx) => (
                                            <td key={idx}>
                                                <Link className='link-calendar' to={`/anime/details/${day.series}`}>
                                                    <p>{day.title}</p>
                                                </Link>
                                                <p>{day.hours.slice(0, -3)}*</p>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <th>Domenica</th>
                                        {this.state.calendar?.sun?.map((day, idx) => (
                                            <td key={idx}>
                                                <Link className='link-calendar' to={`/anime/details/${day.series}`}>
                                                    <p>{day.title}</p>
                                                </Link>
                                                <p>{day.hours.slice(0, -3)}*</p>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            * Gli orari sono molto indicativi, tieni conto del tempo della traduzione da parte del fansub
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calendar;