import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './AnimeCarousel.scss';

class AnimeCarousel extends React.Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            ready: false,
        }
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
                    this.props.apiResponse?.map((x, idx) => (
                        <Carousel.Item key={idx}>
                            <div className='carousel-opactiy'>
                                <img
                                    className='d-block w-100 carozello'
                                    src={this.props.apiResponse[this.state.index]?.thumb}
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