var express = require('express'),
  app = express(),

  port = process.env.PORT || 8000,

  bodyParser = require('body-parser');
  
var config = require('./backend/config.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.set('views', __dirname )
// var engines = require('consolidate');

// app.engine('html', engines.mustache);
// app.set('view engine', 'html');
// app.get('/', function(req, res) {
//   res.render('index.html');  
// });

const path  = require('path');
const VIEWS = path.join(__dirname,"backend","SampleConnection");
console.log(__dirname+ "HELLO THIS IS THE LOG")

// In your route handlers:

const VIEWS2 = path.join(__dirname,"data_portal");

app.get('/', function(req, res) {
  res.sendFile('connect.html', { root : VIEWS });
});

app.get('/jquery.js', function(req, res) {
  res.sendFile('jquery.js', { root : __dirname });
});

app.get('/data_portal', function(req, res) {
  res.sendFile('neoStats.html', { root : VIEWS2 });
});

const VIEWS3 = path.join(__dirname,"data_portal","js");
const dashboard_js = path.join(__dirname,"dashboard","js");

const VIEWS4 = path.join(__dirname,"data_portal","css");
const images = path.join(__dirname,"data_portal","img");

const dash_image= path.join(__dirname,"dashboard","img");
const dashboard = path.join(__dirname,"dashboard");
const dashboard_phone = path.join(__dirname,"dashboard","img");

app.get('/js/basecase.js', function(req, res) {
  res.sendFile('baseCase.js', { root : dashboard_js });
});

app.get('/img/tPhone.png', function(req, res) {
  res.sendFile('tPhone.png', { root : dash_image });
});

app.get('/img/optum1.jpg', function(req, res) {
  res.sendFile('optum1.jpg', { root : dash_image });
});

app.get('/landingpage.html', function(req, res) {
  res.sendFile('landingpage.html', { root : dashboard });
});

app.get('/data_portal/js', function(req, res) {
  res.sendFile('stats.js', { root : VIEWS3 });
});

app.get('/dashboard', function(req, res) {
  res.sendFile('dayDash.html', { root : dashboard });
});

app.get('/data_portal/css', function(req, res) {
  res.sendFile('stats.css', { root : VIEWS4 });
});

app.get('/data_portal/optumImg', function(req, res) {
  res.sendFile('optum1.jpg', { root : images });
});



var routes = require('./backend/api/routes/routes.js');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

routes(app);


 var db = require('mysql')
 var cn = db.createConnection({
  host: "amazondash-tdp.cps5ypxg9leo.us-east-1.rds.amazonaws.com",
  user: "optumistics",
  password: "password",
  database: "optumistics"
});;



app.listen(port);

module.exports = {
    db,
    cn
}

function run(){
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

  console.log("bruhhh")
    var xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", "http://applicationDashboard.us-east-1.elasticbeanstalk.com/queue/text_alert", true);
    xhttp.send();
}
setInterval(run,10000);

console.log('RESTful API server started on: ' + port);