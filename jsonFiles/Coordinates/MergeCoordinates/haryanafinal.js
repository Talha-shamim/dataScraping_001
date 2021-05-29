const googleGujrat = require("../haryanacoordinates.json");
const Gujrat = require("../../haryana.json");
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
    `jsonFiles/haryana.json`,
    JSON.stringify(Gujrat, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log(`File written haryana final`);
    }
  );
}

exports.haryanafinal = get;
