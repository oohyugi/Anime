const {getHtml} = require('./html');
const cheerio = require('cheerio');
const extract = require('./extract')

const getDetail = async (url) => {
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    const data = {};
   
    const cover = $("img[class='size-full wp-image-85994 aligncenter']").attr('src');
    data['title'] = $("h1[itemprop='name']").find('b').text();
    data['cover'] = cover;
    const content =  $('div.content_episode');
    
    const desc = content.find('div').slice(1).eq(0)
    data['description'] = desc.find('p').slice(3).eq(0).text();
    data['next_release'] = desc.find('p').slice(2).eq(0).text();
    const htmlDownlod = $('div.download-eps').find('li');
    const linkDownload =[]
    
    
    

    $('div.download-eps').find('li').each((index,item) =>{

        const title = $(item).find('strong').text()
        const quality = {}
        const qualityData =[]
        $(item).find('span').each((index,item2)=>{
            const source = {}
            source['type'] = $(item2).find('a').text();
            const url = extract.extractUrl($(item2).find('a').attr('href'))
            source['url'] = url;
            qualityData.push(source)
        })
        
        quality['data'] = qualityData
        quality['quality'] =title
        
        linkDownload.push(quality)
        
    })
   
    data['download'] = linkDownload
    return data;
}


const getDetailAnoboy = async (url) => {
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    const data = {};
   
    // const cover = $("img[class='size-full wp-image-85994 aligncenter']").attr('src');
    // data['title'] = $("h1[itemprop='name']").find('b').text();
    // data['cover'] = cover;
    // const content =  $('div.content_episode');
    
    // const desc = content.find('div').slice(1).eq(0)
    // data['description'] = desc.find('p').slice(3).eq(0).text();
    // data['next_release'] = desc.find('p').slice(2).eq(0).text();
    const streamUrl = $('source').attr('src');
    data['stream_url'] = streamUrl
    const linkDownload =[]
    const source = {}
    
    const qualityData =[]

    // $('div.download-eps').find('li').each((index,item) =>{

    //     const title = $(item).find('strong').text()
    //     const quality = {}
    //     $(item).find('span').each((index,item2)=>{
    //         source['type'] = $(item2).find('a').text();
    //         source['url'] = $(item2).find('a').attr('href');
    //         qualityData.push(source)
    //     })
        
    //     quality['data'] = qualityData
    //     quality['quality'] =title
        
    //     linkDownload.push(quality)
        
    // })
   
    // data['download'] = linkDownload
    return data;
}


getDetail(`https://www.samehadaku.tv/black-clover-episode-105/`).then(console.log)
// getDetailAnoboy(`https://anoboy.org/2019/10/ore-wo-suki-nano-wa-omae-dake-ka-yo-episode-3/`).then(console.log)

const Detail = {
    getDetail,
    getDetailAnoboy
}

module.exports = Detail;