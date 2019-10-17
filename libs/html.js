const fetch = require('node-fetch');

const getHtml = async (url) => {
    return (await fetch(url)).text()
}
const getHtmlAndCookie = async (url) => {
    const response = await fetch(url);
    const cookie = 'DRIVE_STREAM=' + response.headers.get('set-cookie').split('DRIVE_STREAM=')[1].split(';')[0];
    const html = await response.text();
    return {html, cookie}
}

module.exports = {
    getHtml,
    getHtmlAndCookie
}