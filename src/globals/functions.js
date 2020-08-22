export const supportsWebp = async () => {
    if (!window.createImageBitmap) return false;
    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const blob = await fetch(webpData).then(r => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
}

export const shrinkLocalStorage = async () => {
    let archive = {},
        keys = Object.keys(localStorage),
        j = keys.length;
    if (j >= 40) {
        for (let i = 0; i < (j / 2); i++)
            archive[keys[i]] = localStorage.removeItem(keys[i]);
    }
}