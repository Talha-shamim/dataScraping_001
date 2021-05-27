const ranchi = require('../ranchi.json')
const googleData = require('../../puppeteer/googleScrapper')
const fs = require("fs");
var ranchicoord=[]
ranchi.map(dt=> {
    googleData.google(dt.googleSearch)
    .then(x=> {
        if(x.location){
            ranchicoord.push(x)
            fs.writeFile(
                `jsonFiles/Coordinates/ranchicoordinates.json`,
                JSON.stringify(ranchicoord, null, 2),
                (error) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(`ranchi coordmaker`);
                  }
                }
              );
        }
    })
})