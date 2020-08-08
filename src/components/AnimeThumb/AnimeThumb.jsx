import React from 'react';
import Sugar from 'sugar';
import Figure from 'react-bootstrap/Figure';
import { Link } from 'react-router-dom';
import globals from '../../globals/variables';
import './AnimeThumb.scss';

class VideoThumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pic: null,
        };
    }

    componentDidMount() {
        this.setState({ pic: this.props.pic });
    }

    render() {
        return (
            <Link to={'/anime/' + this.props.series}>
                <div className='flyer-container'>
                    <Figure>
                        <Figure.Image
                            width={window.innerWidth < globals.MOBILE_MAX_WIDTH ? window.innerWidth : 240}
                            src={this.props.pic}
                            className='flyer'
                        />
                        <div className='caption'>{this.props.title}</div>
                    </Figure>
                    <div className='flyer-spacer'></div>
                </div>
            </Link>
        );
    }
}

export default VideoThumb;
