const ranchi = require("../../ranchi.json");
const ranchiccord = require("../ranchicoordinates.json");
const fs = require("fs");

function get() {
  ranchi.map((dt) => {
    ranchiccord.map((data) => {
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

  ranchi.map(dt=> {

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

    var d = new Date
    var date = d.getDate()
    var month = d.getMonth() +1
    var year = d.getFullYear()
    var timehour= d.getHours()
    var timeminute = d.getMinutes()
    var finalstringdate= date + '-' + month + '-' + year
    var finalstringtime = timehour+':' + timeminute
dt.ServerUpdatedate=finalstringdate
dt.ServerUpdatetime=finalstringtime
    
  })
  fs.writeFile(
    "jsonFiles/jharkhand.json",
    JSON.stringify(ranchi, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log("File written Jharkhand final");
    }
  );
}

exports.mergejharkhand = get;
