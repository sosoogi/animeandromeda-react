import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AnimeBanner from '../AnimeBanner/AnimeBanner';
import ReactGA from 'react-ga';
import './AnimeView.scss';

class AnimeView extends React.Component {

    componentDidMount() {
        // google analytics
        ReactGA.pageview(window.location.pathname + window.location.search);
        ReactGA.event({
            category: 'Anime',
            action: 'User started streaming' + this.props.location.state?.title
        });
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                {this.props.location.state ? null : 'Non aprire la pagina in una nuova scheda :/'}
                <AnimeBanner title={this.props.location.state?.title} pic={this.props.location.state?.banner}></AnimeBanner>
                <Container>
                    <Row>
                        <Col>
                            <video
                                className='anime-video'
                                controls
                                controlsList='nodownload'
                                autoPlay>
                                <source src={this.props.location.state?.stream}></source>
                            </video>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AnimeView;