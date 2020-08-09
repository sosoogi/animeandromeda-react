import React from 'react';
import Home from './components/Home/Home';
import globals from './globals/variables';
import { Number as Sugar } from 'sugar';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import AnimeDetails from './components/AnimeDetails/AnimeDetails';
import AnimeView from './components/AnimeView/AnimeView';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latest: [],
      airing: [],
      random: []
    };
  }

  componentDidMount() {
    fetch(globals.API_URL + 'anime/latest/')
      .then(res => res.json())
      .then(data => {
        this.setState({ latest: data });
      })
      .catch(console.error);

    fetch(globals.API_URL + 'anime/latest/airing')
      .then(res => res.json())
      .then(data => {
        this.setState({ airing: data });
      })
      .catch(console.error);

    fetch(globals.API_URL + 'anime/random/')
      .then(res => res.json())
      .then(data => {
        this.setState({ random: data });
      })
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <div className='banner'></div>
        <BrowserRouter>
          <div className='App'>
            <Switch>
              <Route exact path='/' render={props =>
                <Home {...props} latest={this.state.latest} airing={this.state.airing} random={this.state.random} />}
              />
              <Route exact path='/anime/details/:anime' component={AnimeDetails} key={Sugar.random(255)}></Route>
              <Route exact path='/anime/view' render={(props) => <AnimeView {...props}></AnimeView>} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
