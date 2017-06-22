var express = require('express'),
  app = express(),
  port = process.env.PORT || 443,

  bodyParser = require('body-parser');
  
var config = require('./config.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/routes.js');


routes(app);


 var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
+ config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';

app.listen(port);

module.exports = {
    db,
    cn
}


console.log('RESTful API server started on: ' + port);