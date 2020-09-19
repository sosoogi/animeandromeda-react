import React, { useState } from 'react';
import Figure from 'react-bootstrap/Figure';
import Badge from 'react-bootstrap/Badge';
import { HeartFill } from 'react-bootstrap-icons';
import globals from '../../globals/variables';
import { Link } from 'react-router-dom';
import './AnimeThumb.scss';

const AnimeThumb = (props) => {
    const [loved, setLoved] = useState(false);

    return (
        <div className='flyer-container'>
            <Figure>
                <Link to={'/anime/details/' + props.series}>
                    <Figure.Image
                        width={props.xsize || (window.innerWidth < globals.MOBILE_MAX_WIDTH ? window.innerWidth : 200)}
                        height={props.ysize || 300}
                        src={props.pic || globals.INCONSISTENT_API_IMG}
                        className='flyer'
                        alt=''
                    />
                </Link>
                {props.ep ? <Badge variant='danger' className='badge-ep'>{props.ep}</Badge> : null}
                {props.loved ?
                    <Badge
                        variant={loved ? 'danger' : 'secondary'}
                        className={props.small ? 'badge-love' : 'badge-ep'}
                        onClick={() => setLoved(!loved)}>
                        <HeartFill color='white' />
                    </Badge>
                    : null}
                {props.premiere ? <Badge variant='primary' className='badge-premiere'>{props.premiere.split(' ')[1] || null}</Badge> : null}
                <Link to={'/anime/details/' + props.series}>
                    <div className='caption'>{props.title || '-'}</div>
                </Link>
            </Figure>
        </div>
    );
}

export default AnimeThumb;
