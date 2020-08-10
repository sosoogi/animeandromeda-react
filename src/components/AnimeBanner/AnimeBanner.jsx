import React from 'react';
import Container from 'react-bootstrap/Container';
import './AnimeBanner.scss';

class AnimeBanner extends React.Component {

    render() {
        return (
            <div>
                <div className='banner' style={{ backgroundImage: `url(${this.props.pic})` }}>
                </div>
                <Container>
                    {this.props.text ? <h1 className='banner-text'>{this.props.text}</h1> : null}
                    {this.props.title ? <h1 className='banner-title'>{this.props.title}</h1> : null}
                </Container>
            </div>
        );
    }

}

export default AnimeBanner;