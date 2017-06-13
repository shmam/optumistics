var config = require('./backend/config.js')

var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
    + config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';


function testConnection(){
    db.open(cn, function (err) {
        if (err) return console.log(err);
        

        db.query('SELECT * FROM Question', function (err, data) {
            if (err) console.log(err);
        
            console.log(data);
    
            db.close(function () {
                console.log('done');
            });
        });
    });
}
 
module.exports = { 
    testConnection
}