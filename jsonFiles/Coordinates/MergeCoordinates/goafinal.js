const googleGujrat = require('../goacoordinates.json')
const Gujrat = require('../../goa.json')
const fs = require('fs')

Gujrat.map(dt=> {
    googleGujrat.map(gdt => {
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
    `jsonFiles/goa.json`,
    JSON.stringify(Gujrat, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log(`File written Goa final`);
    }
  )

