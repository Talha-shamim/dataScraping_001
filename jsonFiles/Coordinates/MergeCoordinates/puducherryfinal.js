const googleTamil = require("../puducherrycoordinates.json");
const Tamil = require("../../puducherry.json");
const fs = require("fs");

function get() {
  Tamil.map((dt) => {
    googleTamil.map((gdt) => {
      if (dt.googleSearch === gdt.url) {
        if(gdt.location ){
      dt.hospitalAddress = gdt.location;
        }

        if(gdt.phone){
      dt.phoneNo = gdt.phone;
        }
        
        if(gdt.cordlat){
      dt.latitude = gdt.cordlat;
        }

        if(gdt.cordlon){
      dt.longitude = gdt.cordlon;
        }


    }
    });
  });

  Tamil.map(dt=> {

    if(dt.hospitalAddress.includes("km²")){
      dt.hospitalAddress="Not Available"
    }
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
    var month = d.getMonth()
    var year = d.getFullYear()
    var timehour= d.getHours()
    var timeminute = d.getMinutes()
    var finalstringdate= date + '-' + month + '-' + year
    var finalstringtime = timehour+':' + timeminute
dt.ServerUpdatedate=finalstringdate
dt.ServerUpdatetime=finalstringtime
    
  })
  fs.writeFile(
    `jsonFiles/puducherry.json`,
    JSON.stringify(Tamil, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log(`File written in Puducherry final`);
    }
  );
}

exports.puducherryfinal = get;
