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

//TESTED AND PASSED
function insert_Question(question) {
	if (question != null && typeof question == "string") {
		db.open(cn, function(err) {
			if (err)
				return console.log(err);
			else
				db.query("INSERT INTO Question(question) VALUES('"+ question + "')", function(err, data) {
					if (err)
						console.log(err);
					else
						console.log("Successful insertion into Question table")
				})

		});
	} else
		console.log("Unsuccessful insertion into Question table. The question name is incorrect type")

}

//TESTED AND PASSED
function insert_Survey_Activity(patient_id, rating, rating_date, question_id){
	if(patient_id != null && rating != null && rating_date != null && question_id != null){
		if(typeof patient_id=="number" && typeof rating=="number" && typeof rating_date=="string" && typeof question_id=="number"){
			
			db.open(cn, function(err) {
				if (err)
					return console.log(err);
				else
					db.query("INSERT INTO Survey_Activity (patient_id, rating, rating_date, question_id) VALUES (" + patient_id.toString() +","+rating.toString()+",'"+rating_date  +"',"+ question_id.toString()+")", function(err, data) {
						
						if (err)
							console.log(err);
						else
							console.log("Successful insertion into Survey Activity table")
					})

			});
			
		}else
			console.log("Unsuccessful insertion into Survey Activity table. One of these values is incorrect type")
		
	}else
		console.log("Unsuccessful insertion into Survey Activity table. One or more of these values are null")		
}

//TESTED AND PASSED
function insert_Action_Performed(action_id, action_date, room_id, patient_id, time_taken, provider_id){
	//nullable values are room_id, patient_id, provider_id
	if( action_id!= null && time_taken!= null && action_date!= null){
		if((patient_id== null || typeof patient_id=="number") && (room_id== null || typeof room_id=="number") && (provider_id ==null || typeof provider_id=="number" ) && typeof time_taken=="number" && typeof action_date=="string" && typeof action_id=="number"){
			
			db.open(cn, function(err) {
				if (err)
					return console.log(err);
				else
					var final_room_id=room_id
					var final_provider_id=provider_id
					var final_patient_id= patient_id
					if(room_id!=null) 
						final_room_id= "'"+room_id.toString() +"'"
					if(provider_id!=null) 
						final_provider_id="'"+provider_id.toString()+"'"
					if(patient_id!=null) 
						final_patient_id="'"+patient_id.toString()+"'"

					db.query("INSERT INTO Action_Performed (action_id, action_date, room_id, patient_id, time_taken, provider_id) VALUES (" + action_id.toString()+ ",'" +action_date+"',"+ final_room_id+","+final_patient_id+","+time_taken.toString()+","+final_provider_id+")", function(err, data) {
						
						if (err)
							console.log(err);
						else
							console.log("Successful insertion into Action Performed table")
					})

			});
		}
		else
			console.log("Unsuccessful insertion into Action Performed table. One of these values is incorrect type")
		
	}else
		console.log("Unsuccessful insertion into Action Performed table. One or more of these values are null")
	
}

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
function insert_person_type(person_type_name){
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

//TESTED AND PASSED
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

//TESTED AND PASSED
function insert_Room(room_name, status_id){
	if(room_name!= null && status_id!= null){
		if(typeof room_name =="string" && typeof status_id =="number"){
			db.open(cn, function(err) {
				if (err)
					return console.log(err);
				else

					db.query("INSERT INTO Room (room_name, status_id) VALUES ('"+ room_name+"',"+ status_id.toString()+")", function(err, data) {
						
						if (err)
							console.log(err);
						else
							console.log("Successful insertion into Room table")
					})

			});
		}else
			console.log("Unsuccessful insertion into Room table. One of these values is incorrect type")
	}else
		console.log("Unsuccessful insertion into Room table. One or more of these values are null")
}

//TESTED AND PASSED
function insert_NFC_Bracelet(status_id){
	if(status_id!=null){
		if(typeof status_id=="number"){
			db.open(cn, function(err) {
				if (err)
					return console.log(err);
				else

					db.query("INSERT INTO NFC_Bracelet (status_id) VALUES ("+ status_id.toString()+")", function(err, data) {
						
						if (err)
							console.log(err);
						else
							console.log("Successful insertion into NFC Bracelet table")
					})

			});
		}else
			console.log("Unsuccessful insertion into NFC Bracelet table. Status id entered is not a number")
	}else
		console.log("Unsuccessful insertion into NFC Bracelet table. Status id entered is null")
}

//TESTED AND PASSED
function insert_Patient_Information(patient_first_name, patient_last_name, patient_gender,person_type_id){
	if(patient_first_name!= null && patient_last_name!= null && person_type_id != null){
		if( typeof patient_first_name=="string"&& typeof patient_last_name =="string" && (patient_gender==null || typeof patient_gender =="string") && typeof person_type_id=="number"){
			db.open(cn, function(err) {
				if (err)
					return console.log(err);
				else
					var final_patient_gender=patient_gender
					if(patient_gender !=null) 
						final_patient_gender= "'"+patient_gender +"'"

					db.query("INSERT INTO Patient_Information (first_name, last_name, gender,person_type_id) VALUES ('"+ patient_first_name+"','"+ patient_last_name+"',"+final_patient_gender+","+person_type_id.toString()+")", function(err, data) {
						
						if (err)
							console.log(err);
						else
							console.log("Successful insertion into Patient Information table")
					})

			});
		}else
			console.log("Unsuccessful insertion into Patient Information table. One of these values is incorrect type")
	}else{
		console.log("Unsuccessful insertion into Patient Information table. One or more of these non-nullable values are null")
	}
}

//TESTED AND PASSED
function insert_Provider_Information(provider_first_name, provider_last_name, provider_gender,username,password,person_type_id, status_id){
	if(provider_first_name!= null && provider_last_name!= null && person_type_id != null && username!= null && password != null && status_id!= null){
		if( typeof provider_first_name=="string"&& typeof provider_last_name =="string" && (provider_gender==null || typeof provider_gender =="string") && typeof person_type_id=="number" && typeof username=="string" && typeof password=="string" && typeof status_id=="number"){
			db.open(cn, function(err) {
				if (err)
					return console.log(err);
				else
					var final_provider_gender=provider_gender
					if(provider_gender !=null) 
						final_provider_gender= "'"+provider_gender +"'"

					db.query("INSERT INTO Provider_Information (first_name, last_name, gender,username,password,person_type_id,status_id) VALUES ('"+ provider_first_name+"','"+ provider_last_name+"',"+final_provider_gender+",'"+ username+"','"+ password+"',"+person_type_id.toString()+","+status_id.toString()+")", function(err, data) {
						
						if (err)
							console.log(err);
						else
							console.log("Successful insertion into Provider Information table")
					})

			});
		}else
			console.log("Unsuccessful insertion into Provider Information table. One of these values is incorrect type")
	}else{
		console.log("Unsuccessful insertion into Provider Information table. One or more of these non-nullable values are null")
	}
}

//TESTED AND PASSED
function insert_Actions(action_name, flag_color,button_label, action_duration, status_id, icon){
	if(action_name!= null &&  flag_color != null && button_label!= null &&  action_duration!= null &&  status_id!= null ){
		if( typeof action_name =="string" && typeof flag_color =="string" && typeof button_label =="string" &&  typeof action_duration =="number" &&  typeof status_id =="number" && (typeof icon =="string" || icon==null)){
			db.open(cn, function(err) {
				if (err)
					return console.log(err);
				else
					db.query("SELECT action_id FROM Actions WHERE action_name='"+action_name+"'", function(err, data) {
						
						if (err)
							console.log(err);
						else{

						
							if(data.length>0){
								console.log("Unsuccessful insertion into Actions table. Action name must be unique.")
							}else{
								console.log("here")
								var final_icon=icon
									if(icon !=null) 
										final_icon= "'"+icon +"'"

									db.query("INSERT INTO Actions (action_name, flag_color,button_label, action_duration, status_id, icon) VALUES ('"+ action_name+"','"+ flag_color+"','"+button_label+"',"+ action_duration+","+ status_id.toString()+","+final_icon+")", function(err, data) {
										
										if (err)
											console.log(err);
										else
											console.log("Successful insertion into Actions table")
									})
							}
						}							
					})
			});
		}else
			console.log("Unsuccessful insertion into Actions table. One of these values is incorrect type")	
	}else
		console.log("Unsuccessful insertion into Actions table. One or more of these non-nullable values are null")
}


module.exports = {
	insert_Appointment_Type,
	insert_Question,
	insert_Survey_Activity,
	insert_Action_Performed,
	insert_ActivatedNFC_Patient,
	insert_ActivatedNFC_Provider,
	insert_person_type,
	insert_Status,
	insert_Room,
	insert_NFC_Bracelet,
	insert_Patient_Information,
	insert_Provider_Information,
	insert_Actions
}
