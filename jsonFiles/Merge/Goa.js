const googleGoa = require('../GoogleData/goa.json')
const Goa = require('../goa.json')
const fs = require('fs')


Goa.map(dt=> {
    googleGoa.map(gdt => {
        if(dt.googleSearch===gdt.url){
            dt.hospitalAddress=gdt.location
            dt.phoneNo=gdt.phone
            dt.lattitude=gdt.cordlat
            dt.longitude=gdt.cordlon
        }
      
    })
}    
)

fs.writeFile(
    `../goa.json`,
    JSON.stringify(Goa, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log(`File written Goa`);
    }
  )

