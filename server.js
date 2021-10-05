var express = require('express');
var app = express();

const months = require('./months');
const weekdays = require('./weekdays');

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req,res) {
  const datestring = req.params.date;
  const date = new Date(datestring);
  const unix = date.getTime();
  const utc = `${weekdays.get(date.getDay())}, ${date.getDate()+1} ${months.get(date.getMonth())} ${date.getFullYear()} 00:00:00 GMT`;

  res.json({unix: unix, utc:utc})
})

function checkDate(date_string){

}

function dateToUTC(date){

}

var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
