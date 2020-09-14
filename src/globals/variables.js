import rotto from '../assets/rotto.svg'
import blocked from '../assets/blocked.png'

const globals = {
    API_URL: process.env.NODE_ENV === 'production' ? 'https://animeandromeda-py.herokuapp.com/api/v2/' : 'http://192.168.1.101:5000/api/v2/',
    INCONSISTENT_API_IMG: rotto,
    BLOCKED_ADS_IMG: blocked,
    MOBILE_MAX_WIDTH: 420,
}

export default globals;