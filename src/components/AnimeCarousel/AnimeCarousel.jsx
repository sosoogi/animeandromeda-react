import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './AnimeCarousel.scss';

const AnimeCarousel = (props) => {
    const [index, setIndex] = useState(0);
    const [ready, setReady] = useState(false);

    const deferImageLoading = (index) => {
        setIndex(index)
        setReady(!ready)
    }

    const handleImageLoaded = () => {
        setReady(true)
    }

    return (
        <Carousel
            onSlide={(activeIndex) => deferImageLoading(activeIndex)}
            slide={true}
            fade={true}
            controls={ready}
            indicators={ready}
            interval={ready ? 5000 : null}
        >
            {
                props.apiResponse?.map((x, idx) => (
                    <Carousel.Item key={idx}>
                        <div className='carousel-opactiy'>
                            <img
                                className='d-block w-100 carozello'
                                src={props.apiResponse[index]?.thumb}
                                alt={x._id.series}
                                onLoad={() => handleImageLoaded()}
                            />
                            <Link to={'/anime/details/' + x._id.series}>
                                <Carousel.Caption className='carousel-text'>
                                    <h3>{x.pretty}</h3>
                                    <p>{'Episodio ' + x.count}</p>
                                </Carousel.Caption>
                            </Link>
                        </div>
                    </Carousel.Item>)
                )
            }
        </Carousel >
    );

}

export default AnimeCarousel;