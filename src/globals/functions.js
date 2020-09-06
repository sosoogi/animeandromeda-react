import crypto from 'crypto';

export const shrinkLocalStorage = async () => {
    let a = {},
        k = Object.keys(localStorage),
        j = k.length;
    if (j >= 40) {
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