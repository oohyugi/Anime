const {getHtml} = require('./html')
const cheerio = require('cheerio');
const constantUrl = require('./constant')


const getList = async (page = null) => {
    const baseUrl = 'https://www.samehadaku.tv';
    let urlRequest = page ? `${baseUrl}/page/${page}/` : `${baseUrl}`;
    // if (url) urlRequest = url;
    console.log(urlRequest)
    const html = await getHtml(urlRequest);
    const $ = cheerio.load(html);
    const data = [];
    $("div[class='white updateanime']").find("li[itemscope='itemscope']").each((index, item) => {
        const url = $(item).find("a").attr('href');
        const title = $(item).find('a').attr('title');
        const poster = $(item).find('img').attr('src');
        const release = $(item).find('span').slice(1).eq(0).text();
        const result = {url,title, poster,release};
        console.log(item)

        data.push(result)
    })
    return data;
}

const getListAnoboy = async (page = null) => {
    const baseUrl = constantUrl.baseUrl
    let urlRequest = page ? `${baseUrl}/page/${page}/` : `${baseUrl}`;
    // if (url) urlRequest = url;
    console.log(urlRequest)
    const html = await getHtml(urlRequest);
    const $ = cheerio.load(html);
    const data = [];
    $("div[class='home_index']").find("a[rel='bookmark']").each((index, item) => {
        const url = $(item).attr('href');
        const title = $(item).find('h3.ibox1').text();
        const img = $(item).find('div.amv').attr('style');
    
        const poster = (`${img}`).toString().substring((`${img}`).indexOf("(")+1,(`${img}`).lastIndexOf(")"));
        const release = $(item).find('div.jamup').text();
        const result = {url,poster,title,release};
        // console.log(item)

        data.push(result)
    })
    return data;
}

const getListSearch = async (query = "naruto") => {
    const baseUrl = 'https://www.samehadaku.tv';
    let urlRequest = `${baseUrl}/?s=${encodeURIComponent(query)}`;
    // if (url) urlRequest = url;
    console.log(urlRequest)
    const html = await getHtml(urlRequest);
    const $ = cheerio.load(html);
    const data = [];
    $("div.bs").each((index, item) => {
        const url = $(item).find("a").attr('href');
        const title = $(item).find('a').attr('alt');
        const poster = $(item).find('img').attr('src');
        // const release = $(item).find('span').slice(1).eq(0).text();
        const result = {url,title,poster};
        console.log(item)

        data.push(result)
    })
    return data;
}

// getList(1).then(console.log)
// getListSearch("sao").then(console.log)
// getListAnoboy(1).then(console.log)



const List ={
        getList,
        getListSearch,
        getListAnoboy
}

module.exports = List