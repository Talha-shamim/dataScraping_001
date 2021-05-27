const final =require('../uttarpradeshcoordinates.json')
const uttar = require('../../uttarpradesh.json')
const fs = require("fs");

uttar.map(dt => {
    final.map(data=> {
        if(dt.googleSearch===data.url){
            if(data.location.indexOf("Uttar Pradesh")!==(-1)){
                dt.hospitalAddress=data.location
            }
            if(data.cordlat.indexOf(".")!==(-1)){
                dt.latitude=data.cordlat
            }
            if(data.cordlon.indexOf(".")!==(-1)){
                dt.longitude=data.cordlon
            }


        }
    })
})

fs.writeFile(
    `jsonFiles/uttarpradesh.json`,
    JSON.stringify(uttar, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log(`File written final uttarpradesh`);
    }
  );