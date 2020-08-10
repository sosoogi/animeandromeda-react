import React from 'react';
import Home from './components/Home/Home';
import globals from './globals/variables';
import { Number as Sugar } from 'sugar';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import AnimeDetails from './components/AnimeDetails/AnimeDetails';
import AnimeView from './components/AnimeView/AnimeView';
import TelegramIco from './assets/telegram.svg';
import { Subject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latest: [],
      airing: [],
      random: []
    };
    this.latestSub = new Subject();
    this.aringSub = new Subject();
    this.randomSub = new Subject();
  }

  componentDidMount() {
    this.latestSub = fromFetch(globals.API_URL + 'anime/latest/')
      .pipe(
        switchMap(res => res.json())
      )
      .subscribe(data => this.setState({ latest: data }), e => console.error(e));

    this.aringSub = fromFetch(globals.API_URL + 'anime/latest/airing')
      .pipe(
        switchMap(res => res.json())
      )
      .subscribe(data => this.setState({ airing: data }), e => console.error(e));

    this.randomSub = fromFetch(globals.API_URL + 'anime/random/')
      .pipe(
        switchMap(res => res.json())
      )
      .subscribe(data => this.setState({ random: data }), e => console.error(e));
  }

  componentWillUnmount() {
    this.latestSub.unsubscribe();
    this.randomSub.unsubscribe();
    this.aringSub.unsubscribe();
  }

  render() {
    return (
      <div>
        <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
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
        <div className='mt-3'></div>
        <footer className={window.innerWidth < globals.MOBILE_MAX_WIDTH ? 'footer-mobile' : 'footer'}>
          <div className='container'>
            <span className='text-muted'>AnimeAndromeda |</span>
            <span className='text-muted'>&nbsp;per qualsiasi informazione o richiesta scrivere al gruppo Telegram</span>
            <a href='https://t.me/AnimeAndromeda'>
              <span className='text-muted'>&nbsp;
                <img alt='telegram' src={TelegramIco} height={24}></img>
              </span>
            </a>
          </div>
        </footer>
      </div >
    );
  }
}

export default App;