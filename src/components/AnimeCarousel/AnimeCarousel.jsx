import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import globals from '../../globals/variables';
import { Subject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';
import { Link } from 'react-router-dom';
import './AnimeCarousel.scss';

class AnimeCarousel extends React.Component {
    constructor() {
        super();
        this.state = {
            json: [],
            index: 0,
            ready: false,
        }
        this.subscription = new Subject();
    }

    componentDidMount() {
        this.subscription = fromFetch(globals.API_URL + 'anime/latest/airing')
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => this.setState({ json: data }), e => console.error(e));
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    deferImageLoading = (index) => {
        this.setState(state => ({ ready: !state.ready }));
        this.setState({ index: index });
    }

    handleImageLoaded = () => {
        this.setState({ ready: true });
    }

    render() {
        return (
            <Carousel
                onSlide={(activeIndex) => this.deferImageLoading(activeIndex)}
                slide={true}
                fade={true}
                controls={this.state.ready}
                indicators={this.state.ready}
                interval={this.state.ready ? 5000 : null}
            >
                {
                    this.state.json?.map((x, idx) => (
                        <Carousel.Item key={idx}>
                            <div className='carousel-opactiy'>
                                <img
                                    className='d-block w-100 carozello'
                                    src={this.state.json[this.state.index]?.thumb}
                                    alt={x._id.series}
                                    onLoad={this.handleImageLoaded}
                                />
                                <Link to={'/anime/details/' + x._id.series}>
                                    <Carousel.Caption className='carousel-text'>
                                        <h3>{x.pretty}</h3>
                                        <p>{'Episodio ' + x.count}</p>
                                    </Carousel.Caption>
                                </Link>
                            </div>
                        </Carousel.Item>))
                }
            </Carousel >
        );
    }
}

export default AnimeCarousel;