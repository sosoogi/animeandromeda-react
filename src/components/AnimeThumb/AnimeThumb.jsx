import React from 'react';
import Figure from 'react-bootstrap/Figure';
import { Link } from 'react-router-dom';
import globals from '../../globals/variables';
import './AnimeThumb.scss';

const AnimeThumb = (props) => {
    return (
        <Link to={'/anime/details/' + props.series}>
            <div className='flyer-container'>
                <Figure>
                    <Figure.Image
                        width={props.xsize || (window.innerWidth < globals.MOBILE_MAX_WIDTH ? window.innerWidth : 200)}
                        height={props.ysize || 300}
                        src={props.pic || globals.INCONSISTENT_API_IMG}
                        className='flyer'
                        alt=''
                    />
                    <div className='caption'>{props.title || '-'}</div>
                </Figure>
            </div>
        </Link>
    );
}

export default AnimeThumb;
