const googleTamil = require("../GoogleData/tamilnadu.json");
const Tamil = require("../tamilnadu.json");
const fs = require("fs");

console.log(googleTamil.length);
console.log(Tamil.length);
Tamil.map((dt) => {
  googleTamil.map((gdt) => {
    if (dt.googleSearch === gdt.url) {
      dt.hospitalAddress = gdt.location;
      dt.phoneNo = gdt.phone;
      dt.lattitude = gdt.cordlat;
      dt.longitude = gdt.cordlon;
    }
  });
});

fs.writeFile(`../tamilnadu.json`, JSON.stringify(Tamil, null, 2), (error) => {
  if (error) {
    console.log(error);
  } else console.log(`File written Tamil Nadu`);
});
