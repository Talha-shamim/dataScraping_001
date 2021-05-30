const googleGujrat = require("../goacoordinates.json");
const Gujrat = require("../../goa.json");
const fs = require("fs");

function get() {
  Gujrat.map((dt) => {
    googleGujrat.map((gdt) => {
      if (dt.googleSearch === gdt.url) {
        if(gdt.location){
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

  Gujrat.map(dt=> {

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
    `jsonFiles/goa.json`,
    JSON.stringify(Gujrat, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log(`File written Goa final`);
    }
  );
}

exports.goafinal = get;
