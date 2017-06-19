var config = require('../../config.js') 
 
 var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
+ config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';


//TESTED AND PASSED
function insert_ActivatedNFC_Patient( req,res){
	//nullable values are room_id
	//check if any non nullable values are null
	if(req.params.patient_id!= null && req.params.appointment_id != null && req.params.nfc_id != null){
			db.open(cn, function(err) {
				if (err){
					console.log(err);
					res.send(err);
				}
				else{
					var final_room_id= req.params.room_id
					if(req.params.room_id!=null)
						final_room_id= "'"+req.params.room_id +"'"
										
					db.query("INSERT INTO ActivatedNFC_Patient (patient_id, room_id, appt_id, nfc_id) VALUES ("+ req.params.patient_id+","+ final_room_id+","+ req.params.appointment_id+","+req.params.nfc_id+")", function(err, data) {
						
						if (err){
							console.log(err);
							res.send(err)
						}
						else{
							console.log("Successful insertion into Activated NFC Patient table")
							res.send("Successful insertion into Activated NFC Patient table")
						}
					})
				}
			});		
	}else{
		console.log("Unsuccessful insertion into Activated NFC Patient table. One or more of these values are null")
		res.send("Unsuccessful insertion into Activated NFC Patient table. One or more of these values are null")

	}
}

//TESTED AND PASSED
function insert_NFC_Bracelet(req,res){
	if(req.params.status_id!=null){
		
			db.open(cn, function(err) {
				if (err)
					res.send(err);
				else{
					db.query("INSERT INTO NFC_Bracelet (status_id) VALUES ("+ req.params.status_id+")", function(err, data) {
						
						if (err){
							console.log(err);
							res.send(err);
						}else{
							res.send("Successful insertion into NFC Bracelet table");
						}		
					})
				}
			});
	
	}else{
		console.log("Unsuccessful insertion into NFC Bracelet table. Status id entered is null")
		res.send("Unsuccessful insertion into NFC Bracelet table. Status id entered is null")
	}		
}

// //TESTED AND PASSED
function insert_Patient_Information(req,res){
	if(req.params.patient_first_name!= null && req.params.patient_last_name!= null && req.params.person_type_id != null){
			db.open(cn, function(err) {
				if (err){
					console.log(err);
					res.send(err);
				}			
				else{
					var final_patient_gender=req.params.patient_gender;
					if(req.params.patient_gender !=null)
						final_patient_gender= "'"+req.params.patient_gender +"'";

					db.query("INSERT INTO Patient_Information (first_name, last_name, gender,person_type_id) VALUES ('"+ req.params.patient_first_name+"','"+ req.params.patient_last_name+"',"+final_patient_gender+","+req.params.person_type_id+")", function(err, data) {
						
						if (err){
							console.log(err);
							res.send(err)
						}		
						else
						{	console.log("Successful insertion into Patient Information table")
							res.send("Successful insertion into Patient Information table")
						}
					})
				}

			});
	
	}else{
		console.log("Unsuccessful insertion into Patient Information table. One or more of these non-nullable values are null")
		res.send("Unsuccessful insertion into Patient Information table. One or more of these non-nullable values are null")
		}
}

// //TESTED AND PASSED
function insert_Provider_Information(req,res){
	if(req.params.provider_first_name!= null && req.params.provider_last_name!= null && req.params.person_type_id != null && req.params.username!= null && req.params.password != null && req.params.status_id!= null){
			db.open(cn, function(err) {
				if (err){
					console.log(err);
					res.send(err)
				}
					
				else{
					var final_provider_gender=req.params.provider_gender
					if(req.params.provider_gender !=null) 
						final_provider_gender= "'"+req.params.provider_gender +"'"

					db.query("INSERT INTO Provider_Information (first_name, last_name, gender,username,password,person_type_id,status_id) VALUES ('"+ req.params.provider_first_name+"','"+ req.params.provider_last_name+"',"+final_provider_gender+",'"+ req.params.username+"','"+ req.params.password+"',"+req.params.person_type_id+","+req.params.status_id+")", function(err, data) {
						
						if (err){
							console.log(err);
							res.send(err)
						}
							
						else{

							console.log("Successful insertion into Provider Information table")
							res.send("Successful insertion into Provider Information table")
						}
					})
				}
			});
	}else{
		console.log("Unsuccessful insertion into Provider Information table. One of these values is null")
		res.send("Unsuccessful insertion into Provider Information table. One of these values is null")
	}
			
	
}

// //TESTED AND PASSED
function insert_Actions(req,res){
	if(req.params.action_name!= null &&  req.params.flag_color_id != null && req.params.button_label!= null &&  req.params.action_duration!= null &&  req.params.status_id!= null ){
			db.open(cn, function(err) {
				if (err){
					console.log(err);
					res.send(err)
				}			 
				else{
					db.query("SELECT action_id FROM Actions WHERE action_name='"+req.params.action_name+"'", function(err, data) {
						
						if (err){
							console.log(err);
							res.send("Unsuccessful insertion into Actions table. Action name must be unique.")
						}
							
						else{

							if(data.length>0){
								console.log("Unsuccessful insertion into Actions table. Action name must be unique.")
								res.send("Unsuccessful insertion into Actions table. Action name must be unique.")
							}else{
								console.log("here")
								var final_icon=req.params.icon
									if(req.params.icon !=null) 
										final_icon= "'"+req.params.icon +"'"

									db.query("INSERT INTO Actions (action_name, flag_color_id,button_label, action_duration, status_id, icon) VALUES ('"+ req.params.action_name+"','"+ req.params.flag_color_id+"','"+req.params.button_label+"',"+ req.params.action_duration+","+ req.params.status_id+","+final_icon+")", function(err, data) {
										
										if (err){
											console.log(err);
											res.send(err)
										}

										else{
											console.log("Successful insertion into Actions table")
											res.send("Successful insertion into Actions table")
										}
									})
								}
						}							
					})
				}
					
			});
	}else{
				console.log("Unsuccessful insertion into Actions table. One or more of these non-nullable values are null")
				res.send("Unsuccessful insertion into Actions table. One or more of these non-nullable values are null")

	}
}

function insert_Appointment_Type(req,res){
	if(req.params.appointment_duration == null && req.params.appointment_name != null) {
		db.open(cn,function(err) {
			if(err) return res.send(err);
			db.query("INSERT INTO Appointment_Type VALUES ('" + req.params.appointment_name +"', null)", function(err,data) {
				if(err) res.send(err);
				else res.send("Successful insertion into Appointment_Type");
			});
		});
	}
    else if(req.params.appointment_duration != null && req.params.appointment_name != null){
        db.open(cn, function (err) {
            if (err) return res.send(err);
            db.query("INSERT INTO Appointment_Type VALUES ('"+ req.params.appointment_name +"'," + req.params.appointment_duration + ")", function (err,data) {
                if (err) res.send(err);
                else res.send("Successful insertion into Appointment_Type");
            });
        });
    }
    else{ 
        res.send("Invalid Argument type for appointment_name or appointment_duration");
    }
}

// TESTED AND WORKS
function insert_Question(req,res) {
	if (req.params.question != null) {
		db.open(cn, function(err) {
			if (err) res.send(err);
			else db.query("INSERT INTO Question(question) VALUES('"+ req.params.question + "')", function(err, data) {
				if (err) res.send(err);	
				else res.send("Successful insertion into Question table" )	
			})
		});
	} else
		res.send("Unsuccessful insertion into Question table, Question cannot be null")

}

function insert_Flag_Color(req,res) {
	if (req.params.flag_color_name != null) {
		db.open(cn, function(err) {
			if (err) res.send(err);
			else db.query("INSERT INTO Flag_Color(flag_color_name) VALUES('"+ req.params.flag_color_name + "')", function(err, data) {
				if (err) res.send(err);	
				else res.send("Successful insertion into Flag Color table" )	
			})
		});
	} else
		res.send("Unsuccessful insertion into Flag Color table, flag color cannot be null")

}

//TESTED AND WORKS
function insert_Survey_Activity(req,res){
	if(req.params.patient_id != null && req.params.rating != null && req.params.rating_date != null && req.params.question_id != null){
		db.open(cn, function(err) {
			if (err) res.send(err);
			else db.query("INSERT INTO Survey_Activity (patient_id, rating, rating_date, question_id) VALUES (" + req.params.patient_id + ","+ req.params.rating+",'"+ req.params.rating_date  +"',"+ req.params.question_id+")", function(err, data) {
				if (err) res.send (err);
				else res.send("Successful insertion into Survey Activity table")
			})

		});
		
	}else
		res.send("Unsuccessful insertion into Survey Activity table. One or more of these values are null")		
}


function insert_Action_Performed(req,res){
	if( req.params.action_id != null && req.params.time_taken != null && req.params.action_date != null){
		db.open(cn, function(err) {
			if (err) res.send(err);
			else
				var final_room_id= req.params.room_id
				var final_provider_id=req.params.provider_id
				var final_patient_id= req.params.patient_id
				if(req.params.room_id!=null) 
					final_room_id=req.params.room_id
				if(req.params.provider_id!=null) 
					final_provider_id= req.params.provider_id
				if(req.params.patient_id!=null) 
					final_patient_id=req.params.patient_id

				db.query("INSERT INTO Action_Performed (action_id, action_date, room_id, patient_id, time_taken, provider_id) VALUES (" + req.params.action_id+ ",'" +req.params.action_date+"',"+ final_room_id+","+final_patient_id+","+req.params.time_taken+","+final_provider_id+")", function(err, data) {
					if (err) res.send(err);
					else res.send("Successful insertion into Action Performed table")
				})

		});
	}else
		res.send("Unsuccessful insertion into Action Performed table. One or more of these values are null")
}

function insert_Room(req,res){
	if(req.params.room_name!= null && req.params.status_id!= null){
		db.open(cn, function(err) {
			if (err) res.send(err);
			else db.query("INSERT INTO Room (room_name, status_id) VALUES ('"+ req.params.room_name+"',"+ req.params.status_id+")", function(err, data) {
				if (err) res.send(err);
				else res.send("Successful insertion into Room table")
			})
		});	
	}
	else res.send("Unsuccessful insertion into Room table. One or more of these values are null")
}

function insert_ActivatedNFC_Provider (req,res) {
	if(req.params.provider_id != null && req.params.nfc_id != null) {
		db.open(cn,function(err) {
			if(err) {
				return console.log(err);
			}
			else {
				db.query("INSERT INTO ActivatedNFC_Provider (provider_id, room_id, nfc_id) VALUES ('" +req.params.provider_id +"','" +req.params.room_id +"','" +req.params.nfc_id +"')", function(err,data) {
					if(err) {
						console.log(err);
						res.send(err);
					}
					else {
						res.send("Successful insertion into ActivatedNFC_Provider_Table")
					}
				});
			}
		});
	}
	else {
		console.log("Unsuccessful insertion into ActivatedNFC_Provider table. One of the parameters is null");
		res.send("Unsuccessful insertion into ActivatedNFC_Provider table. One of the parameters is null");
	}
}

function insert_Person_Type(req,res){
	if(req.params.person_type_name != null) {
		db.open(cn, function(err) {
			if(err) {
				return console.log(err);
			}
			else {
				db.query("SELECT * FROM Person_Type WHERE person_type_name = '" +req.params.person_type_name +"'", function(err,data) {
					if(err) {
						console.log(err);
						res.send(err);
					}
					else {
						if(data.length>0) {
							console.log("Unsuccessful insertion into Person Type table. The Person type name must be unique");
							res.send("Unsuccessful insertion into Person Type table. The Person type name must be unique");
						}
						else {
							db.query("INSERT INTO Person_Type VALUES ('" +req.params.person_type_name +"')", function(err,data2) {
								if(err) {
									console.log(err);
									res.send(err);
								}
								else {
									res.send("Successful insertion into Person_Type_Table");
								}
							});
						}
					}
				});
			}
		});
	}
	else {
		console.log("Unsuccessful insertion into Person_Type table. Person_Type_Name is null");
		res.send("Unsuccessful insertion into Person_Type table. Person_Type_Name is null");
	}
}

function insert_Status(req,res) {
	if(req.params.status_name != null) {
		db.open(cn,function(err) {
			if(err) {
				return console.log(err);
			}
			else {
				db.query("SELECT * FROM Status WHERE status_name = '" +req.params.status_name +"'", function(err,data) {
					if(err) {
						console.log(err);
						res.send(err);
					}
					else {
						if(data.length>0) {
							console.log("Unsuccessful insertion into Status table. The status name must be unique");
							res.send("Unsuccessful insertion into Status table. The status name must be unique");
						}
						else {
							db.query("INSERT INTO Status VALUES ('" +req.params.status_name +"')", function(err,data2) {
								if(err) {
									console.log(err);
									res.send(err);
								}
								else {
									res.send("Successful insertion into Person_Type_Table");
								}
							});
						}
					}
				});
			}
		});
	}
	else {
		console.log("Unsuccessful insertion into Status table. Status_Name is null");
		res.send("Unsuccessful insertion into Status table. Status_Name is null");
	}
}


module.exports = {
    insert_NFC_Bracelet,
	insert_Patient_Information,
	insert_Provider_Information,
	insert_Actions,
	insert_ActivatedNFC_Patient,
	insert_ActivatedNFC_Provider,
	insert_Person_Type,
    insert_Status,
	insert_Appointment_Type,
	insert_Question,
	insert_Survey_Activity,
	insert_Action_Performed,
	insert_Room,
	insert_Flag_Color

}