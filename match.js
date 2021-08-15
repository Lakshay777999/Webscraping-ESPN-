let request=require('request');
let fs=require('fs');
let cheerio=require('cheerio');
const { create } = require('domain');
 
//let link="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/england-vs-australia-2nd-semi-final-1144529/full-scorecard";
function getlinks(link)
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
let bothin=ch('.card.content-block.match-scorecard-table .Collapsible');
for(let i=0;i<bothin.length;i++)
{
    let teamname=ch(bothin[i]).find('h5').text();
   teamname=teamname.split("INNINGS")[0].trim();
   //console.log(teamname);
   let alltr=ch(bothin[i]).find(".table.batsman tbody tr");
   for(let j=0;j<alltr.length-1;j++)
   {
       let alltds=ch(alltr[j]).find("td");
       if(alltds.length>1)
       {
           let batsmanname=ch(alltds[0]).find("a").text().trim();
           let runs=ch(alltds[2]).text().trim();
           let balls=ch(alltds[3]).text().trim();
           let fours=ch(alltds[5]).text().trim();
           let six=ch(alltds[6]).text().trim();
           let strikerate=ch(alltds[7]).text().trim();
          // console.log(`batsman = ${batsmanname} runs = ${runs} balls = ${balls} fours = ${fours} six = ${six} strike rate = ${strikerate}`);
          processdetails(teamname,batsmanname,runs,balls,fours,six,strikerate);


       }

   }
   
   
}
console.log("#######################################");

}
function checkteamfolder(teamname)
{
return fs.existsSync(teamname);
}
function checkbatsman(teamname,batsmanname)
{
let batsmanpath=`${teamname}/${batsmanname}.json`;
return fs.existsSync(batsmanpath);
}
function updatebatsmanfile(teamname,batsmanname,runs,balls,fours,six,strikerate)
{
    let batsmanpath=`${teamname}/${batsmanname}.json`;
    let batsmanfile=fs.readFileSync(batsmanpath);
    batsmanfile=JSON.parse(batsmanfile);
    let innings={
        Runs:runs,
        Balls:balls,
        Four:fours,
        Six:six,
        SR:strikerate
    };
    batsmanfile.push(innings);
    batsmanfile=JSON.stringify(batsmanfile);
fs.writeFileSync(batsmanpath,batsmanfile);

}
function createbatsmanfile(teamname,batsmanname,runs,balls,fours,six,strikerate)
{
    let batsmanpath=`${teamname}/${batsmanname}.json`;
let batsmanfile=[];
let innings={
    Runs:runs,
    Balls:balls,
    Four:fours,
    Six:six,
    SR:strikerate
};
batsmanfile.push(innings);
batsmanfile=JSON.stringify(batsmanfile);
fs.writeFileSync(batsmanpath,batsmanfile);
}
function createteamfolder(teamname)
{
fs.mkdirSync(teamname);
}
function  processdetails(teamname,batsmanname,runs,balls,fours,six,strikerate)
{
    //check if team folder exist
    let isteam=checkteamfolder(teamname);
    if(isteam)
    {
        let isbatsman=checkbatsman(teamname,batsmanname);
        if(isbatsman)
        {
            updatebatsmanfile(teamname,batsmanname,runs,balls,fours,six,strikerate);
        }
        else{
            createbatsmanfile(teamname,batsmanname,runs,balls,fours,six,strikerate);
        }

    }
    else{
        createteamfolder(teamname);
        createbatsmanfile(teamname,batsmanname,runs,balls,fours,six,strikerate);
    }
}
module.exports=getlinks;