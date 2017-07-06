var express = require('express'),
  app = express(),

  port = process.env.PORT || 8000,

  bodyParser = require('body-parser');
  
var config = require('./config.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path  = require('path');
const VIEWS = path.join(__dirname, "SampleConnection");

app.get('/', function(req, res) {
  res.sendFile('index.html', { root : VIEWS });
});


var routes = require('./api/routes/routes.js');

routes(app);

app.listen(port);

module.exports = {
    db,
    cn
}


console.log('RESTful API server started on: ' + port);