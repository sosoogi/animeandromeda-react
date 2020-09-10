import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AnimeBanner from '../AnimeBanner/AnimeBanner';
import ReactGA from 'react-ga';
import globals from '../../globals/variables';
import { createMD5 } from '../../globals/functions';
import Button from 'react-bootstrap/Button';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch';
import Alert from 'react-bootstrap/Alert';
import Paypal from '../../assets/paypal.svg';
import './AnimeView.scss';

class AnimeView extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.state = {
            tick: 0
        }
        this.reportLinkSub = new Subject();
        this.videoRef = React.createRef();
        this.report_btn = React.createRef();
        this.updateTick = this.updateTick.bind(this);
        this.updateTickOnPlay = this.updateTickOnPlay.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        // google analytics
        ReactGA.pageview(window.location.pathname + window.location.search);
        ReactGA.event({
            category: 'Anime',
            action: 'User started streaming ' + this.props.location.state?.title
        });

        this.checkSeries(this.props.location.state?.stream);
    }

    checkSeries(url) {
        const hashedUrl = createMD5(url);
        if (localStorage.getItem('video-' + hashedUrl)) {
            const lsdata = localStorage.getItem('video-' + hashedUrl).split(';');
            const series = lsdata[0]
            const tick = Number(lsdata[1]);

            if (series === hashedUrl) {
                this.setState({ tick: tick });
            }
        } else {
            localStorage.setItem(
                'video-' + hashedUrl, hashedUrl + ';' + this.state.tick);
        }
    }

    updateTick() {
        const hashedUrl = createMD5(this.props.location.state?.stream);
        localStorage.setItem(
            'video-' + hashedUrl,
            hashedUrl
            + ';' +
            this.videoRef.current.currentTime);
        this.setState({ tick: Number(this.videoRef.current.currentTime) });
    }

    updateTickOnPlay() {
        const hashedUrl = createMD5(this.props.location.state?.stream);
        const updateTick = () => {
            this.setState({ tick: this.videoRef.current?.currentTime });
            localStorage.setItem('video-' + hashedUrl, hashedUrl + ';' + this.state.tick);
        }
        updateTick();
        const interval = setInterval(() => updateTick(), 20000);
        return () => {
            clearInterval(interval);
        }
    }

    goBack() {
        this.props.history.goBack();
    }

    reportLink() {
        this.reportLinkSub = fromFetch(globals.API_URL + 'anime/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                series: this.props.location.state?.title,
                episode: this.props.location.state?.ep
            })
        })
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(data => {
                this.setState({ reported: data });
            }, e => console.error(e));

        this.report_btn.current.setAttribute("disabled", "disabled");
    }

    componentWillUnmount() {
        this.reportLinkSub.unsubscribe();
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
                            <Button className='goBack-btn' onClick={this.goBack}>
                                Torna al menu degli episodi
                            </Button>
                        </Col>
                    </Row>
                </Container>
                <Container className='anime-container shadow rounded bg-dark-as-box mb-3 p-3 w-100'>
                    <Row>
                        <Col>
                            <Button className='report-btn' ref={this.report_btn} onClick={() => this.reportLink()}>
                                Segnala streaming non funzionante
                            </Button>
                        </Col>
                    </Row>
                </Container>
                <Container className='p-0'>
                    <a href='https://paypal.me/pools/c/8somkJXivr'>
                        <Alert className='pp-h'>
                            <span>
                                <img alt='telegram' src={Paypal} height={16}></img>&nbsp;
                            </span>
                            Aiuta lo sviluppo con una piccola donazione
                        </Alert>
                    </a>
                </Container>
            </div >
        );
    }
}

export default AnimeView;