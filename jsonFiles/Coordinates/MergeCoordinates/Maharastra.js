const maharastra = require('../../maharastra.json')
const mahasatracoord = require('../Maharastracoordinates.json')
const fs = require("fs");
console.log(maharastra.length)
console.log(mahasatracoord.length)
maharastra.map(dt => {
    mahasatracoord.map(data => {
        if(dt.googleSearch===data.url){
            dt.hospitalAddress=data.location
            dt.phoneNo=data.phone
            dt.latitude=data.cordlat
            dt.longitude=data.cordlon
        }
    })
})

fs.writeFile(
    `../../maharastra.json`,
    JSON.stringify(maharastra, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log("coordinatesData maharastra");
    }
  );