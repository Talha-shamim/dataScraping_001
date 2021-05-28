const maharastra = require('../../maharastra.json')
const mahasatracoord = require('../maharastracoordinates.json')
const fs = require("fs");

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
    `jsonFiles/maharastra.json`,
    JSON.stringify(maharastra, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log(" maharastra final");
    }
  );