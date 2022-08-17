const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res) {

  const query = req.body.cityName;
  const apiKey = "779ed2fa86a431065411d589ceae3c46";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {

    response.on("data", function(data) {
      var weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";
      res.write("<p> The weather currently is " + weatherDescription + "!</p>");
      res.write("<h1>The temperature of "+ query + " is " + temp + " degree Celcius !</h1>");
      res.write("<img src = " + imageURL + ">");
      res.send();
    });
  });
});







app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
