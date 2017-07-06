var config = require('../../config.js') 
 
var db = require('mysql')
 var cn = cn.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database

});;

cn.connect();

function insert_Person_Type(req, res) {
	if (req.params.person_type_name != null) {
		
		cn.query("SELECT * FROM Person_Type WHERE person_type_name = '" + req.params.person_type_name + "'", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				if (data.length > 0) {
					console.log("Unsuccessful insertion into Person Type table. The Person type name must be unique");
					res.send("Unsuccessful insertion into Person Type table. The Person type name must be unique");
				}
				else {
					cn.query("INSERT INTO Person_Type (person_type_name) VALUES ('" + req.params.person_type_name + "')", function (err, data2) {
						if (err) {
							console.log(err);
							res.send(err);
						}
						else {
							console.log("Successful insertion into Person Type Table");
							res.send("Successful insertion into Person Type Table");
						}
					});
				}
			}
		});
		
	}
	else {
		console.log("Unsuccessful insertion into Person_Type table. Person_Type_Name is null");
		res.send("Unsuccessful insertion into Person_Type table. Person_Type_Name is null");
	}
}

function insert_Question(req, res) {
	if (req.params.question != null) {
		
		cn.query("INSERT INTO Question (question) VALUES ('" + req.params.question + "')", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				console.log("Successful insertion into Question Table");
				res.send("Successful insertion into Question Table");
			}
		});
		
	}
	else {
		console.log("Unsuccessful insertion into Question table. Question cannot be null");
		res.send("Unsuccessful insertion into Question table. Question cannot be null");
	}
}

function insert_Flag_Color(req, res) {
	if (req.params.flag_color_name != null) {
		
		cn.query("INSERT INTO Flag_Color (flag_color_name) VALUES ('" + req.params.flag_color_name + "')", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				console.log("Successful insertion into Flag Color Table");
				res.send("Successful insertion into Flag Color Table");
			}
		});
		
	}
	else {
		console.log("Unsuccessful insertion into Flag Color table. Flag color cannot be null");
		res.send("Unsuccessful insertion into Flag Color table, flag color cannot be null");
	}
}

function insert_Appointment_Type(req, res) {
	if (req.params.appointment_duration == null && req.params.appointment_name != null) {
		
		cn.query("INSERT INTO Appointment_Type (appointment_name,appointment_duration) VALUES ('" + req.params.appointment_name + "', null)", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				console.log("Successful insertion into Appointment Type Table");
				res.send("Successful insertion into Appointment Type Table");
			}
		});
		
	}
	else if (req.params.appointment_duration != null && req.params.appointment_name != null) {
		
		cn.query("INSERT INTO Appointment_Type (appointment_name,appointment_duration) VALUES ('" + req.params.appointment_name + "'," + req.params.appointment_duration + ")", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				console.log("Successful insertion into Appointment Type Table");
				res.send("Successful insertion into Appointment Type Table");
			}
		});
		
	}
	else {
		console.log("Invalid Argument type for appointment_name or appointment_duration");
		res.send("Invalid Argument type for appointment_name or appointment_duration");
	}
}

function insert_Status(req, res) {
	if (req.params.status_name != null) {
		
		cn.query("SELECT * FROM Status WHERE status_name = '" + req.params.status_name + "'", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				if (data.length > 0) {
					console.log("Unsuccessful insertion into Status table. The status name must be unique");
					res.send("Unsuccessful insertion into Status table. The status name must be unique");
				}
				else {
					cn.query("INSERT INTO Status (status_name) VALUES ('" + req.params.status_name + "')", function (err, data2) {
						if (err) {
							console.log(err);
							res.send(err);
						}
						else {
							console.log("Successful insertion into Status Table");
							res.send("Successful insertion into Status Table");
						}
					});
				}
			}
		});
		
	}
	else {
		console.log("Unsuccessful insertion into Status table. Status_Name is null");
		res.send("Unsuccessful insertion into Status table. Status_Name is null");
	}
}

function insert_NFC_Bracelet(req, res) {
	if (req.params.provider_nfc != null && req.params.status_id != null && (req.params.provider_nfc == '0' || req.params.provider_nfc == '1') && req.params.nfc_hex != null) {
		
		cn.query("INSERT INTO NFC_Bracelet (provider_nfc,nfc_hex,status_id) VALUES (" +req.params.provider_nfc +",'" +req.params.nfc_hex +"'," +req.params.status_id + ")", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				console.log("Successful insertion into NFC Bracelet Table");
				res.send("Successful insertion into NFC Bracelet Table");
			}
		});
		
	}
	else {
		console.log("Unsuccessful insertion into NFC Bracelet table. Status id entered is null or provider_nfc is not 0 or 1");
		res.send("Unsuccessful insertion into NFC Bracelet table. Status id entered is null or provider_nfc is not 0 or 1");
	}
}

function insert_Room(req, res) {
	if (req.params.room_name != null && req.params.status_id != null) {
		
		cn.query("INSERT INTO Room (room_name, status_id) VALUES ('" + req.params.room_name + "'," + req.params.status_id + ")", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				console.log("Successful insertion into Room Table");
				res.send("Successful insertion into Room table");
			}
		});
		
	}
	else {
		console.log("Unsuccessful insertion into Room table. One or more of these values are null");
		res.send("Unsuccessful insertion into Room table. One or more of these values are null");
	}
}

function insert_Survey_Activity(req, res) {
	if (req.params.patient_id != null && req.params.rating != null && req.params.rating_date != null && req.params.question_id != null) {
		
		cn.query("INSERT INTO Survey_Activity (patient_id, rating, rating_date, question_id) VALUES (" + req.params.patient_id + "," + req.params.rating + ",'" + req.params.rating_date + "'," + req.params.question_id + ")", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				console.log("Successful insertion into Survey Activity Table");
				res.send("Successful insertion into Survey Activity Table");
			}
		});
		
	}
	else {
		console.log("Unsuccessful insertion into Survey Activity table. One or more of these values are null");
		res.send("Unsuccessful insertion into Survey Activity table. One or more of these values are null");
	}	
}

function insert_Patient_Information(req, res) {
	if (req.params.patient_first_name != null && req.params.patient_last_name != null && req.params.person_type_id != null) {
				
		cn.query("INSERT INTO Patient_Information (patient_first_name, patient_last_name,person_type_id) VALUES ('" + req.params.patient_first_name + "','" + req.params.patient_last_name + "'," + req.params.person_type_id + ")", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				console.log("Successful insertion into Patient Information Table");
				res.send("Successful insertion into Patient Information Table");
			}
		});
	}
	else {
		console.log("Unsuccessful insertion into Patient Information table. One or more of these non-nullable values are null");
		res.send("Unsuccessful insertion into Patient Information table. One or more of these non-nullable values are null");
	}
}

function insert_Provider_Information(req, res) {
	if (req.params.provider_first_name != null && req.params.provider_last_name != null && req.params.person_type_id != null && req.params.provider_username != null && req.params.provider_password != null && req.params.status_id != null) {
		
		cn.query("SELECT provider_username FROM Provider_Information WHERE provider_username ='" + req.params.provider_username + "'", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			} else if (data.length == 0) {
				cn.query("INSERT INTO Provider_Information (provider_first_name, provider_last_name, provider_username, provider_password, person_type_id, status_id) VALUES ('"
				+ req.params.provider_first_name + "','" + req.params.provider_last_name + "','" + req.params.provider_username + "','" + req.params.provider_password + "'," + req.params.person_type_id + "," + req.params.status_id + ")", function (err, data) {
					if (err) {
						console.log(err);
						res.send(err);
					}
					else {
						console.log("Successful insertion into Provider Information Table");
						res.send("Successful insertion into Provider Information Table");
					}
				});
			}
			else {
				console.log("The username must be unique");
				res.send("The username must be unique");
			}
		});
		
	}
	else {
		console.log("Unsuccessful insertion into Provider Information table. One of these values is null");
		res.send("Unsuccessful insertion into Provider Information table. One of these values is null");
	}
}

function insert_Actions(req, res) {
	if (req.params.action_name != null && req.params.flag_color_id != null && req.params.button_label != null && req.params.action_duration != null && req.params.status_id != null) {
		
		cn.query("SELECT action_id FROM Actions WHERE action_name='" + req.params.action_name + "'", function (err, data) {
			if (err) {
				console.log(err);
				res.send("Unsuccessful insertion into Actions table. Action name must be unique.");
			}
			else {
				if (data.length > 0) {
					console.log("Unsuccessful insertion into Actions table. Action name must be unique.");
					res.send("Unsuccessful insertion into Actions table. Action name must be unique.");
				}
				else {
					var final_icon = req.params.icon;
					if (req.params.icon != null) {
						final_icon = "'" + req.params.icon + "'";
					}
					cn.query("INSERT INTO Actions (action_name, flag_color_id,button_label, action_duration, status_id, icon) VALUES ('" + req.params.action_name + "','" + req.params.flag_color_id + "','" + req.params.button_label + "'," + req.params.action_duration + "," + req.params.status_id + "," + final_icon + ")", function (err, data) {
						if (err) {
							console.log(err);
							res.send(err)
						}
						else {
							console.log("Successful insertion into Actions Table");
							res.send("Successful insertion into Actions Table");
						}
					});
				}
			}
		});
			
	}
	else {
		console.log("Unsuccessful insertion into Actions table. One or more of these non-nullable values are null");
		res.send("Unsuccessful insertion into Actions table. One or more of these non-nullable values are null");
	}
}

function insert_ActivatedNFC_Provider(req, res) {
	if (req.params.provider_id != null && req.params.nfc_id != null) {
		
		cn.query("INSERT INTO ActivatedNFC_Provider (provider_id, room_id, nfc_id) VALUES ('" + req.params.provider_id + "','" + req.params.room_id + "','" + req.params.nfc_id + "')", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				console.log("Successful insertion into ActivatedNFC Provider Table");
				res.send("Successful insertion into ActivatedNFC Provider Table");
			}
		});
		
	}
	else {
		console.log("Unsuccessful insertion into ActivatedNFC_Provider table. One of the parameters is null");
		res.send("Unsuccessful insertion into ActivatedNFC_Provider table. One of the parameters is null");
	}
}

function insert_Appointment(req, res) {
	if (req.params.patient_id != null && req.params.status_id != null && req.params.appointment_date != null) {
	
		cn.query("INSERT INTO Appointment (start_time, end_time, patient_id, appointment_type_id, status_id, appointment_date) VALUES ('" + req.params.start_time + "','" + req.params.end_time + "'," + req.params.patient_id
			+ "," + req.params.appointment_type_id + "," + req.params.status_id + ",'" + req.params.appointment_date + "')", function (err, data) {
				if (err) {
					console.log(err);
					res.send(err);
				}
				else {
					console.log("Successful insertion into Appointment Table");
					res.send("Successful insertion into Appointment Table");
				}
		});
		
	}
	else {
		console.log("Unsuccessful insertion into Status table. One of the values is null");
		res.send("Unsuccessful insertion into Status table. One of the values is null");
	}
}

//TESTED AND PASSED
function insert_ActivatedNFC_Patient(req, res) {
	if (req.params.appointment_id != null && req.params.nfc_id != null) {
	
		cn.query("INSERT INTO ActivatedNFC_Patient (room_id, appointment_id, nfc_id) VALUES (" + req.params.room_id + ","
		+ req.params.appointment_id + "," + req.params.nfc_id + ")", function (err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				console.log("Successful insertion into Activated NFC Patient Table");
				res.send("Successful insertion into Activated NFC Patient Table");
			}
		});
		
	}
	else {
		console.log("Unsuccessful insertion into Activated NFC Patient table. One or more of these values are null");
		res.send("Unsuccessful insertion into Activated NFC Patient table. One or more of these values are null");
	}
}

function insert_Action_Performed(req,res){
	if( req.params.action_id != null && req.params.start_time != null && req.params.end_time != null && req.params.action_date != null){
		
		cn.query("INSERT INTO Action_Performed (action_id, room_id, appointment_id, start_time, end_time, provider_id, action_date) VALUES ("
		+req.params.action_id +"," +req.params.room_id +"," +req.params.appointment_id +",'" +req.params.start_time +"','" +req.params.end_time +"',"
		+req.params.provider_id +",'" +req.params.action_date +"')", function(err, data) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				console.log("Successful insertion into Action Performed Table");
				res.send("Successful insertion into Action Performed Table");
			}
		});
		
	}
	else {
		console.log("Unsuccessful insertion into Action Performed table. One or more of these values are null");
		res.send("Unsuccessful insertion into Action Performed table. One or more of these values are null");
	}
}


module.exports = {
	insert_Person_Type,
	insert_Question,
	insert_Flag_Color,
	insert_Appointment_Type,
    insert_Status,
	insert_NFC_Bracelet,
	insert_Room,
	insert_Survey_Activity,
	insert_Patient_Information,
	insert_Provider_Information,
	insert_Actions,
	insert_ActivatedNFC_Provider,
	insert_Appointment,
	insert_ActivatedNFC_Patient,
	insert_Action_Performed,
}