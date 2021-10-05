// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const months = require('./months');
const weekdays = require('./weekdays');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req,res) {
  const datestring = req.params.date;
  const date = new Date(datestring);
  console.log(date.getDay())
  const unix = date.getTime();
  const utc = `${weekdays.get(date.getDay())}, ${date.getDate()+1} ${months.get(date.getMonth())} ${date.getFullYear()} 00:00:00 GMT`;

  res.json({unix: unix, utc:utc})
})

function checkDate(date_string){

}

function dateToUTC(date){

}





// listen for requests :)
var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
