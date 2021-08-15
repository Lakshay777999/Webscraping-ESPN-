let request=require('request');
let fs=require('fs');
let cheerio=require('cheerio');
const getallmatcheslink = require('./allmatches');
const getallmatches = require('./allmatches');
var link="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415";
request(link,cb);
function cb(error,response,html)
{
    parseData(html);
}
function parseData(html)
{
    //fs.writeFileSync('inndex.html'html)// create file of html
    let ch=cheerio.load(html);
    let atag=ch('.widget-items.cta-link a').attr('href');
    let completelink="https://www.espncricinfo.com"+atag;
    getallmatches(completelink);
   

}