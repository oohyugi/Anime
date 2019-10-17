const express = require('express')
const app = express()
const port = 3000
const list = require('./libs/list')
const detail = require('./libs/detail')


app.get('/', async (req, res) =>{
    
    const manga = await list.getList(1)
    res.send(manga)

})
app.get('/detail/:slug', async (req, res) =>{
    
    const url = `https://www.samehadaku.tv/ore-wo-suki-nano-wa-omae-dake-ka-yo-episode-3/`
    const manga = await detail.getDetail(url)
    res.send(manga)

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))