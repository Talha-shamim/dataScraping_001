const googleGujrat = require('../ahmedabadcoordinates.json')
const Gujrat = require('../../gujrat.json')
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
    `jsonFiles/gujrat.json`,
    JSON.stringify(Gujrat, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log(`File written Gujrat final`);
    }
  )

