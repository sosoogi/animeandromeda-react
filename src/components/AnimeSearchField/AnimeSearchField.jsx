import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import globals from '../../globals/variables'
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators'
import './AnimeSearchField.scss';
import { Link } from 'react-router-dom';

class AnimeSearchField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            json: [],
        }
        this.search = React.createRef();
        this.subscription = new Subject();
    }

    componentDidMount() {
        this.subscription = fromEvent(this.search.current, 'keyup').pipe(
            map((event) => {
                return event.target.value;
            }),
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(res => {
            // console.log(res);
            fetch(globals.API_URL + 'anime/search/' + res)
                .then(res => res.json())
                .then(data => {
                    this.setState({ json: data });
                })
                .catch(console.log);
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <div className='search-container'>
                <input className='search-input' type='text' ref={this.search} placeholder='Cerca' />
                {this.state.json.length > 0 ?
                    this.state.json.map((anime, idx) => (
                        <Link key={idx} className='results-wrapper' to={{ pathname: '/anime/details/' + anime.redundant }}>
                            <div className='results'>
                                <Row>
                                    <Col xs={3} md={3} lg={3}>
                                        <div>
                                            <img alt={anime.redundant} className='spacer-left' width={96} src={anime.pic}></img>
                                        </div>
                                    </Col>
                                    <Col xs={9} md={9} lg={9}>
                                        <div className='pt-4 font-weight-bold'>{anime.title}</div>
                                        <div>episodi:&nbsp;{anime.count}</div>
                                    </Col>
                                </Row>
                            </div>
                        </Link>)
                    ) : null}
            </div>
        );
    }
}

export default AnimeSearchField;