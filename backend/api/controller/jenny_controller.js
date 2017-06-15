var config = require('../../config.js') 
 
 var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
+ config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';


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
	insert_Question,
    add_time_provider_task_rt,
    add_time_provider_task_c,
    insert_NFC_Bracelet,
	insert_Patient_Information,
	insert_Provider_Information,
	insert_Actions
}


