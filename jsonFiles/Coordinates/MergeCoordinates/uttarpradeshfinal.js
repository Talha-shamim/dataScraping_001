const final = require("../uttarpradeshcoordinates.json");
const uttar = require("../../uttarpradesh.json");
const fs = require("fs");

function get() {
  uttar.map((dt) => {
    final.map((data) => {
      if (dt.googleSearch === data.url) {
        if(data.location){
      dt.hospitalAddress = data.location;
        }

        if(data.phone){
      dt.phoneNo = data.phone;
        }
        
        if(data.cordlat){
      dt.latitude = data.cordlat;
        }

        if(data.cordlon){
      dt.longitude = data.cordlon;
        }


    }
    });
  });

  uttar.map(dt=> {

    if(dt.phoneNo.length<=4){
      dt.phoneNo="Not Available"
    }
    
    if(dt.hospitalAddress==="Not Available" && dt.phoneNo==="Not Available"){
      dt.rank=0
    }
    if(dt.hospitalAddress!=="Not Available" || dt.phoneNo!=="Not Available"){
      dt.rank=1
  }
    if(dt.hospitalAddress!=="Not Available" && dt.phoneNo!=="Not Available"){
      dt.rank=2
    }


    
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
}

exports.uttarfinal = get;
