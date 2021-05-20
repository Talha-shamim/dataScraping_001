const express = require("express");
const fs = require("fs");

const app = express();

app.get("/api_oxygen_ranchi", (req, res) => {
  try {
    fs.readFile(`./jsonFiles/ranchi.json`, "utf-8", (error, data) => {
      res.send(JSON.parse(data));
    }); 
  } catch (error) {
    console.log(error);
  }
});

app.get("/api_oxygen_uttrakhand", (req, res) => {
  try {
    fs.readFile(`./jsonFiles/uttrakhand.json`, "utf-8", (error, data) => {
      res.send(JSON.parse(data));
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api_oxygen_uttarpradesh", (req, res) => {
  try {
    fs.readFile(`./jsonFiles/uttarpradesh.json`, "utf-8", (error, data) => {
      res.send(JSON.parse(data));
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api_oxygen_rajasthan", (req, res) => {
  try {
    fs.readFile(`./jsonFiles/rajasthan.json`, "utf-8", (error, data) => {
      res.send(JSON.parse(data));
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api_oxygen_allahabad", (req, res) => {
  try {
    fs.readFile(`./jsonFiles/allahabad.json`, "utf-8", (error, data) => {
      res.send(JSON.parse(data));
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api_oxygen_gurugram", (req, res) => {
  try {
    fs.readFile(`./jsonFiles/gurugram.json`, "utf-8", (error, data) => {
      res.send(JSON.parse(data));
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api_oxygen_kerela", (req, res) => {
  try {
    fs.readFile(`./jsonFiles/kerela.json`, "utf-8", (error, data) => {
      res.send(JSON.parse(data));
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api_oxygen_delhi", (req, res) => {
  try {
    fs.readFile(`./jsonFiles/delhi.json`, "utf-8", (error, data) => {
      res.send(JSON.parse(data));
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api_oxygen_chattisgarh", (req, res) => {
  try {
    fs.readFile(`./jsonFiles/chattisgarh.json`, "utf-8", (error, data) => {
      res.send(JSON.parse(data));
    });
  } catch (error) {
    console.log(error);
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
