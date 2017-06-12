var server='DBSED3646.ms.ds.uhc.com'
var driver='{ODBC Driver 13 for SQL Server}'
var database= 'SQUAD_DB'
	
var db = require('odbc')(), 
    cn = 'DRIVER='+driver+';PORT=1433;SERVER='+server+';PORT=1443;DATABASE='+database+';Trusted_Connection=yes';

db.open(cn, function (err) {
	if (err) return console.log(err);
	  

    db.query('SELECT * FROM ROOM', function (err, data) {
        if (err) console.log(err);
    
        console.log(data);
 
        db.close(function () {
            console.log('done');
        });
    });
});

