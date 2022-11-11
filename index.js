/*
 * @Descripttion:
 * @version:
 * @Author: ankeji
 * @Date: 2020-07-03 12:20:48
 * @LastEditors: ankeji
 * @LastEditTime: 2020-07-06 17:01:43
 */
// const fs = require('fs');
const cheerio = require('cheerio')
const https = require('./https')
// require("./db/db")
// const Video = require("./db/user")

function caijiVideo(page){
    // var url = `https://v.qq.com/x/bu/pagesheet/list?append=1&channel=movie&itype=100062&listpage=1&offset=${page}&pagesize=3`
    var url = `https://v.qq.com/x/cover/m441e3rjq9kwpsc.html`
    https.download(url, (data)=>{
        const s = data.indexOf('video_ids')
        const arr = data.split('video_ids');
        const e = arr[0].length + arr[1].indexOf(']') + 9
        const m = data.slice(s, e)
        const endstr = m.slice(m.indexOf('[') + 1)
        const mstr = endstr.replace(/"/g, "")
        const ends = mstr.split(',')
        const g = ends.map(vm => {
            const s = url.lastIndexOf('.html')
            vm = url.slice(0, s) + '/' + vm + '.html'
            return vm
        })
        console.log(g)
    })
}
caijiVideo(1)


// function caijiVideo(page) {
//     var url = `https://v.qq.com/x/bu/pagesheet/list?append=1&channel=movie&itype=100062&listpage=2&offset=${page}&pagesize=30`
//     https.download(url,(data)=>{
//         const $ = cheerio.load(data)
//         $("a.figure_title.figure_title_two_row.bold").each(function (i, e) {
//             var a = {
//                 name:'',
//                 url:''
//             }
//             a.name = $(e).text()
//             a.url = 'https://jx.lfeifei.cn/?url='+$(e).attr("href")
//             Video.find(a, (err, data) => {
//                 if (!err) {
//                     if (!data.length) {
//                         Video.create(a, function (err,data) {
//                             if (!err) {
//                                 console.log({code: 1, msg: "采集成功！"});
//                             } else {
//                                 console.log({code: 0, msg: "采集失败！"});
//                             }
//                         });
//                     }else{
//                         console.log("视频已存在");
//                     }
//                 } else {
//                     console.log("程序失败")
//                 }
//             });
//         });
//     })
// }
// var page = 0
// setInterval(()=>{
//     page+=30
//     caijiVideo(page)
// },2000)

