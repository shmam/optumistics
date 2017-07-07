var express = require('express'),
  app = express(),

  port = process.env.PORT || 8000,

  bodyParser = require('body-parser');
  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path  = require('path');
const VIEWS = path.join(__dirname, "backend","SampleConnection");

app.get('/', function(req, res) {
  res.sendFile('connect.html', { root : VIEWS });
});


var routes = require('./backend/api/routes/routes.js');

routes(app);

app.listen(port);

module.exports = {
    db,
    cn
}


console.log('RESTful API server started on: ' + port);