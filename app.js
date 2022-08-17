const express = require("express");
const app = express();
const https = require("https");

app.get("/", function(req,res) {

  const url = "https://api.openweathermap.org/data/2.5/weather?lat=18.516726&lon=73.856255&appid=779ed2fa86a431065411d589ceae3c46"
  https.get(url, function(response) {
    console.log(response);
  });
  res.send("Server is Up and running !")
})

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
