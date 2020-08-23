import React from 'react';
import Figure from 'react-bootstrap/Figure';
import { Link } from 'react-router-dom';
import globals from '../../globals/variables';
import './AnimeThumb.scss';

class AnimeThumb extends React.PureComponent {

    render() {
        return (
            <Link to={'/anime/details/' + this.props.series}>
                <div className='flyer-container'>
                    <Figure>
                        <Figure.Image
                            width={window.innerWidth < globals.MOBILE_MAX_WIDTH ? window.innerWidth : 240}
                            height={300}
                            src={this.props.pic || globals.INCONSISTENT_API_IMG}
                            className='flyer'
                            alt=''
                        />
                        <div className='caption'>{this.props.title || this.props.series.replace(/([a-z])([A-Z0-9])/g, '$1 $2')}</div>
                    </Figure>
                    <div className='flyer-spacer'></div>
                </div>
            </Link>
        );
    }
}

export default AnimeThumb;
