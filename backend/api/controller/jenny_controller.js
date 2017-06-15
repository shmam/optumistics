var config = require('../../config.js') 
 
 var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
+ config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';


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
	if(req.params.action_name!= null &&  req.params.flag_color != null && req.params.button_label!= null &&  req.params.action_duration!= null &&  req.params.status_id!= null ){
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

									db.query("INSERT INTO Actions (action_name, flag_color,button_label, action_duration, status_id, icon) VALUES ('"+ req.params.action_name+"','"+ req.params.flag_color+"','"+req.params.button_label+"',"+ req.params.action_duration+","+ req.params.status_id+","+final_icon+")", function(err, data) {
										
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

/*
**************  OUR FIRST API CALL<3  **************


function select_question(req, res){

    db.open(cn, function(err) {
			if (err){
                return console.log(err);
            }
			else{
                db.query("SELECT * FROM Question WHERE question_id="+req.params.question_id, function(err, data) {
					if (err){
                        console.log(err);
                        res.send(err);

                    }else{
                        console.log(data);
                        res.json(data);

                    }
                        
				})
            }
				

	});
}

*/
module.exports = {
    
    insert_NFC_Bracelet,
	insert_Patient_Information,
	insert_Provider_Information,
	insert_Actions
}


