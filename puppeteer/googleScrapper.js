const puppeteer = require('puppeteer');
let browser = puppeteer.Browser

const main = async (url) => {

    browser = await puppeteer.launch({
        headless:true
    })

    const dt = await gatherdata(url);
    if(dt.location){
        dt['url']=url
   
    }

   return dt
}

main()

const gatherdata = async (url) => {

  
    try{
        const urls=await url
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)
 


    const data = await page.evaluate(()=> {
    var address=''
    var phonecall=''
    var lattitude=''
    var longitude=''
      
        let adbool = address=document.querySelector('span.LrzXr')
        if(adbool){
            address=adbool.innerText
        }
        let phonebool=document.querySelector('a[data-dtype="d3ifr"]')
        if(phonebool){
            phonecall=phonebool.innerText
        }

        let coord = document.querySelector('.rhsmap4col > a')
        if(coord){
            var target=coord.getAttribute('data-url')
            var indexofa = target.indexOf('@')
            var indexof1stcomma = target.indexOf(',',indexofa)
            var indexof2ndcomma = target.indexOf(',',indexof1stcomma+2)
            lattitude=target.substring(indexofa+1,indexof1stcomma)
            longitude=target.substring(indexof1stcomma+1,indexof2ndcomma)

        }
   
        let item = {
            location:address,
            phone:phonecall,
            url:'',
            cordlat:lattitude,
            cordlon:longitude
     
        }

        return item
    })

   await page.close()
   return data
}
catch(err){
    console.log('err in google scrapper',err)
}

}

exports.google = main