const puppeteer = require('puppeteer');

async function capture(){
    
    // launch the browser  
    // slowMo
    // headless
    const browser = await puppeteer.launch({
        headless : false,
    });

    // get a page
    const page = await browser.newPage();

    // navigate to a page and wait --> basically for frontend
    await page.goto('http://google.com', {waitUntil: "networkidle2"});

    // to wait
    // await page.waitFor(1000000);   // not in new version
    
    // page.type to write
    await page.type('.gLFyf.gsfi',"Hello World!");
    await page.waitFor(3000);   // not in new version
    
    // page.click to click
    await page.click('.gNO89b');
    




    // close the browser
    await browser.close();

}

capture();