const googleTamil = require("../puducherrycoordinates.json");
const Tamil = require("../../puducherry.json");
const fs = require("fs");


Tamil.map((dt) => {
  googleTamil.map((gdt) => {
    if (dt.googleSearch === gdt.url && gdt.location.length >= 4) {
      dt.hospitalAddress = gdt.location;
      dt.phoneNo = gdt.phone;
      dt.lattitude = gdt.cordlat;
      dt.longitude = gdt.cordlon;
    }
  });
});

fs.writeFile(`jsonFiles/puducherry.json`, JSON.stringify(Tamil, null, 2), (error) => {
  if (error) {
    console.log(error);
  } else console.log(`File written in Puducherry final`);
});
