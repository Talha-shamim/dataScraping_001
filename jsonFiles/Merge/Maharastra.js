const googleMaharastra = require('../GoogleData/maharastra.json')
const maharastra = require('../maharastra.json')
const notObtained = []
const fs = require('fs')
console.log('gm',googleMaharastra.length)
console.log('mh',maharastra.length)

maharastra.map(dt=> {
    googleMaharastra.map(gdt => {
        if(dt.googleSearch===gdt.url){
            dt.hospitalAddress=gdt.location
            dt.phoneNo=gdt.phone
            dt.lattitude=gdt.cordlat
            dt.longitude=gdt.cordlon
        }
      
    })
}    
)

// console.log("no",notObtained)
fs.writeFile(
    `../maharastra.json`,
    JSON.stringify(maharastra, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log(`File written Maharastra`);
    }
  )
console.log("mh",maharastra)
