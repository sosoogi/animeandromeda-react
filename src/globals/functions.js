export const shrinkLocalStorage = async () => {
    let a = {},
        k = Object.keys(localStorage),
        j = k.length;
    if (j >= 40) {
        for (let i = 0; i < (j / 2); i++)
            a[k[i]] = localStorage.removeItem(k[i]);
    }
}