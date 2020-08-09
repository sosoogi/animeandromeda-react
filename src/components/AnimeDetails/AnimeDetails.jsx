import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import globals from '../../globals/variables'
import { Button } from 'react-bootstrap';
import './AnimeDetails.scss';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';

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
                <div className='banner-anime'>
                    <img
                        width={window.innerWidth < globals.MOBILE_MAX_WIDTH ? window.innerWidth : window.innerWidth}
                        src={this.state.animes[0]?.thumb}>
                    </img>
                </div>
                <Container>
                    ciccio
                    <Row>
                        <Col>
                            {this.state.animes.map((x, idx) => (
                                <Link key={idx} to= {{pathname: '/anime/view', state: {stream: x.url}}}>
                                    {x.url + '\n'}
                                </Link>
                            ))}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* {animes?.map((anime, idx) => (
                            <Link to={'/anime/search/' + this.props.series} key={idx}>
                                <Button key={idx}>{}</Button>
                            </Link>
                        ))} */}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AnimeDetails;
