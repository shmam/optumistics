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

app.get('/backend/SampleConnection/jquery', function(req, res) {
  res.sendFile('jquery.js', { root : VIEWS });
});

app.get('/data_portal', function(req, res) {
  res.sendFile('neoStats.html', { root : VIEWS2 });
});



var routes = require('./backend/api/routes/routes.js');


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


console.log('RESTful API server started on: ' + port);