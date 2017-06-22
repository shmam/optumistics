const getController = require('./getController.js');

var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
+ config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';