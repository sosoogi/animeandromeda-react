import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AnimeBanner from '../AnimeBanner/AnimeBanner';
import './AnimeView.scss';

class AnimeView extends React.Component {

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <AnimeBanner title={this.props.location.state.title} pic={this.props.location.state.banner}></AnimeBanner>
                <Container>
                    <Row>
                        <Col>
                            <video
                                className='anime-video'
                                controls
                                controlsList='nodownload'
                                autoPlay>
                                <source src={this.props.location.state.stream}></source>
                            </video>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AnimeView;