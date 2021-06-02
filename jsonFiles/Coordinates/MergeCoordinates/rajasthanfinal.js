const maharastra = require("../../rajasthan.json");
const mahasatracoord = require("../rajasthanacoordinates.json");
const fs = require("fs");

function get() {
  maharastra.map((dt) => {
    mahasatracoord.map((data) => {
      if (dt.googleSearch === data.url) {
        if (data.location) {
          dt.hospitalAddress = data.location;
        }

        if (data.phone) {
          dt.phoneNo = data.phone;
        }

        if (data.cordlat) {
          dt.latitude = data.cordlat;
        }

        if (data.cordlon) {
          dt.longitude = data.cordlon;
        }
      }
    });
  });

  maharastra.map((dt) => {
    if (dt.phoneNo.length <= 4) {
      dt.phoneNo = "Not Available";
    }

    if (
      dt.hospitalAddress === "Not Available" &&
      dt.phoneNo === "Not Available"
    ) {
      dt.rank = 0;
    }
    if (
      dt.hospitalAddress !== "Not Available" ||
      dt.phoneNo !== "Not Available"
    ) {
      dt.rank = 1;
    }
    if (
      dt.hospitalAddress !== "Not Available" &&
      dt.phoneNo !== "Not Available"
    ) {
      dt.rank = 2;
    }
<<<<<<< HEAD

    var d = new Date
    var date = d.getDate()
    var month = d.getMonth()
    var year = d.getFullYear()
    var timehour= d.getHours()
    var timeminute = d.getMinutes()
    var finalstringdate= date + '-' + month + '-' + year
    var finalstringtime = timehour+':' + timeminute
dt.ServerUpdatedate=finalstringdate
dt.ServerUpdatetime=finalstringtime
    
  })
=======
  });
>>>>>>> 7fae24baa9223c8562aec674d3c9716b084a1126

  fs.writeFile(
    `jsonFiles/rajasthan.json`,
    JSON.stringify(maharastra, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log("rajasthan final");
    }
  );
}

exports.rajasthanfinal = get;
