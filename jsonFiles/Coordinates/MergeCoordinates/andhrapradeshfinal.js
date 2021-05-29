const googleGujrat = require("../andhraacoordinates.json");
const Gujrat = require("../../andhrapradesh.json");
const fs = require("fs");

function get() {
  Gujrat.map((dt) => {
    googleGujrat.map((gdt) => {
      if (dt.googleSearch === gdt.url) {
          if(gdt.location.length >=4){
        dt.hospitalAddress = gdt.location;
          }

          if(gdt.phone.length>=4){
        dt.phoneNo = gdt.phone;
          }
          
          if(gdt.cordlat.length>=2){
        dt.lattitude = gdt.cordlat;
          }

          if(gdt.cordlon.length>=2){
        dt.longitude = gdt.cordlon;
          }

      }

 
    });
  });

  fs.writeFile(
    `jsonFiles/andhrapradesh.json`,
    JSON.stringify(Gujrat, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log(`File written andhra final`);
    }
  );
}

exports.andhrafinal = get;
