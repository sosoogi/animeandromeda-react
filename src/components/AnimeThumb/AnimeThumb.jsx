import React from 'react';
import Figure from 'react-bootstrap/Figure';
import Badge from 'react-bootstrap/Badge';
import globals from '../../globals/variables';
import { Link } from 'react-router-dom';
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
                    {/* {props.ep ? <div className='badge-ep'>{props.ep}</div> : null} */}
                    {props.ep ? <Badge variant='danger' className='badge-ep'>{props.ep}</Badge> : null}
                    <div className='caption'>{props.title || '-'}</div>
                </Figure>
            </div>
        </Link>
    );
}

export default AnimeThumb;
