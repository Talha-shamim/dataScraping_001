const axios = require('axios')
const cheerio = require('cheerio')
const { get } = require('cheerio/lib/api/traversing')
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
            phoneNo:'Not Available'
        }

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

        fs.writeFile(
            `jsonFiles/goa.json`,
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

const main = async () => {
    const dt = await getData()
    console.log(dt)
    
 
}

exports.getgoa = getData;

// main()
