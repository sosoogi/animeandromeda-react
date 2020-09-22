import rotto from '../assets/rotto.svg'
import blocked from '../assets/blocked.png'

const globals = {
    API_URL: process.env.REACT_APP_API_URL,
    AUTH_API_URL: process.env.REACT_APP_AUTH_API_URL,
    INCONSISTENT_API_IMG: rotto,
    BLOCKED_ADS_IMG: blocked,
    MOBILE_MAX_WIDTH: 430,
}

export default globals;