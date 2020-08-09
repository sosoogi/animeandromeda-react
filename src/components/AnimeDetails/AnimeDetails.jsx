import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import globals from '../../globals/variables'
import { Button } from 'react-bootstrap';
import './AnimeDetails.scss';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';
import AnimeBanner from '../AnimeBanner/AnimeBanner';

class AnimeDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            animes: []
        }
    }

    componentDidMount() {
        console.log(this.props.location.pathname.substring(15))
        fetch(globals.API_URL + 'anime/get/' + this.props.location.pathname.substring(15))
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ animes: data });
            })
            .catch(console.error);
    }

    render() {
        return (
            <div className='View'>
                <AnimeBanner pic={this.state.animes[0]?.thumb}></AnimeBanner>
                <Container>
                    <Row>
                        <Col xs={6} md={6} lg={6}>
                            <img className='series-pic' src={this.state.animes[0]?.pic}></img>
                        </Col>
                        <Col xs={6} md={6} lg={6}>
                            <h3 className='series-title'>{this.state.animes[0]?.title}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className='series-desc'>
                                {this.state.animes[0]?.desc}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className='series-desc'>
                                {this.state.animes.length > 0 ? 'Genere: ' : ''}
                                {this.state.animes[0]?.genres.map(x=>(
                                    <span>{x + ', '}</span>
                                ))}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.state.animes.map((x, idx) => (
                                <Link key={idx} to= {
                                        {pathname: '/anime/view', state: {stream: x.url, banner: this.state.animes[0]?.thumb}}
                                    }>
                                    <Button className='button-ep' key={idx}>{'Episodio ' + (idx + 1)}</Button>
                                </Link>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AnimeDetails;
