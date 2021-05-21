const express = require("express");
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api_oxynet", (req, res) => {
  try {
    const place = req.query.placename;
    console.log(place);
    fs.readFile(`./jsonFiles/${place}.json`, "utf-8", (error, data) => {
      res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 3001, () => console.log(`listening`));
