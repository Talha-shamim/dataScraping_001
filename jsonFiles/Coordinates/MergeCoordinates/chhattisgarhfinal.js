const maharastra = require("../../rajasthan.json");
const mahasatracoord = require("../rajasthancoordinates.json");
const fs = require("fs");

function get() {
  maharastra.map((dt) => {
    mahasatracoord.map((data) => {
      if (dt.googleSearch === data.url) {
        if(data.location){
      dt.hospitalAddress = data.location;
        }

        if(data.phone){
      dt.phoneNo = data.phone;
        }
        
        if(data.cordlat){
      dt.lattitude = data.cordlat;
        }

        if(data.cordlon){
      dt.longitude = data.cordlon;
        }


    }
    });
  });

  maharastra.map(dt=> {

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
    `jsonFiles/chhattisgarh.json`,
    JSON.stringify(maharastra, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log("chhatisgarh final");
    }
  );
}

exports.maharashtrafinal = get;
