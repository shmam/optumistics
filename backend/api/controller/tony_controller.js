var config = require('../../config.js') 
 
 var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
+ config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';


//TESTED AND PASSED
function insert_ActivatedNFC_Patient( patient_id, room_id, appointment_id, nfc_id){
	//nullable values are room_id
	//check if any non nullable values are null
	if(patient_id!= null && appointment_id != null && nfc_id != null){
		if((room_id==null || typeof room_id=="number") && typeof patient_id=="number" && typeof appointment_id=="number" && typeof nfc_id=="number"){
			db.open(cn, function(err) {
				if (err)
					return console.log(err);
				else
					var final_room_id=room_id
					if(room_id!=null) 
						final_room_id= "'"+room_id.toString() +"'"

					db.query("INSERT INTO ActivatedNFC_Patient (patient_id, room_id, appt_id, nfc_id) VALUES ("+ patient_id.toString()+","+ final_room_id+","+ appointment_id.toString()+","+nfc_id.toString()+")", function(err, data) {
						
						if (err)
							console.log(err);
						else
							console.log("Successful insertion into Activated NFC Patient table")
					})

			});
			
		}else
			console.log("Unsuccessful insertion into Activated NFC Patient table. One of these values is incorrect type")
	}else
		console.log("Unsuccessful insertion into Activated NFC Patient table. One or more of these values are null")
}

//TESTED AND PASSED
function insert_ActivatedNFC_Provider( provider_id, room_id, nfc_id){
	//nullable values are room_id
	//check if any non nullable values are null
	if(provider_id!= null && nfc_id != null){
		if((room_id==null || typeof room_id=="number") && typeof provider_id=="number"  && typeof nfc_id=="number"){
			db.open(cn, function(err) {
				if (err)
					return console.log(err);
				else
					var final_room_id=room_id
					if(room_id!=null) 
						final_room_id= "'"+room_id.toString() +"'"

					db.query("INSERT INTO ActivatedNFC_Provider (provider_id, room_id, nfc_id) VALUES ("+ provider_id.toString()+","+ final_room_id+","+nfc_id.toString()+")", function(err, data) {
						
						if (err)
							console.log(err);
						else
							console.log("Successful insertion into Activated NFC Provider table")
					})

			});
			
		}else
			console.log("Unsuccessful insertion into Activated NFC Provider table. One of these values is incorrect type")
	}else
		console.log("Unsuccessful insertion into Activated NFC Provider table. One or more of these values are null")
}

//TESTED AND PASSED
function insert_Person_Type(person_type_name){
	if(person_type_name!= null){
		if(typeof person_type_name=="string"){
			db.open(cn, function(err) {
				if (err)
					return console.log(err);
				else
					db.query("SELECT * FROM Person_Type WHERE person_type_name='"+person_type_name+"'", function(err, data) {
						
						if (err)
							console.log(err);
						else
							if(data.length>0){
								console.log("Unsuccessful insertion into Person Type table. The Person type name must be unique.")
							}else
								db.query("INSERT INTO Person_Type VALUES('"+person_type_name+"')", function(err, data) {
									
									if (err)
										console.log(err);
									else
										console.log("Successful insertion into Person Type table")
								})
					})
			});
		}else
			console.log("Unsuccessful insertion into Person Type table. Person type name entered is not a string")
	}else
		console.log("Unsuccessful insertion into Person Type table. Person type name null")
}

function insert_Status(status_name){
	if(status_name!= null){
		if(typeof status_name=="string"){
			db.open(cn, function(err) {
				if (err)
					return console.log(err);
				else
					db.query("SELECT * FROM Status WHERE status_name='"+status_name+"'", function(err, data) {
						
						if (err)
							console.log(err);
						else
							if(data.length>0){
								console.log("Unsuccessful insertion into Status table. The Status name must be unique.")
							}else
								db.query("INSERT INTO Status VALUES('"+status_name+"')", function(err, data) {
									
									if (err)
										console.log(err);
									else
										console.log("Successful insertion into Status table")
								})
					})
			});
		}else
			console.log("Unsuccessful insertion into NFC Status table. NFC Status name entered is not a string")
	}else
		console.log("Unsuccessful insertion into NFC Status table. NFC Status name null")
}




// TESTED AND DONE
module.exports = {
    getTimeEachDoctor_RT,
    getTimeAllDoctors_RT,
    getTimeEachDoctorDates_C,
    getTimeAllDoctorsDates_C,
    insert_Appointment_Type,
	insert_Question,
	insert_Survey_Activity,
	insert_Action_Performed,
	insert_ActivatedNFC_Patient,
	insert_ActivatedNFC_Provider,
	insert_person_type,
    insert_Status
}