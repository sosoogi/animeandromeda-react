import React, { Suspense } from 'react';
import { shrinkLocalStorage } from './globals/functions';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TelegramIco from './assets/telegram.svg';
import ReactGA from 'react-ga';
import { getCLS, getFID, getLCP } from 'web-vitals';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/Routes/PrivateRoute';
import { UserProvider } from './components/Contexts/UserContext';
import './App.scss';

const AnimeDetails = React.lazy(() => import('./components/AnimeDetails/AnimeDetails'));
const AnimeView = React.lazy(() => import('./components/AnimeView/AnimeView'));
const TopAnime = React.lazy(() => import('./components/AnimeTop/TopAnime'));
const Calendar = React.lazy(() => import('./components/AnimeCalendar/Calendar'));
const Archive = React.lazy(() => import('./components/AnimeArchive/Archive'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const About = React.lazy(() => import('./components/About/About'));
const Login = React.lazy(() => import('./components/Login/Login'));

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: localStorage.getItem('theme') || 'dark'
    };
  }

  async componentDidMount() {
    // prevent white bar in dark theme
    this.state.theme === 'dark' ? document.body.style.backgroundColor = '#0A1621' : document.body.style.backgroundColor = '#eaf4fd'
    // google analytics
    ReactGA.initialize('UA-173488988-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    ReactGA.event({
      category: 'Home',
      action: 'User landed on the site'
    });
    // web vitals
    getLCP(this.sendToGoogleAnalytics);
    getCLS(this.sendToGoogleAnalytics);
    getFID(this.sendToGoogleAnalytics);

    await shrinkLocalStorage();
  }

  componentDidUpdate() {
    // actually change the body
    this.state.theme === 'dark' ? document.body.style.backgroundColor = '#0A1621' : document.body.style.backgroundColor = '#eaf4fd'
  }

  changeTheme = () => {
    if (this.state.theme === 'dark') {
      this.setState({ theme: 'light' });
      localStorage.setItem('theme', 'light');
    } else {
      this.setState({ theme: 'dark' });
      localStorage.setItem('theme', 'dark');
    }
  }

  lazyLoadComponent(C) {
    return (props) => (
      <Suspense fallback={<><br></br><div>Caricamento...</div></>}>
        <C {...props} />
      </Suspense>
    );
  }

  navigateHome() {
    window.location.pathname = '/';
  }

  async sendToGoogleAnalytics({ name, delta, id }) {
    ReactGA.event({
      category: 'Web Vitals',
      action: name,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      label: id,
      nonInteraction: true,
    });
  }

  render() {
    return (
      <div className={'theme ' + (this.state.theme === 'dark' ? 'theme--dark' : 'theme--light')}>
        <BrowserRouter>
          <UserProvider>
            <div className='App'>
              <Navbar></Navbar>
              <Switch>
                <Route exact path='/' render={(props) => <Home {...props}></Home>}></Route>
                <Route exact path='/anime/details/:anime' component={this.lazyLoadComponent(AnimeDetails)}></Route>
                <Route exact path='/anime/view' component={this.lazyLoadComponent(AnimeView)}></Route>
                <Route exact path='/calendario' component={this.lazyLoadComponent(Calendar)}></Route>
                <Route exact path='/archivio' key='def' component={this.lazyLoadComponent(Archive)}></Route>
                <PrivateRoute exact path='/profile' component={this.lazyLoadComponent(Profile)} />
                <Route exact path='/archivio/:genere' key='pre' component={this.lazyLoadComponent(Archive)}></Route>
                <Route exact path='/about' component={this.lazyLoadComponent(About)}></Route>
                <Route exact path='/login' component={this.lazyLoadComponent(Login)}></Route>
                <Route exact path='/top' component={this.lazyLoadComponent(TopAnime)}></Route>
              </Switch>
            </div>
          </UserProvider>
        </BrowserRouter>

        <div className='mt-3'></div>

        <footer className='footer'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 col-md-8 col-xs-6'>
                <div className='text-muted underlined' onClick={this.navigateHome}>AnimeAndromeda</div>
                <span className='text-muted'>Per qualsiasi informazione o richiesta scrivere al&nbsp;</span>
                <span onClick={() => window.open('https://t.me/AnimeAndromeda')}>
                  <span className='text-muted underlined'>gruppo Telegram</span>
                  <span>&nbsp;<img alt='telegram' src={TelegramIco} height={18}></img></span>
                </span>
                <p className='text-muted underlined' onClick={this.changeTheme}>
                  {this.state.theme === 'light' ? 'Passa al tema scuro' : 'Passa al tema alternativo'}
                </p>
              </div>
              <div className='col-lg-4 col-md-4 col-xs-6'>
                <span className='text-muted'>
                  All Rights Reserved, all files on this site are the property of
                  their respective and rightful owners. Info/Abuse: info.animeandromeda@gmail.com
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div >
    );
  }
}

export default App;
