var config = require('../../config.js') 
 
 var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
+ config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';

function add_time_provider_task_rt(req,res){
    var today = new Date();
	today= today.toISOString().substring(0, 10);

    if(req.params.provider_id != null && req.params.action_id != null){
       db.open(cn, function(err) {
			if (err)
				return console.log(err);
			else
				db.query("SELECT SUM(time_taken) FROM Action_Performed WHERE provider_id="+req.params.provider_id+" AND action_id="+req.params.action_id+" AND action_date='"+today+"'", function(err, data) {
					if (err){
                        console.log(err);
                        res.send(err);
                    }	
					else{
                        console.log("Successful insertion into Question table")
                        res.json(data)
                        
                    }
						
				})

		}); 
    }else{
        res.send("Unsuccessful query. One of these value was null")
    }
}

function add_time_provider_task_c(req,res){
   
    var today = new Date();
	today= today.toISOString().substring(0, 10);

    if(req.params.provider_id != null && req.params.action_id != null){
       
        db.open(cn, function(err) {
			if (err)
				return console.log(err);
			else{

				db.query("SELECT sum(time_taken) from Action_Performed WHERE provider_id=+"+req.params.provider_id+ " AND action_id="+req.params.action_id+" AND (action_date between '"+ req.params.start_date+"' AND '"+ req.params.end_date+"')", function(err, data) {
					if (err){
                        res.send(err)        
                    }	
					else{
                        res.json(data)
                        
                    }
						
				})
            }
		}); 
    }else{
        res.send("Unsuccessful query. One of these value was null")
    }
}

// TESTED AND DONE
function getTimeEachDoctor_RT(req,res){

    var today = new Date();
    today = today.toISOString().substring(0, 10);

    if(req.params.action_id != null && req.params.provider_id != null){
        db.open(cn,function(err){
            if(err) return res.send(err)
            else{
                db.query("SELECT AVG(time_taken) FROM Action_Performed WHERE (provider_id = "+ req.params.provider_id +") AND (action_id = "+req.params.action_id+") AND (action_date = '"+ today +"')", function(err,data){
                    if (err){
                        console.log(err);
                        res.send(err);
                    }	
					else{
                        console.log(data)
                        res.json(data)
                    }
                })
            }
        })
    }
    else res.send("Question_id and provider_id cannot be null")
}

//TESTED AND DONE
function getTimeAllDoctors_RT(req,res){

    var today = new Date();
    today = today.toISOString().substring(0, 10);

    if(req.params.action_id != null){
        db.open(cn,function(err){
            if(err) return res.send(err)
            else{
                db.query("SELECT AVG(time_taken) FROM Action_Performed WHERE (action_id = "+ req.params.action_id +") AND (action_date = '"+ today +"')", function(err,data){
                    if (err){
                        console.log(err);
                        res.send(err);
                    }	
					else{
                        console.log(data)
                        res.json(data)
                    }
                })
            }
        })
    }
}

//TESTED AND DONE
function getTimeEachDoctorDates_C(req,res){
    if(req.params.action_id != null && req.params.provider_id != null && req.params.start_date != null && req.params.end_date != null){
        db.open(cn,function(err){
            if (err) return res.send(err)
            else{
                db.query("SELECT AVG(time_taken) FROM dbo.Action_Performed WHERE (action_date BETWEEN '"+req.params.start_date+"' AND '"+req.params.end_date+"') AND action_id = "+req.params.action_id+" AND provider_id = "+ req.params.provider_id, function(err,data){
                    if (err){
                        console.log(err);
                        res.send(err);
                    }	
					else{
                        console.log(data)
                        res.json(data)
                    }
                })
            }
        })
    }

}

function getTimeAllDoctorsDates_C(req,res){
    if(req.params.action_id != null && req.params.start_date != null && req.params.end_date != null){
        db.open(cn,function(err){
            if (err) return res.send(err)
            else{
                db.query("SELECT AVG(time_taken) FROM dbo.Action_Performed WHERE (action_date BETWEEN '"+req.params.start_date+"' AND '"+req.params.end_date+"') AND action_id = "+req.params.action_id, function(err,data){
                    if (err){
                        console.log(err);
                        res.send(err);
                    }	
					else{
                        console.log(data)
                        res.json(data)
                    }
                })
            }
        })
    }

}

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
								res.json(data2);
							}
						})
					}
				});
			}

		});
	}
	else { res.send("Unsuccessful selection of data. The status id is null"); }
}

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
					res.json(data)
				}
			});
		}
	});
}

function select_active_providers(req,res) {
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
						db.query("SELECT * FROM Provider_Information WHERE status_id = " +data[0].status_id, function(err,data2) {
							if(err) {
								console.log(err);
								res.send(err);
							}
							else {
								res.json(data2);
							}
						})
					}
				});
			}

		});
	}
	else { res.send("Unsuccessful selection of data. The status id is null"); }
}

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
						res.json(data);
					}
				});
			}
		});
	}
	else { res.send("Unsuccessful selection of data. The status id is null"); }
}

function total_time_for_each_doctor(req,res) {
	var today = new Date();
	today= today.toISOString().substring(0, 10);
	if(req.params.provider_id != null) {
		db.open(cn,function(err) {
			if(err) return console.log(err);
			else {
				db.query("SELECT SUM(time_taken) AS Total_Time_Taken FROM Action_Performed WHERE (provider_id = " +req.params.provider_id + " AND action_date = '" +today +"')", function(err,data) {
					if(err) {
						console.log(err);
						res.send(err);
					}
					else {
						res.json(data);
					}
				});
			}
		});
	}
	else { res.send("Unsuccessful selection of data. The status id is null"); }
}

function total_time_each_doctor_range(req,res) {
	if(req.params.provider_id != null && req.params.start_date != null && req.params.end_date != null) {
		db.open(cn, function(err) {
			if(err) return console.log(err);
			else {
				db.query("SELECT SUM(time_taken) AS Total_Time_Taken FROM Action_Performed WHERE (provider_id = " +req.params.provider_id +" AND action_date BETWEEN '" +req.params.start_date
				 +"' AND '" +req.params.end_date +"')", function(err,data) {
					if(err) {
						console.log(err);
						res.send(err);
					}
					else {
						res.json(data);
					}
				});
			}
		});
	}
	else { res.send("Unsuccessful selection of data. One of the parameters is null"); }
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
	total_time_each_doctor_range

}