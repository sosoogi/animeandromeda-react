import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import globals from '../../globals/variables';
import './AnimeView.scss';

class AnimeView extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props)
    }

    render(){
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <video 
                            controls 
                            autoPlay 
                            width={window.innerWidth <= globals.MOBILE_MAX_WIDTH ? window.innerWidth : 720}>
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
