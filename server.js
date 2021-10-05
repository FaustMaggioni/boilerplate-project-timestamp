const express = require('express');
const app = express();

const moment = require('moment');

const months = require('./months');
const weekdays = require('./weekdays');

const cors = require('cors');
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

  try {
    const {date, unix} = getDateAndUnix(dateparam);
    const weekday = date.getDay();
    const monthday = date.getDate()+1
    const monthnumber = date.getMonth();
    const year = date.getFullYear();
  
    const utc = `${weekdays.get(weekday)}, ${monthday} ${months.get(monthnumber)} ${year} 00:00:00 GMT`;
    
    res.json({
      unix: unix, 
      utc: utc
    })

  } catch (error) {
    res.json({error: error.message})
  }

})

function isValidDate(date_string){
  return moment(date_string, "YYYY-MM-DD", true).isValid();
}

function getDateAndUnix(dateparam){  
  let date;
  let unix;

  if(isValidDate(dateparam)){
    date = new Date(dateparam);
    unix = date.getTime();
  }else{
    if(isNaN(dateparam)){
      throw new Error("Invalid date")
    }
    unix = parseFloat(dateparam);
    date = new Date(unix);
  }
  return {date, unix}
}

const listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
