import React from 'react';
import Container from 'react-bootstrap/Container';
import { String as Sugar } from 'sugar';
import globals from '../../globals/variables';
import './AnimeBanner.scss';

class AnimeBanner extends React.Component {

    truncateIfMobile(prop) {
        if (window.innerWidth <= globals.MOBILE_MAX_WIDTH) {
            if (prop.length > 28) {
                return Sugar.truncate(prop, 28, '...')
            }
            return prop;
        }
        return prop;
    }

    goBack() {
        window.history.back();
    }

    render() {
        return (
            <div>
                <div className='banner' style={{ backgroundImage: `url(${this.props.pic})` }}>
                </div>
                <Container>
                    {this.props.title ? <h1 onClick={this.goBack} className='banner-title'>{this.truncateIfMobile(this.props.title)}</h1> : null}
                    {this.props.text ? <h1 className='banner-text'>{this.truncateIfMobile(this.props.text)}</h1> : null}
                </Container>
            </div>
        );
    }

}

export default AnimeBanner;