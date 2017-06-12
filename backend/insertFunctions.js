var server='DBSED3646.ms.ds.uhc.com'
var driver='{ODBC Driver 13 for SQL Server}'
var database= 'SQUAD_DB'
	
var db = require('odbc')(), 
    cn = 'DRIVER='+driver+';PORT=1433;SERVER='+server+';PORT=1443;DATABASE='+database+';Trusted_Connection=yes';


//TESTED AND WORKS 
function insert_Appointment_Type(appointment_name, appointment_duration){
     if(typeof appointment_name === 'string' && typeof appointment_duration === 'number'){
        db.open(cn, function (err) {
            if (err) return console.log(err);
            db.query("INSERT INTO Appointment_Type VALUES ('"+ appointment_name +"'," + appointment_duration.toString() + ")", function (err) {
                if (err) console.log(err);
                else console.log("Sucessful insertion into Appointment_Type ")
            //db.close();
            });
        });
    }
    else{ 
        console.log("Invalid Argument type for appointment_name or appointment_duration");
    }
}

function insert_Person_Type(person_type_name){
    if(typeof person_type_name === 'string'){
        db.open(cn, function (err) {

        });
    }
}
