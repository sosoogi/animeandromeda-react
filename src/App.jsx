import React, { Suspense } from 'react';
import { shrinkLocalStorage } from './globals/functions';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import TelegramIco from './assets/telegram.svg';
import ReactGA from 'react-ga';
import { getCLS, getFID, getLCP } from 'web-vitals';
import { WebpMachine } from "webp-hero"
import Home from './components/Home/Home';
import './App.scss';

const AnimeDetails = React.lazy(() => import('./components/AnimeDetails/AnimeDetails'));
const AnimeView = React.lazy(() => import('./components/AnimeView/AnimeView'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: localStorage.getItem('theme') || 'dark'
    };

    this.changeTheme = this.changeTheme.bind(this);
  }

  componentDidMount() {
    // prevent white bar in dark theme
    this.state.theme === 'dark' ? document.body.style.backgroundColor = '#0A1621' : document.body.style.backgroundColor = '#eaf4fd'
    // google analytics
    ReactGA.initialize('UA-173488988-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    ReactGA.event({
      category: 'App',
      action: 'User landed on the site'
    });

    getLCP(this.sendToGoogleAnalytics);
    getCLS(this.sendToGoogleAnalytics);
    getFID(this.sendToGoogleAnalytics);

    // webp polyfill
    const webpMachine = new WebpMachine();
    webpMachine.polyfillDocument();
    shrinkLocalStorage();
  }

  componentDidUpdate() {
    // actually change the body
    this.state.theme === 'dark' ? document.body.style.backgroundColor = '#0A1621' : document.body.style.backgroundColor = '#eaf4fd'
  }

  changeTheme() {
    if (this.state.theme === 'dark') {
      this.setState({ theme: 'light' });
      localStorage.setItem('theme', 'light');
    } else {
      this.setState({ theme: 'dark' });
      localStorage.setItem('theme', 'dark');
    }
  }

  lazyLoadCompoment(C) {
    return (props) => (
      <Suspense fallback={<><br></br><div>Caricamento...</div></>}>
        <C {...props} />
      </Suspense>
    );
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  navigateHome() {
    window.location.pathname = '/';
  }

  async sendToGoogleAnalytics({ name, delta, id }) {
    ReactGA.event('send', 'event', {
      category: 'Web Vitals',
      action: name,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      label: id,
      nonInteraction: true,
    });
  }

  render() {
    const helmetContext = {};
    return (
      <div className={'theme ' + (this.state.theme === 'dark' ? 'theme--dark' : 'theme--light')}>
        <HelmetProvider context={helmetContext}>
          <Helmet>
            <meta name='language' content='it' />
            <meta name="description" content={'Archivio Anime communitiy driven ottimizzato per l\'uso mobile.' +
              'Aggiungi l\'applicazione alla schermata home per averla sempre a portata di mano!'} />
            <title>{'AnimeAndromeda - Anime Andromeda - Streaming Anime SUB ITA'}</title>
            <link rel='canonical' href='https://www.animeandromeda.net' />
          </Helmet>
        </HelmetProvider>
        <BrowserRouter>
          <div className='App'>
            <Switch>
              <Route exact path='/' render={(props) => <Home {...props}></Home>}></Route>
              <Route exact path='/anime/details/:anime' component={this.lazyLoadCompoment(AnimeDetails)}></Route>
              <Route exact path='/anime/view' component={this.lazyLoadCompoment(AnimeView)} onEnter={this.scrollToTop}></Route>
            </Switch>
          </div>
        </BrowserRouter>
        <div className='mt-3'></div>
        <footer className='footer'>
          <div className='container'>
            <span className='text-muted underlined' onClick={this.navigateHome}>AnimeAndromeda</span>
            <span className='text-muted'>&nbsp;|&nbsp;per qualsiasi informazione o richiesta scrivere al&nbsp;</span>
            <a href='https://t.me/AnimeAndromeda'>
              <span className='text-muted underlined'>gruppo Telegram
              </span>
              <span>
                &nbsp;<img alt='telegram' src={TelegramIco} height={18}></img>
              </span>
            </a>
            <span className='text-muted font-weight-light'>&nbsp;|&nbsp;this site acts as an index, nothing is stored |&nbsp;</span>
            <span className='text-muted font-weight-light underlined' onClick={this.changeTheme}>
              {this.state.theme === 'light' ? 'Passa al tema scuro' : 'Passa al tema chiaro'}
            </span>
          </div>
        </footer>
      </div >
    );
  }
}

export default App;
