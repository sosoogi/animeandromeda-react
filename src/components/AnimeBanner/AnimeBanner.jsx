import React from 'react';
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

const AnimeBanner = (props) => {
    return (
        <header className='container-fluid p-0'>
            <div className='banner' style={{ backgroundImage: `url(${props.pic})` }} />
            <div className='container'>
                {props.subtitle ? <h6 className='banner-subtitle'>{props.subtitle}</h6> : null}
                {props.title ? <h1 className='banner-title'>{truncateIfMobile(props.title)}</h1> : null}
                {props.text ? <h1 className='banner-text'>{truncateIfMobile(props.text)}</h1> : null}
                {props.child ? <span className='child'>{{ ...props.child }}</span> : null}
            </div>
        </header >
    );
}

export default AnimeBanner;