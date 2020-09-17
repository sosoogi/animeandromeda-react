import rotto from '../assets/rotto.svg'
import blocked from '../assets/blocked.png'

const globals = {
    API_URL: 'https://animeandromeda-py.herokuapp.com/api/v2/',
    // API_URL: process.env.NODE_ENV === 'development' ? 'http://192.168.1.101:5000/api/v2/' : 'https://animeandromeda-py.herokuapp.com/api/v2/',
    INCONSISTENT_API_IMG: rotto,
    BLOCKED_ADS_IMG: blocked,
    MOBILE_MAX_WIDTH: 430,
}

export default globals;