
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

function insert_Question(req,res) {
	if (req.params.question_name != null && typeof req.params.question_name == "string") {
		db.open(cn, function(err) {
			if (err)
				return console.log(err);
			else
				db.query("INSERT INTO Question(question) VALUES('"+ req.params.question_name+ "')", function(err, data) {
					if (err){
                        console.log(err);
                        res.send(err);
                    }	
					else{
                        res.send("Successful insertion into Question table" )
                        
                    }
						
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


module.exports = {
    getTimeEachDoctor_RT,
    getTimeAllDoctors_RT,
    getTimeEachDoctorDates_C,
    getTimeAllDoctorsDates_C,
    insert_Appointment_Type,
	insert_Question,
	insert_Survey_Activity,
	insert_Action_Performed,
	insert_Room
}