import crypto from 'crypto'
import cookie from 'js-cookie'

export const shrinkLocalStorage = async () => {
    let a = {},
        k = Object.keys(localStorage),
        j = k.length;
    if (j >= 100) {
        for (let i = 0; i < (j / 2); i++)
            a[k[i]] = localStorage.removeItem(k[i]);
    }
}

export const createMD5 = (data) => {
    const salt = crypto
        .createHmac('md5', data)
        .update('per favore')
        .digest('hex')
    return salt;
}

export const convertDate = (inputFormat) => {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

export const convertAiredFrom = (inputDate) => {
    return String(inputDate).split(' ')[2] || '0000';
}

export const isLogin = () => {
    return !!cookie.get('auth-token')
}