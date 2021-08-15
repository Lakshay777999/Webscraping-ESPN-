let request=require('request');
let fs=require('fs');
let cheerio=require('cheerio');
const getlinks = require('./match');

function getallmatches(link)
{
request(link,cb);
}
function cb(error,response,html)
{
    parseData(html);
}
function parseData(html)
{
   let ch=cheerio.load(html);
   let atag=ch('a[data-hover="Scorecard"]');
   for(let i=0;i<atag.length;i++)
   {
       let link="https://www.espncricinfo.com"+ch(atag[i]).attr('href');
       getlinks(link);
   }
 

}
module.exports=getallmatches;