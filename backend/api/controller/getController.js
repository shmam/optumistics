var config = require('../../config.js') 
 
 var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
+ config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';

//total time for each doctor for each task (for pie chart) (real time)
function add_time_provider_task_rt(req,res){ 
    var today = new Date();
	today= today.toISOString().substring(0, 10);

    if(req.params.provider_id != null && req.params.action_id != null){
       db.open(cn, function(err) {
			if (err)
				res.send(err);
			else
				db.query("SELECT SUM(DATEDIFF(minute,start_time, end_time)) FROM Action_Performed WHERE provider_id="+req.params.provider_id+" AND action_id="+req.params.action_id+" AND action_date='"+today+"'", function(err, data) {
					if (err){
                        console.log(err);
                        res.send(err);
                    }	
					else{
                        console.log("Successful insertion into Question table")
                        res.jsonp(data)
                        
                    }
						
				})

		}); 
    }else{
        res.send("Unsuccessful query. One of these value was null")
    }
}


//total time for each doctor for each task (for pie chart) (comprehensive)
function add_time_provider_task_c(req,res){  
   
    var today = new Date();
	today= today.toISOString().substring(0, 10);

    if(req.params.provider_id != null && req.params.action_id != null){
       
        db.open(cn, function(err) {
			if (err)
				return console.log(err);
			else{

				db.query("SELECT sum(DATEDIFF(minute,start_time, end_time)) from Action_Performed WHERE provider_id=+"+req.params.provider_id+ " AND action_id="+req.params.action_id+" AND (action_date between '"+ req.params.start_date+"' AND '"+ req.params.end_date+"')", function(err, data) {
					if (err){
                        res.send(err)        
                    }	
					else{
                        res.jsonp(data)
                        
                    }
						
				})
            }
		}); 
    }else{
        res.send("Unsuccessful query. One of these value was null")
    }
}

//get average time for specific doctor for specific task (real time) 
function getTimeEachDoctor_RT(req,res){

    var today = new Date();
    today = today.toISOString().substring(0, 10);

    if(req.params.action_id != null && req.params.provider_id != null){
        db.open(cn,function(err){
            if(err) return res.send(err)
            else{
                db.query("SELECT AVG(DATEDIFF(minute,start_time, end_time))  FROM Action_Performed WHERE (provider_id = "+ req.params.provider_id +") AND (action_id = "+req.params.action_id+") AND (action_date = '"+ today +"')", function(err,data){
                    if (err){
                        console.log(err);
                        res.send(err);
                    }	
					else{
                        console.log(data)
                        res.jsonp(data)
                    }
                })
            }
        })
    }
    else res.send("Question_id and provider_id cannot be null")
}

//get average time taken on action performed for specific tasks for all doctors (real time)
function getTimeAllDoctors_RT(req,res){

    var today = new Date();
    today = today.toISOString().substring(0, 10);

    if(req.params.action_id != null){
        db.open(cn,function(err){
            if(err) return res.send(err)
            else{
                db.query("SELECT AVG(DATEDIFF(minute,start_time, end_time))  FROM Action_Performed WHERE (action_id = "+ req.params.action_id +") AND (action_date = '"+ today +"')", function(err,data){
                    if (err){
                        console.log(err);
                        res.send(err);
                    }	
					else{
                        console.log(data)
                        res.jsonp(data)
                    }
                })
            }
        })
    }
}

//get average time for specific doctor for specific task (comprehensive) 
function getTimeEachDoctorDates_C(req,res){
    if(req.params.action_id != null && req.params.provider_id != null && req.params.start_date != null && req.params.end_date != null){
        db.open(cn,function(err){
            if (err) return res.send(err)
            else{
                db.query("SELECT AVG(DATEDIFF(minute,start_time, end_time))  FROM dbo.Action_Performed WHERE (action_date BETWEEN '"+req.params.start_date+"' AND '"+req.params.end_date+"') AND action_id = "+req.params.action_id+" AND provider_id = "+ req.params.provider_id, function(err,data){
                    if (err){
                        console.log(err);
                        res.send(err);
                    }	
					else{
                        console.log(data)
                        res.jsonp(data)
                    }
                })
            }
        })
    }

}

//get average time taken on action performed for specific tasks for all doctors (comprehensive)
function getTimeAllDoctorsDates_C(req,res){
    if(req.params.action_id != null && req.params.start_date != null && req.params.end_date != null){
        db.open(cn,function(err){
            if (err) return res.send(err)
            else{
                db.query("SELECT AVG(DATEDIFF(minute,start_time, end_time))  FROM dbo.Action_Performed WHERE (action_date BETWEEN '"+req.params.start_date+"' AND '"+req.params.end_date+"') AND action_id = "+req.params.action_id, function(err,data){
                    if (err){
                        console.log(err);
                        res.send(err);
                    }	
					else{
                        console.log(data)
                        res.jsonp(data)
                    }
                })
            }
        })
    }

}

//select all actions that are currently active
function select_active_actions(req,res) {
	if (req.params.status_name != null) {
    	db.open(cn,function(err){
        	if(err) return console.log(err);
        	else {
				db.query("SELECT status_id FROM Status WHERE status_name = '" +req.params.status_name +"'", function(err, data) {
					if(err) {
						console.log(err);
						res.send(err);
					}
					else {
						db.query("SELECT * FROM Actions WHERE status_id = " +data[0].status_id, function(err,data2) {
							if(err) {
								console.log(err);
								res.send(err);
							}
							else {
								res.jsonp(data2);
							}
						})
					}
				});
			}

		});
	}
	else { res.send("Unsuccessful selection of data. The status id is null"); }
}

//select all actions (for settings page)
function select_all_actions(req,res) {
	db.open(cn,function(err) {
		if(err) return console.log(err);
		else {
			db.query("SELECT * FROM Actions", function(err,data) {
				if(err) {
					console.log(err);
					res.send(err);
				}
				else {
					res.jsonp(data)
				}
			});
		}
	});
}

//select all providers whose status is active
function select_active_providers(req,res) {
	if (req.params.status_name != null) {
    	db.open(cn,function(err){
        	if(err) return console.log(err);
        	else {
				console.log(req.params.status_name)
				db.query("SELECT status_id FROM Status WHERE status_name = '" +req.params.status_name +"'", function(err, data) {
					if(err) {
						console.log(err);
						res.send(err);
					}
					else {
						db.query("SELECT * FROM Provider_Information WHERE status_id = " +data[0].status_id, function(err,data2) {
							if(err) {
								console.log(err);
								res.send(err);
							}
							else {
								res.jsonp(data2);
							}
						})
					}
				});
			}

		});
	}
	else { res.send("Unsuccessful selection of data. The status id is null"); }
}

//select the expected duration of an action based on action name
function select_expected_duration(req,res) {
	if(req.params.action_name != null) {
		db.open(cn, function(err) {
			if(err) return console.log(err);
			else {
				db.query("SELECT action_duration FROM Actions WHERE action_name = '" +req.params.action_name +"'", function(err,data) {
					if(err) {
						console.log(err);
						res.send(err);
					}
					else {
						res.jsonp(data);
					}
				});
			}
		});
	}
	else { res.send("Unsuccessful selection of data. The status id is null"); }
}

//select the total time of actions performed for specific doctor (pie chart) (real time)
function total_time_for_each_doctor(req,res) {
	var today = new Date();
	today= today.toISOString().substring(0, 10);
	if(req.params.provider_id != null) {
		db.open(cn,function(err) {
			if(err) return console.log(err);
			else {
				db.query("SELECT SUM(DATEDIFF(minute,start_time, end_time) ) AS Total_Time_Taken FROM Action_Performed WHERE (provider_id = " +req.params.provider_id + " AND action_date = '" +today +"')", function(err,data) {
					if(err) {
						console.log(err);
						res.send(err);
					}
					else {
						res.jsonp(data);
					}
				});
			}
		});
	}
	else { res.send("Unsuccessful selection of data. The status id is null"); }
}

//select the total time of actions performed for specific doctor (pie chart) (comprehensive)
function total_time_each_doctor_range(req,res) {
	if(req.params.provider_id != null && req.params.start_date != null && req.params.end_date != null) {
		db.open(cn, function(err) {
			if(err) return console.log(err);
			else {
				db.query("SELECT SUM(DATEDIFF(minute,start_time, end_time))  AS Total_Time_Taken FROM Action_Performed WHERE (provider_id = " +req.params.provider_id +" AND action_date BETWEEN '" +req.params.start_date
				 +"' AND '" +req.params.end_date +"')", function(err,data) {
					if(err) {
						console.log(err);
						res.send(err);
					}
					else {
						res.jsonp(data);
					}
				});
			}
		});
	}
	else { res.send("Unsuccessful selection of data. One of the parameters is null"); }
}

function provider_sign_in(req,res){
	console.log(req.params.username)
	db.open(cn, function(err) {
		if(err)  res.send(err);
		else {
			db.query("SELECT password FROM Provider_Information WHERE username='"+req.params.username+"'", function(err,data) {
				if(err) {
					console.log(err);
					res.send(err);
				}
				else {
					res.jsonp(data);
				}
			});
		}
	});

}

function select_person_type(req,res){
	db.open(cn, function(err) {
		if(err)  res.send(err);
		else {
			db.query("SELECT * FROM Person_Type WHERE NOT person_type_name = 'patient'", function(err,data) {
				if(err) {
					console.log(err);
					res.send(err);
				}
				else {
					res.jsonp(data);
				}
			});
		}
	});
}

function select_time_waited_appointment_id_RT(req, res) {
	var today = new Date();
	today = today.toISOString().substring(0, 10);
	if (req.params.patient_id != null) {
		db.open(cn, function (err) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {
				db.query("SELECT appointment_id FROM Appointment WHERE patient_id = " + req.params.patient_id + " AND appointment_date = '" + today
				+ "'", function (err, data2) {
					if (err) {
						console.log(err);
						res.send(err);
					}
					else {
						db.query("SELECT DATEDIFF(minute,a.start_time,a.end_time) - DATEDIFF(minute,ap.start_time,ap.end_time) AS Time_Waited FROM Appointment a,Action_Performed ap WHERE (a.appointment_id = "
						+ data2[0].appointment_id + " AND ap.appointment_id = " + data2[0].appointment_id + " AND a.appointment_date = '" + today + "' AND ap.action_date = '" + today + "')"
						, function (err, data3) {
							res.jsonp(data3);
						});
					}
				});
			}
		});
	}
	else {
		res.send("Unsuccessful selection of data. One of the parameters is null");
	}
}


function select_time_waited_appointment_type_RT(req,res){

}

function select_time_waited_appointment_id_C(req,res){

}

function select_time_waited_appointment_type_C(req,res){

}

//select list of NFCs for providers

function select_NFC_Providers(req,res){
	db.open(cn, function(err) {
		if(err)  res.send(err);
		else {
			db.query("SELECT * FROM Status WHERE status_name=inactive", function(err,data) {
				if(err) {
					console.log(err);
					res.send(err);
				}
				else {
					var id= data[0].status_id;
					db.query("SELECT nfc_id FROM NFC_Bracelet WHERE provider_nfc=1 AND status_id="+ id, function(err,data) {
						if(err) {
							console.log(err);
							res.send(err);
						}
						else {
							res.jsonp(data);
							
						}
					});
				}
			});
		}
	});
}

//select list of NFCs for patients

function select_NFC_Patients(req,res){
	db.open(cn, function(err) {
		if(err)  res.send(err);
		else {
			db.query("SELECT * FROM Status WHERE status_name=inactive", function(err,data) {
				if(err) {
					console.log(err);
					res.send(err);
				}
				else {
					var id= data[0].status_id;
					db.query("SELECT nfc_id FROM NFC_Bracelet WHERE provider_nfc=0 AND status_id="+ id, function(err,data) {
						if(err) {
							console.log(err);
							res.send(err);
						}
						else {
							res.jsonp(data);
							
						}
					});
				}
			});
		}
	});

}
//get appointments for todays date with no start time

function select_current_appointments(req,res){

	var today = new Date();
	today= today.toISOString().substring(0, 10);
	db.open(cn, function(err) {
		if(err)  res.send(err);
		else {
			db.query("SELECT * FROM Appointment WHERE appointment_date='"+today+"' AND start_time IS NULL", function(err,data) {
				if(err) {
					console.log(err);
					res.send(err);
				}
				else {
					res.jsonp(data);
				}
			});
		}
	});
}

//get activated NFC patients

function select_activated_NFC_Patients(req,res){
	db.open(cn, function(err) {
		if(err)  res.send(err);
		else {
			db.query("SELECT * FROM ActivatedNFC_Patient", function(err,data) {
				if(err) {
					console.log(err);
					res.send(err);
				}
				else {
					res.jsonp(data);
				}
			});
		}
	});
}

//get activated NFC providers

function select_activated_NFC_Providers(req,res){
	db.open(cn, function(err) {
		if(err)  res.send(err);
		else {
			db.query("SELECT * FROM ActivatedNFC_Provider", function(err,data) {
				if(err) {
					console.log(err);
					res.send(err);
				}
				else {
					res.jsonp(data);
				}
			});
		}
	});
}

module.exports = {
    getTimeEachDoctor_RT,
    getTimeAllDoctors_RT,
    getTimeEachDoctorDates_C,
    getTimeAllDoctorsDates_C,
    add_time_provider_task_rt,
    add_time_provider_task_c,
    select_active_actions,
	select_all_actions,
	select_active_providers,
	select_expected_duration,
	total_time_for_each_doctor,
	total_time_each_doctor_range,
	provider_sign_in,
	select_person_type,
	select_time_waited_appointment_id_RT,
	select_time_waited_appointment_type_RT,
	select_time_waited_appointment_id_C,
	select_time_waited_appointment_type_C,
	select_NFC_Providers,
	select_NFC_Patients,
	select_current_appointments,
	select_activated_NFC_Patients,
	select_activated_NFC_Providers



}