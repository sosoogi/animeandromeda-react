import React from 'react';
import Container from 'react-bootstrap/Container';
import { String as Sugar } from 'sugar';
import globals from '../../globals/variables';
import './AnimeBanner.scss';

const truncateIfMobile = (prop) => {
    if (window.innerWidth <= globals.MOBILE_MAX_WIDTH) {
        if (prop.length > 28) {
            return Sugar.truncate(prop, 28, '...')
        }
        return prop;
    }
    return prop;
}

const goBack = () => {
    if (window.history.length > 0) {
        window.history.back();
        return;
    }
    window.location.pathname = '/';
}

const AnimeBanner = (props) => {
    return (
        <div>
            <div className='banner' style={{ backgroundImage: `url(${props.pic})` }}>
            </div>
            <Container>
                {props.subtitle ? <h6 className='banner-subtitle'>{props.subtitle}</h6> : null}
                {props.title ? <h1 onClick={goBack} className='banner-title'>{truncateIfMobile(props.title)}</h1> : null}
                {props.text ? <h1 className='banner-text'>{truncateIfMobile(props.text)}</h1> : null}
            </Container>
        </div>
    );
}

export default AnimeBanner;