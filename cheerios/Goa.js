const axios = require('axios')
const cheerio = require('cheerio')
const { get } = require('cheerio/lib/api/traversing')
const googleData = require('../puppeteer/googleScrapper')
const fs = require('fs')

const getData = async () => {
    var Goa = []
    axios.get('https://goaonline.gov.in/beds')
    .then(res => {
        const $ = cheerio.load(res.data)
        var name=[]
        var totalbed = []
        var vacantbed = []
        var lastupdate = []
        var date = []
        var time = []
     


        $('tr > td:nth-child(2)').each((i,data) => {
            if(i<=28){
            name.push($(data).text())
            }
        })

        $('tr > td:nth-child(3)').each((i,data) => {
            if(i<=28){
            totalbed.push($(data).text())
            }
        })
        $('tr > td:nth-child(4)').each((i,data) => {
            if(i<=28){
            vacantbed.push($(data).text())
            }
        })
        $('tr > td:nth-child(7)').each((i,data) => {
            if(i<=28){
            lastupdate.push($(data).text())
            }
        })

        lastupdate.map(data => {
            date.push(data.substring(0,8))
            time.push(data.substring(9))
        })

        name.map(data => {
            
        var obj = {
            hospitalName:'',
            hospitalAddress:'Not Available',
            normalBedTotal:'',
            normalBedOccupied:'-',
            normalBedAvailable:'',
            oxygenBedTotal:'-',
            oxygenBedOccupied:'-',
            oxygenBedAvailable:'-',
            lastUpdatedDate:'',
            lastUpdatedTime:'',
            district:'',
            state:'Goa',
            phoneNo:'Not Available',
            googleSearch:''
        }
        var replacedString = data.replace(" ","+") 
        var finalRepString = replacedString + '+Goa' 
        var gStringpt1 = 'https://www.google.com/search?q='
        var gStringpt3='&rlz=1C1CHBF_enIN859IN859&oq='
        var gStringpt5='&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8' 
        var finalString = gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5
        obj['googleSearch']=finalString
            obj['hospitalName']=data
            Goa.push(obj)
        })

        Goa.map((data,i)=> {
            totalbed.map((dt,j) => {
                if(i===j){
                    data['normalBedTotal']=dt
                }
            })
            vacantbed.map((dt,k) => {
                if(i===k){
                    data['normalBedAvailable']=dt
                }
            })
            date.map((dt,m) => {
                if(i===m){
                    data['lastUpdatedDate']=dt
                }
            })
            time.map((dt,n) => {
                if(i===n){
                    data['lastUpdatedTime']=dt
                }
            })

        
          
        })

        var arraynew =[]
 
        Goa.map(dt => {
            googleData.google(dt.googleSearch)
            .then(x=> {
                if(x.location){
                    arraynew.push(x)
          
        fs.writeFile(
            `../jsonFiles/GoogleData/goa.json`,
            JSON.stringify(arraynew, null, 2),
            (error) => {
              if (error) {
                console.log(error);
              } else console.log(`File written Goa google`);
            }
          )
          
                }
            })
        })

        fs.writeFile(
            `../jsonFiles/goa.json`,
            JSON.stringify(Goa, null, 2),
            (error) => {
              if (error) {
                console.log(error);
              } else console.log(`File written Goa`);
            }
          )
          
   
    })

    .catch(err => {
        console.log(err)
    })

    return Goa

}

getData()

const main = async () => {
    const dt = await getData()
    console.log(dt)
    
 
}

exports.getgoa = getData;

// main()
