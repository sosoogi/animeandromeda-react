import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AnimeBanner from '../AnimeBanner/AnimeBanner';
import AdBlockDetect from 'react-ad-block-detect';
import ReactGA from 'react-ga';
// import AdSense from 'react-adsense';
import globals from '../../globals/variables';
import crypto from 'crypto';
import './AnimeView.scss';
import { Button } from 'react-bootstrap';

class AnimeView extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.state = {
            tick: 0
        }
        this.videoRef = React.createRef();
        this.updateTick = this.updateTick.bind(this);
        this.updateTickOnPlay = this.updateTickOnPlay.bind(this);
    }

    componentDidMount() {
        // google analytics
        ReactGA.pageview(window.location.pathname + window.location.search);
        ReactGA.event({
            category: 'Anime',
            action: 'User started streaming ' + this.props.location.state?.title
        });

        this.checkSeries(this.props.location.state?.stream);
    }

    checkSeries(url) {
        const hashedUrl = this.createMD5(url);
        if (localStorage.getItem('video-' + hashedUrl)) {
            const lsdata = localStorage.getItem('video-' + hashedUrl).split(';');
            const series = lsdata[0]
            const tick = Number(lsdata[1]);

            if (series === hashedUrl) {
                this.setState({ tick: tick });
            }
        } else {
            localStorage.setItem(
                'video-' + hashedUrl,
                hashedUrl
                + ';' +
                this.state.tick);
        }
    }

    updateTick() {
        const hashedUrl = this.createMD5(this.props.location.state?.stream);
        localStorage.setItem(
            'video-' + hashedUrl,
            hashedUrl
            + ';' +
            this.videoRef.current.currentTime);
        this.setState({ tick: Number(this.videoRef.current.currentTime) });
        console.log(localStorage.getItem('video-' + hashedUrl))
    }

    updateTickOnPlay() {
        const hashedUrl = this.createMD5(this.props.location.state?.stream);
        const updateTick = () => {
            this.setState({ tick: this.videoRef.current?.currentTime });
            localStorage.setItem(
                'video-' + hashedUrl,
                hashedUrl
                + ';' +
                this.state.tick);
        }
        updateTick();
        const interval = setInterval(() => updateTick(), 15000);
        return () => {
            clearInterval(interval);
        }
    }

    createMD5(data) {
        const salt = crypto
            .createHmac('md5', data)
            .update('per favore')
            .digest('hex')
        return salt;
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                {this.props.location.state ? null : 'Non aprire la pagina in una nuova scheda :/'}
                <AnimeBanner
                    title={this.props.location.state?.title}
                    subtitle={this.props.location.state?.ep}
                    pic={this.props.location.state?.banner}>
                </AnimeBanner>
                <div className='mt-3'></div>
                <Container className='anime-container shadow rounded bg-dark-as-box w-100'>
                    <Row>
                        <video
                            className='anime-video'
                            controls
                            controlsList='nodownload'
                            autoPlay
                            onSeeked={this.updateTick}
                            onPause={this.updateTick}
                            onPlay={this.updateTickOnPlay}
                            ref={this.videoRef}
                        >
                            <source src={this.props.location.state?.stream + '#t=' + this.state.tick}></source>
                        </video>
                    </Row>
                </Container>
                <div className='mt-3'></div>
                <Container className='anime-container shadow rounded bg-dark-as-box mb-3 p-3 w-100'>
                    <Row>
                        <Col>
                            <AdBlockDetect>
                                <div className='blocked' style={{ backgroundImage: `url(${globals.BLOCKED_ADS_IMG})` }} />
                            </AdBlockDetect>
                            {/* <AdSense.Google
                                client='ca-pub-6114628226777879'
                                slot='7980124212'
                                style={{ display: 'block' }}
                                layout='in-article'
                                format='fluid'
                            /> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='spacer'></div>
                            <Button className='goBack-btn' onClick={this.goBack}>Torna al menu degli episodi</Button>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

export default AnimeView;