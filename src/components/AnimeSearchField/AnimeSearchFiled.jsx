import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import globals from '../../globals/variables'
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, filter, map, distinctUntilChanged } from 'rxjs/operators'
import './AnimeSearchField.scss';
import { Link } from 'react-router-dom';

class AnimeSearchField extends React.Component{
    constructor(props){
        super(props);
        this.state={
            json: [],
        }
        this.search = React.createRef();
        this.subscription = new Subject();
    }

    componentDidMount(){
        this.subscription = fromEvent(this.search.current, 'keyup').pipe(
            map((event) => {
                if(event.target.value === ''){
                    return '___';
                }
                return event.target.value;
            }),
            filter(x => x.length > 1),
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(res => {
            // console.log(res);
            fetch(globals.API_URL + 'anime/search/' + res)
                .then(res => res.json())
                .then(data => {
                    this.setState({ json: data });
                })
                .catch(console.log);
        });
    }

    componentWillUnmount(){
        this.subscription.unsubscribe();
    }

    render(){
        return(
            <div className='searchQuery'>
                <input className='query' type='text' ref={this.search} placeholder='Cerca'/>
                {this.state.json.length > 0 ? 
                this.state.json.map((anime)=> (
                <Link className='searchLink' to={{pathname: '/anime/details/' + anime.redundant}}>
                    <div className='searchBox'> 
                        <Row>
                            <Col xs={3} md={3} lg={3}>
                                <div>
                                    <img className= 'spacer-left' width={52} src={anime.pic}></img>
                                </div>
                            </Col>
                            <Col xs={9} md={9} lg={9}>
                                <div>{anime.title}</div>
                                <div>{anime.count}</div>
                            </Col>
                        </Row>
                    </div>
                </Link>)
                ) : null}
            </div>
        );
    }
}

export default AnimeSearchField;