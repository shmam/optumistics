var config = require('./config.js')

var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
    + config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';

//ALRIGHT
//TESTED AND WORKS
function insert_Appointment_Type(appointment_name, appointment_duration){
	if(typeof appointment_name === 'string' && appointment_duration == null) {
		db.open(cn,function(err) {
			if(err) return console.log(err);
			db.query("INSERT INTO Appointment_Type VALUES ('" +appointment_name +"', null)", function(err) {
				if(err) console.log(err);
				else console.log("Successful insertion into Appointment_Type");
			});
		});
	}
    else if(typeof appointment_name === 'string' && typeof appointment_duration === 'number'){
        db.open(cn, function (err) {
            if (err) return console.log(err);
            db.query("INSERT INTO Appointment_Type VALUES ('"+ appointment_name +"'," + appointment_duration.toString() + ")", function (err) {
                if (err) console.log(err);
                else console.log("Successful insertion into Appointment_Type ")
            //db.close();
            });
        });
    }
    else{ 
        console.log("Invalid Argument type for appointment_name or appointment_duration");
    }
}