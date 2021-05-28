const googleGujrat = require('../uttrakhandcoordinates.json')
const Gujrat = require('../../uttarakhand.json')
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
    `jsonFiles/uttarakhand.json`,
    JSON.stringify(Gujrat, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log(`File written uttrakhand final`);
    }
  )

