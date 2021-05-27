const madhya = require('../madhyapradesh.json')
const googleData = require('../../puppeteer/googleScrapper')
const fs = require("fs");
var madhyacoord = []
madhya.map(dt=> {
    googleData.google(dt.googleSearch)
    .then(x=> {
        if(x.location){
            madhyacoord.push(x)
            fs.writeFile(
                `jsonFiles/Coordinates/madhyacoord.json`,
                JSON.stringify(madhyacoord, null, 2),
                (error) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(q);
                    console.log(`File written mdyacord`);
                  }
                }
              );

        }
    })
})