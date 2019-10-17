const _fs = require('fs'),
    _$ = require('cheerio'),
    _url = require('url'),
    _https = require('https'),
    _axios = require('axios'),
    _math = require('mathjs')

const querySearch = (q, u) => {
    if (!u) return null;
    q = q.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + q + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(u);
    return results == null ? null : results[1];
}

const clacSize = (a, b) => {
    if (0 == a) return "0 Bytes";
    var c = 1024,
        d = b || 2,
        e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}
// const zippyGetLink = async (u) => {
//     console.log('⏳  ' + _colors.yellow(`Get Page From : ${u}`))
//     const zippy = await _axios({ method: 'GET', url: u }).then(res => res.data).catch(err => false)
//     console.log('✅  ' + _colors.green('Done'))
//     console.log('⏳  ' + _colors.yellow('Fetch Link Download...'))
//     const $ = _$.load(zippy)
//     const url = _url.parse($('.flagen').attr('href'), true)
//     const urlori = _url.parse(u)
//     const key = url.query['key']
//     const time = _math.evaluate(/\(([\d\s\+\%]+?)\)/gm.exec($('#dlbutton').next().html())[1])
//     const dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (time) + '/DOWNLOAD'
//     console.log('✅  ' + _colors.green('Done'))
//     return dlurl
// }
// exports.ZippyDL = async (u, cb = () => { }) => {
//     const url = await zippyGetLink(u)
//     const req = await _https.get(url)
//     console.log('🎁  ' + _colors.yellow('Start Download From URL : ' + url))
//     console.log('⏳  ' + _colors.yellow('Waiting Server Response...'));
//     await req.on('response', res => {
//         if (!res.headers['content-disposition']) {
//             console.log('🔁  ' + _colors.blue('Server Download Error, Try To Get New Link...'))
//             exports.ZippyDL(u, cb)
//         } else {
//             console.log('✅  ' + _colors.green('Server Response'))
//             const size = parseInt(res.headers['content-length'], 10),
//                 filename = decodeURIComponent(res.headers['content-disposition'].match(/filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/)[1])
//             let currentSize = 0
//             console.log('☕  ' + _colors.yellow('Start Downloading File : ' + filename))
//             const file = _fs.createWriteStream(filename)
//             res.pipe(file)
//             const loadbar = new _proggers.Bar({
//                 format: 'Downloading ' + _colors.green('{bar}') + ' {percentage}% | {current}/{size} | ETA: {eta}s | Speed: {speed}',
//                 barsize: 25
//             }, _proggers.Presets.shades_classic)
//             loadbar.start(size, 0, {
//                 size: clacSize(size, 3),
//                 current: clacSize(currentSize, 3),
//                 speed: 0
//             })
//             res.on('data', c => {
//                 currentSize += c.length;
//                 loadbar.increment(c.length, {
//                     speed: clacSize(c.length),
//                     current: clacSize(currentSize, 3)
//                 })
//             })
//             res.on('end', _ => {
//                 loadbar.stop()
//                 file.close()
//                 console.log('✅  ' + _colors.green('Success Download File : ' + filename))
//                 cb()
//             })
//             res.on('error', _ => {
//                 loadbar.stop()
//                 file.close()
//                 console.log('❎  ' + _colors.green('Error Download File : ' + filename))
//                 cb()
//             })
//         }
//     })
// }
const gdGetLink = async (url) => {
    let id = querySearch('id', url)
    if (!id) {
        id = /\/file\/d\/(.+)\//gm.exec(url)[1]
    }
    const urlx = `https://drive.google.com/uc?id=${id}&authuser=0&export=download`
   
    const data = await _axios.post(urlx, {}, {
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            'content-length': 0,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'origin': 'https://drive.google.com',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
            'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
            'x-drive-first-party': 'DriveWebUi',
            'x-json-requested': 'true'
        }
    }).then(data => { 

        console.log(data)
        
        return { success: true, json: JSON.parse(data.data.slice(4)) } }).catch(() => { return { success: false } 
    
    
    })
    return data
}



gdGetLink('https://drive.google.com/open?id=1nL-EKTfqg3uPYVP8RsDBg8ih8ixyv3uJ').then(console.log)

const Gdrive = {
    gdGetLink
}

module.exports = Gdrive; 