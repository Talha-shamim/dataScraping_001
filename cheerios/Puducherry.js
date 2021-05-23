const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

<<<<<<< HEAD

axios.get('https://covid19dashboard.py.gov.in/BedAvailabilityDetails')
=======
async function get(){
await axios.get('https://covid19dashboard.py.gov.in/BedAvailabilityDetails')
>>>>>>> 3b3b23e7be928afdef771bee9b83321f8e8d1d8a
    .then(res => {
        const $ = cheerio.load(res.data)
        var name=[]
        var totalo2bed = []
        var availableo2bed = []
        var date = []
        var time = []
        var Puducherry = []

        $('#Vaccination_PDY > div > table > tbody > tr > td.text-left').each((i,dt) => {
            var tg = $(dt).text()
            var newtg = tg.trim()
            name.push(newtg)
            
        })

        $('#Vaccination_KKL > div > table > tbody > tr > td.text-left').each((i,dt) => {
            var tg = $(dt).text().substring(53)
            var newtg = tg.trim()
            name.push(newtg)
           
        })
        $('#Vaccination_MAH > div > table > tbody > tr.text-right > td.text-left').each((i,dt) => {
            var tg = $(dt).text().substring(53)
            var newtg = tg.trim()
            name.push(newtg)
            
        })

        $('#Vaccination_YAN > div > table > tbody > tr.text-right > td.text-left').each((i,dt) => {
            var tg = $(dt).text().substring(53)
            var newtg = tg.trim()
            name.push(newtg)
        
        })
        
        $('#Vaccination_PDY > div > table > tbody > tr > td:nth-child(5)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            totalo2bed.push(newtg)
           
        })

        $('#Vaccination_KKL > div > table > tbody > tr > td:nth-child(5)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            totalo2bed.push(newtg)
           
        })
        $('#Vaccination_MAH > div > table > tbody > tr > td:nth-child(5)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            totalo2bed.push(newtg)
           
        })
        $('#Vaccination_YAN > div > table > tbody > tr > td:nth-child(5)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            totalo2bed.push(newtg)
           
        })




        $('#Vaccination_PDY > div > table > tbody > tr > td:nth-child(6)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            availableo2bed.push(newtg)
        })
        $('#Vaccination_KKL > div > table > tbody > tr > td:nth-child(6)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            availableo2bed.push(newtg)
        })
        $('#Vaccination_MAH > div > table > tbody > tr > td:nth-child(6)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            availableo2bed.push(newtg)
        })
        $('#Vaccination_YAN > div > table > tbody > tr > td:nth-child(6)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            availableo2bed.push(newtg)
        })
        $('#Vaccination_PDY > div > table > tbody > tr > td:nth-child(2)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            date.push(newtg.substring(0,10))
            time.push(newtg.substring(11,19))

        })
        $('#Vaccination_KKL > div > table > tbody > tr > td:nth-child(2)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            date.push(newtg.substring(0,10))
            time.push(newtg.substring(11,19))
        })
        $('#Vaccination_MAH > div > table > tbody > tr > td:nth-child(2)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            date.push(newtg.substring(0,10))
            time.push(newtg.substring(11,19))
        })
        $('#Vaccination_YAN > div > table > tbody > tr > td:nth-child(2)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            date.push(newtg.substring(0,10))
            time.push(newtg.substring(11,19))
        })

//         console.log(availableo2bed)
// console.log(date)
// console.log(time)
// console.log(totalo2bed)
      

      
        name.map(data => {
            
        var obj = {
            hospitalName:'',
            hospitalAddress:'Not Available',
            normalBedTotal:'-',
            normalBedOccupied:'-',
            normalBedAvailable:'-',
            oxygenBedTotal:'-',
            oxygenBedOccupied:'',
            oxygenBedAvailable:'',
            lastUpdatedDate:'',
            lastUpdatedTime:'',
            district:'Puducherry',
            phoneNo:'Not Available',
            state:'TamilNadu',
            googleSearch:''
        }

            obj['hospitalName']=data
            var replacedString = data.replace(" ","+") 
            var finalRepString = replacedString + '+Puducherry' 
            var gStringpt1 = 'https://www.google.com/search?q='
            var gStringpt3='&rlz=1C1CHBF_enIN859IN859&oq='
            var gStringpt5='&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8' 
            var finalString = gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5
            obj.googleSearch=finalString
            Puducherry.push(obj)
           
        })

        Puducherry.map((dt,ind) => {
            availableo2bed.map((data,i) => {
                if(i===ind){
                dt.oxygenBedAvailable=data
                }
            })
            totalo2bed.map((data,j) => {
                if(j===ind){
                dt.oxygenBedOccupied=data
                }
            })
            date.map((data,k) => {
                if(k===ind){
                dt.lastUpdatedDate=data
                }
            })
            time.map((data,l) => {
                if(l===ind){
                dt.lastUpdatedTime=data
                }
            })
        })

            
    fs.writeFile(
<<<<<<< HEAD
        `../jsonFiles/States/TamilNadu.json`,
=======
        `jsonFiles/TamilNadu.json`,
>>>>>>> 3b3b23e7be928afdef771bee9b83321f8e8d1d8a
        JSON.stringify(Puducherry, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log(`File written TamilNadu`);
        }
      )
      
<<<<<<< HEAD
        console.log("pudu",Puducherry)
=======
      
>>>>>>> 3b3b23e7be928afdef771bee9b83321f8e8d1d8a
      
      
    })

    .catch(err => {
        console.log(err)
<<<<<<< HEAD
    })
=======
    })
}

    exports.getpuducherry = get;


>>>>>>> 3b3b23e7be928afdef771bee9b83321f8e8d1d8a
