import React from 'react';
import { String as Sugar } from 'sugar';
import Figure from 'react-bootstrap/Figure';
import { Link } from 'react-router-dom';
import globals from '../../globals/variables';
import './AnimeThumb.scss';

class AnimeThumb extends React.Component {

    render() {
        return (
            <Link to={'/anime/details/' + this.props.series}>
                <div className='flyer-container'>
                    <Figure>
                        <Figure.Image
                            width={window.innerWidth < globals.MOBILE_MAX_WIDTH ? window.innerWidth : 240}
                            src={this.props.pic}
                            className='flyer'
                        />
                        <div className='caption'>{this.props.title ? Sugar.capitalize(this.props.title) : this.props.title}</div>
                    </Figure>
                    <div className='flyer-spacer'></div>
                </div>
            </Link>
        );
    }
}

export default AnimeThumb;
