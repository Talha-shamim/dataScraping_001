const pune = require("../pune.json");
const navimumbai = require("../navimumbai.json");
const fs = require("fs");

function get() {
  const maharastra = pune.concat(navimumbai);

  fs.writeFile(
    `jsonFiles/maharashtra.json`,
    JSON.stringify(maharastra, null, 2),
    (error) => {
      if (error) {
        console.log(error);
      } else console.log("maharashrtra merge");
    }
  );
}

get();
exports.mergemaharashtra = get;
