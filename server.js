var express = require('express');
var app = express();
const moment = require('moment');
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
  const dateparam = req.params.date;
  let date;
  let unix;

  if(isValidDate(dateparam)){
    date = new Date(dateparam);
    unix = date.getTime();
  }else{

    if(isNaN(dateparam)){
      return res.json({ error : "Invalid Date" });
    }

    unix = dateparam;
    date = new Date(unix);
  }

  const weekday = date.getDay();
  const monthday = date.getDate()+1
  const monthnumber = date.getMonth();
  const year = date.getFullYear();

  const utc = `${weekdays.get(weekday)}, ${monthday} ${months.get(monthnumber)} ${year} 00:00:00 GMT`;
  
  res.json({
    unix: unix, 
    utc:utc
  })
  
})

function isValidDate(date_string){
  return moment(date_string, "YYYY-MM-DD", true).isValid();
}

var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
