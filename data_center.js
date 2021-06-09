const haryana = require("./cheerios/haryana.js");
const allahabad = require("./cheerios/allahabad.js");
const ranchi = require("./cheerios/ranchi.js");
const rajasthan = require("./cheerios/rajasthan.js");
const uttarpradesh = require("./cheerios/uttarpradesh.js");
const andrapradesh = require("./cheerios/andra.js");
const Goa = require("./cheerios/Goa.js");
const pune = require("./cheerios/pune.js");
const Navi = require("./cheerios/Navimumbai.js");
const madhya = require("./cheerios/madhya");
const Puducherry = require("./cheerios/Puducherry.js");

const Ahmedabad = require("./puppeteer/Ahmedabad.js");
const uttrakhand = require("./puppeteer/uttrakhand.js");
const kerala = require("./puppeteer/kerala.js");
const delhi = require("./puppeteer/delhi.js");
const westbengal = require("./puppeteer/westbengal.js");
const chattisgarh = require("./puppeteer/chattisgarh.js");

// const Goacoordmaker = require("./jsonFiles/Coordmaker/Goacoordmaker.js");
// const jharkhandcoordmaker = require("./jsonFiles/Coordmaker/Jharkhandcoordmaker.js");
// const madhyacoordmaker = require("./jsonFiles/Coordmaker/Madhyacoordmaker.js");
// const andhracoordmaker = require("./jsonFiles/Coordmaker/andhracoordmaker.js");
// const maharastracoordmaker = require("./jsonFiles/Coordmaker/Maharastracoordmaker.js");
// const uttarcoordmaker = require("./jsonFiles/Coordmaker/uttarcoordmaker.js");
// const puducherrycoordmaker = require("./jsonFiles/Coordmaker/puducherrycoordmaker.js");
// const delhicoordmaker = require("./jsonFiles/Coordmaker/delhicoordmaker.js");
// const allahabadcoordmaker = require("./jsonFiles/Coordmaker/allahabadcoordmaker.js"); // check here
// const ahmedabadcoordmaker = require("./jsonFiles/Coordmaker/ahmedabadcoordmaker.js");
// const keralacoordmaker = require("./jsonFiles/Coordmaker/keralacoordmaker");
// const uttrakhandcoordmaker = require("./jsonFiles/Coordmaker/uttrakhandcoordmaker.js");
// const haryanacoordmaker = require('./jsonFiles/Coordmaker/haryanacoordmaker.js')
// const westbengalcoordmaker = require('./jsonFiles/Coordmaker/westbengalcoordmaker.js')
// const rajasthancoordmaker = require('./jsonFiles/Coordmaker/rajasthancoordmaker.js')
// const chhattisgrahcoordmaker = require('./jsonFiles/Coordmaker/chhattisgarhcoordmaker.js')

const maharastrafinal = require("./jsonFiles/Coordinates/MergeCoordinates/Maharastrafinal.js");
const uttarfinal = require("./jsonFiles/Coordinates/MergeCoordinates/uttarpradeshfinal.js");
const gujratfinal = require("./jsonFiles/Coordinates/MergeCoordinates/Gujratfinal.js");
const dehifinal = require("./jsonFiles/Coordinates/MergeCoordinates/delhifinal.js");
const goafinal = require("./jsonFiles/Coordinates/MergeCoordinates/goafinal.js");
const Puducherryfinal = require("./jsonFiles/Coordinates/MergeCoordinates/puducherryfinal.js");
const jharkhandfinal = require("./jsonFiles/Coordinates/MergeCoordinates/jharkhandfinal.js");
const uttarakhandfinal = require("./jsonFiles/Coordinates/MergeCoordinates/uttrakhandfinal.js");
const madhyapradeshfinal = require("./jsonFiles/Coordinates/MergeCoordinates/madhyapradeshfinal.js");
const andhrafinal = require("./jsonFiles/Coordinates/MergeCoordinates/andhrapradeshfinal.js");
const haryanafinal = require("./jsonFiles/Coordinates/MergeCoordinates/haryanafinal.js");
const westbengalfinal = require("./jsonFiles/Coordinates/MergeCoordinates/westbengalfinal.js");
const rajasthanfinal = require("./jsonFiles/Coordinates/MergeCoordinates/rajasthanfinal.js");
const chhattisgarhfinal = require("./jsonFiles/Coordinates/MergeCoordinates/chhattisgarhfinal.js");

// setInterval(() => {
// andrapradesh.getandrapradesh();
// allahabad.getAllahabad();
// ranchi.getranchi();
// rajasthan.getrajasthan();
// uttarpradesh.getuttarpradesh();
// Goa.getgoa();
// madhya.getmadhyapradesh();
// haryana.getharyana();
// Puducherry.getpuducherry();
// Navi.getnavi();
// pune.getpune();

// }, 43200000);

// setInterval(() => {
// merge_Maharashtra.mergemaharashtra();
// }, 	43740000);

// setInterval(() => {
// }, 	45720000);

maharastrafinal.maharashtrafinal();
goafinal.goafinal();
Puducherryfinal.puducherryfinal();
jharkhandfinal.mergejharkhand();
uttarfinal.uttarfinal();
gujratfinal.gujratfinal();
uttarakhandfinal.uttarakhandfinal();
dehifinal.delhifinal();
madhyapradeshfinal.madhyafinal();
haryanafinal.haryanafinal();
westbengalfinal.bengalfinal();
rajasthanfinal.rajasthanfinal();
chhattisgarhfinal.chattisfinal();
andhrafinal.andhrafinal();

// // setInterval(() => {
// westbengal.getwestbengal();
// uttrakhand.getuttrakhand();
// kerala.getKerala();
// delhi.getdelhi();
// Ahmedabad.getahmadabad();
// chattisgarh.getchattisgarh();
// }, 44280000);

//============================================================
// uttarcoordmaker;
// Goacoordmaker;
// jharkhandcoordmaker;
// maharastracoordmaker;
// puducherrycoordmaker;
// delhicoordmaker;
// ahmedabadcoordmaker;
// keralacoordmaker;
// uttrakhandcoordmaker;
// madhyacoordmaker;
// andhracoordmaker;
// haryanacoordmaker
// westbengalcoordmaker
// rajasthancoordmaker
// chhattisgrahcoordmaker
