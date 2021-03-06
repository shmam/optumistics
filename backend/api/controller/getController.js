var config = require('../../config.js')
var sync= require('synchronize')

 var db = require('mysql');
 var cn = db.createConnection({
  host: "amazondash-tdp.cps5ypxg9leo.us-east-1.rds.amazonaws.com",
  user: "optumistics",
  password: "password",
  database: "optumistics"
});

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'ab66397f',
  apiSecret: 'b2724fee495c9e6a'
});




cn.connect();

//total time for each doctor for each task (for pie chart) (real time)
function add_time_provider_task_rt(req,res){

	//finds todays date
    var today = new Date();
	today= today.toISOString().substring(0, 10);

	//check if nonnullable values are null
    if(req.params.provider_id != null && req.params.action_id != null){

		//submit sql query for the sum time spent on a specific task for a specific doctor
		cn.query("SELECT SUM(TIMESTAMPDIFF(minute,start_time, end_time)) FROM Action_Performed WHERE provider_id="+req.params.provider_id+" AND action_id="+req.params.action_id+" AND action_date='"+today+"'", function(err, data) {
			if (err){
				console.log(err);
				res.send(err);
			}
			else{

				//return sql object that is returned
				res.jsonp(data)

			}

		})
    }else{
        res.send("Unsuccessful query. One of these value was null")
    }
}


//total time for each doctor for each task (for pie chart) (comprehensive)
function add_time_provider_task_c(req,res){

	//this sets today's date to variable today
    var today = new Date();
	today= today.toISOString().substring(0, 10);

	//make sure the provider id and action id are not null
    if(req.params.provider_id != null && req.params.action_id != null){

		//submit sql query that finds the sum for all tasks for a specific doctor
		cn.query("SELECT sum(TIMESTAMPDIFF(minute,start_time, end_time)) AS time from Action_Performed WHERE provider_id=+"+req.params.provider_id+ " AND action_id="+req.params.action_id+" AND (action_date between '"+ req.params.start_date+"' AND '"+ req.params.end_date+"')", function(err, data) {
			if (err){
				res.send(err)
			}
			else{

				//return data
				res.jsonp(data)

			}

		})
            
    }else{
        res.send("Unsuccessful query. One of these value was null")
    }
}

//get average time for specific doctor for specific task (real time)
function getTimeEachDoctor_RT(req,res){

	//find today's date
    var today = new Date();
    today = today.toISOString().substring(0, 10);

	//make sure action id and provider id are not null
    if(req.params.action_id != null && req.params.provider_id != null){
           
		//submit sql query that gets the average time it takes a specific provider to complete specific task
		cn.query("SELECT AVG(TIMESTAMPDIFF(minute,start_time, end_time)) AS time FROM Action_Performed WHERE (provider_id = "+ req.params.provider_id +") AND (action_id = "+req.params.action_id+") AND (action_date = '"+ today +"')", function(err,data){
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
    else res.send("Question_id and provider_id cannot be null")
}

//get average time taken on action performed for specific tasks for all doctors (real time)
function getTimeAllDoctors_RT(req,res){

	//find today's date
    var today = new Date();
    today = today.toISOString().substring(0, 10);

	//make sure the action id is not null
    if(req.params.action_id != null){
          
		//submit sql query that finds the average time it takes for a specific task to get completed by all doctors
		cn.query("SELECT AVG(TIMESTAMPDIFF(minute,start_time, end_time)) AS time FROM Action_Performed WHERE (action_id = "+ req.params.action_id +") AND (action_date = '"+ today +"')", function(err,data){
			if (err){
				console.log(err);
				res.send(err);
			}
			else{

				//return data
				console.log(data)
				res.jsonp(data)
			}
		})
    }
}

//get average time for specific doctor for specific task (comprehensive)
function getTimeEachDoctorDates_C(req,res){
    if(req.params.action_id != null && req.params.provider_id != null && req.params.start_date != null && req.params.end_date != null){

		//find the start month and end month of the time range for comprehensive analysis
       var start_month=parseInt(req.params.start_date.substring(6,8));
	   var end_month=parseInt(req.params.end_date.substring(6,8));

	   //this is where the returned data will be stored
	   var dataArr=[];

	   //sync fiber allows the sql queries to be made synchonously
	   sync.fiber(function(){
		
			//will loop through from start month to end month
			for(var i=start_month;i<(end_month+1);i++){
				
				//declares the current start date will be from beginning of current month to end of current month
				var start= req.params.start_date.substring(0,4)+"-"+String(i)+"-01"
				var end= req.params.end_date.substring(0,4)+"-"+String(i)+"-31"
			
				//queries for the average time it takes a specific provider to complete specific task
				var data1 = sync.await(cn.query("SELECT AVG(TIMESTAMPDIFF(minute,start_time, end_time)) AS time FROM Action_Performed WHERE (action_date BETWEEN '"+start+"' AND '"+end+"') AND action_id = "+req.params.action_id+" AND provider_id = "+ req.params.provider_id, sync.defer()));
				
				if(data1[0].time==null){
					data1=0;
				}else{
					data1=data1[0].time;
				}
				
				//add data to a data array
				dataArr.push(data1);


			}
			//return data array 
			res.jsonp(dataArr);
		});
	
         
    }

}

//get average time taken on action performed for specific tasks for all doctors (comprehensive)
function getTimeAllDoctorsDates_C(req,res){

	//make sure action id, start date and end date are not null
    if(req.params.action_id != null && req.params.start_date != null && req.params.end_date != null){

		//find the start month and end month of the time range for comprehensive analysis
       var start_month=parseInt(req.params.start_date.substring(6,8));
	   var end_month=parseInt(req.params.end_date.substring(6,8));

	   //this is where the returned data will be stored
	   var dataArr=[];

	   //sync fiber allows the sql queries to be made synchonously
	   sync.fiber(function(){
			for(var i=start_month;i<(end_month+1);i++){

				//declares the current start date will be from beginning of current month to end of current month
				var start= req.params.start_date.substring(0,4)+"-"+String(i)+"-01"
				var end= req.params.end_date.substring(0,4)+"-"+String(i)+"-31"
			
				//queries for the average time it takes a specific provider to complete specific task
				var data1 = sync.await(cn.query("SELECT AVG(TIMESTAMPDIFF(minute,start_time, end_time)) AS time FROM Action_Performed WHERE (action_date BETWEEN '"+start+"' AND '"+end+"') AND action_id = "+req.params.action_id, sync.defer()));
				
				if(data1[0].time==null){
					data1=0;
				}else{
					data1=data1[0].time;
				}
				
				//add data to a data array
				dataArr.push(data1);

			}
			//return data array
			res.jsonp(dataArr);
		});
	
         
    }

}

//select all actions that are currently active
function select_active_actions(req,res) {

	//make sure status name is not null
	if (req.params.status_name != null) {
    	
		//submit sql query to get the status id from status table
		cn.query("SELECT status_id FROM Status WHERE status_name = '" +req.params.status_name +"'", function(err, data) {
			if(err) {
				console.log(err);
				res.send(err);
			}
			else {

				//once the other sql query is successful, get a list of active actions
				cn.query("SELECT ac.action_id AS action_id, ac.action_name AS action_name, ac.flag_color_id AS flag_color_id, ac.button_label AS button_label, ac.action_duration AS action_duration, ac.status_id AS status_id, fc.flag_hex AS flag_hex FROM Actions ac, Flag_Color fc WHERE ac.flag_color_id= fc.flag_color_id AND status_id = " +data[0].status_id, function(err,data2) {
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
	else { res.send("Unsuccessful selection of data. The status id is null"); }
}

//select all actions (for settings page)
function select_all_actions(req,res) {
	
	//submit sql query that selects all actions that have been registered
	cn.query("SELECT fc.flag_color_name, fc.flag_hex, a.action_id, a.action_name, a.status_id FROM Actions a, Flag_Color fc WHERE a.flag_color_id = fc.flag_color_id", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			res.jsonp(data)
		}
	});
	
}

//select all providers whose status is active
function select_active_providers(req,res) {
	if (req.params.status_name != null) {
    	
		//submit sql query that finds the id of the status name
		cn.query("SELECT status_id FROM Status WHERE status_name = '" +req.params.status_name +"'", function(err, data) {
			if(err) {
				console.log(err);
				res.send(err);
			}
			else {

				//on success of the last sql query, select the active providers
				cn.query("SELECT * FROM Provider_Information WHERE status_id = " +data[0].status_id, function(err,data2) {
					if(err) {
						console.log(err);
						res.send(err);
					}
					else {

						//return the provider data
						res.jsonp(data2);
					}
				})
			}
		});
		
	}
	else { res.send("Unsuccessful selection of data. The status id is null"); }
}

//select the expected duration of an action based on action id
function select_expected_duration(req,res) {

	//make sure the action id is not null
	if(req.params.action_id != null) {
		
		//submit sql query that will select the action based on id
		cn.query("SELECT action_duration FROM Actions WHERE action_id = " +req.params.action_id, function(err,data) {
			if(err) {
				console.log(err);
				res.send(err);
			}
			else {

				//return data
				res.jsonp(data);
			}
		});
	}
	
	else { res.send("Unsuccessful selection of data. The status id is null"); }
}

//select the total time of actions performed for specific doctor (pie chart) (real time)
function total_time_for_each_doctor(req,res) {
	
	//find todays date
	var today = new Date();
	today= today.toISOString().substring(0, 10);

	//make sure provider id is not null
	if(req.params.provider_id != null) {
		
		//submit sql query that will find the total time the provider has spent on all actions today
		cn.query("SELECT SUM(TIMESTAMPDIFF(minute,start_time, end_time) ) AS Total_Time_Taken FROM Action_Performed WHERE (provider_id = " +req.params.provider_id + " AND action_date = '" +today +"')", function(err,data) {
			if(err) {
				console.log(err);
				res.send(err);
			}
			else {
				//return data
				res.jsonp(data);
			}
		});
	}

	else { res.send("Unsuccessful selection of data. The status id is null"); }
}

//select the total time of actions performed for specific doctor (pie chart) (comprehensive)
function total_time_each_doctor_range(req,res) {

	//make sure the provider id, start date and end date are not null
	if(req.params.provider_id != null && req.params.start_date != null && req.params.end_date != null) {
	
		//submit sql query that will return the sum of all actions performed by a doctor within a time range
		cn.query("SELECT SUM(TIMESTAMPDIFF(minute,start_time, end_time))  AS Total_Time_Taken FROM Action_Performed WHERE (provider_id = " +req.params.provider_id +" AND action_date BETWEEN '" +req.params.start_date
			+"' AND '" +req.params.end_date +"')", function(err,data) {
			if(err) {
				console.log(err);
				res.send(err);
			}
			else {
				//return data
				res.jsonp(data);
			}
		});
	}
	
	else { res.send("Unsuccessful selection of data. One of the parameters is null"); }
}

//this function will be used for sign in verification
function provider_sign_in(req,res){

	//submit sql query that will retireve the password that belongs to a username
	cn.query("SELECT password FROM Provider_Information WHERE username='"+req.params.username+"'", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {

			//return data
			res.jsonp(data);
		}
	});
}

//this function is will be used to return all non patient provider types
function select_person_type	(req,res){
	
	//submit query that will return all provider person types
	cn.query("SELECT * FROM Person_Type WHERE NOT person_type_name = 'patient'", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			//return data
			res.jsonp(data);
		}
	});
	
}

//this function will be used to determine the wait time in a certain appointment  
function select_time_waited_appointment_id_RT(req, res) {
	//get todays date
	var today = new Date();
	today = today.toISOString().substring(0, 10);

	//make sure the patient id is not null
	if (req.params.patient_id != null) {
		
		//this query will select the appointment id that belongs to a certain patient on today's date
		cn.query("SELECT appointment_id FROM Appointment WHERE patient_id = " + req.params.patient_id + " AND appointment_date = '" + today
		+ "'", function (err, data2) {
			
			if (err) {
				console.log(err);
				res.send(err);
			}
			else {

				//this query will select the difference between the total time of the appoinment and the total time of actions performed in an appointment
				cn.query("SELECT TIMESTAMPDIFF(minute,a.start_time,a.end_time) - TIMESTAMPDIFF(minute,ap.start_time,ap.end_time) AS Time_Waited FROM Appointment a,Action_Performed ap WHERE (a.appointment_id = "
				+ data2[0].appointment_id + " AND ap.appointment_id = " + data2[0].appointment_id + " AND a.appointment_date = '" + today + "' AND ap.action_date = '" + today + "')"
				, function (err, data3) {

					//return data
					res.jsonp(data3);
				});
			}
		});
		
	}
	else {
		res.send("Unsuccessful selection of data. One of the parameters is null");
	}
}

//select list of NFCs for providers

function select_NFC_Providers(req,res){
	
	cn.query("SELECT status_id FROM Status WHERE status_name='inactive'", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			var id= data[0].status_id;
			cn.query("SELECT nfc_id FROM NFC_Bracelet WHERE provider_nfc=1 AND status_id="+id, function(err,data) {
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

//select list of NFCs for patients

function select_NFC_Patients(req,res){
	
	cn.query("SELECT status_id FROM Status WHERE status_name='inactive'", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			var id= data[0].status_id;
			cn.query("SELECT nfc_id FROM NFC_Bracelet WHERE provider_nfc=0 AND status_id="+id, function(err,data) {
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
//get appointments for todays date with no start time

function select_current_appointments(req,res){

	var today = new Date();
	today= today.toISOString().substring(0, 10);

	cn.query("SELECT a.appointment_id, pi.patient_first_name, pi.patient_last_name FROM Appointment a, Patient_Information pi WHERE (a.appointment_date='" +today +"' AND (a.start_time IS NULL OR a.start_time='00:00:00') AND a.patient_id = pi.patient_id)", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			res.jsonp(data);
		}
	});
	
}

function select_appointment_information_for_patient_id(req,res){
	cn.query("SELECT a.appointment_id AS appointment_id, a.expected_start_time AS expected_start_time,pr.provider_id AS provider_id, pi.patient_first_name AS patient_first_name, pi.patient_last_name AS patient_last_name,a.appointment_date AS appointment_date, pr.provider_first_name AS provider_first_name, pr.provider_last_name AS provider_last_name FROM Appointment a, Patient_Information pi, Provider_Information pr WHERE a.provider_id=pr.provider_id AND (a.start_time IS NULL OR a.start_time='00:00:00') AND a.patient_id=pi.patient_id AND a.patient_id ="+req.params.patient_id+" ORDER BY expected_start_time ASC LIMIT 1", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			res.jsonp(data);
		}
	});
}

//get activated NFC patients

function select_activated_NFC_Patients(req,res){

	cn.query("SELECT * FROM ActivatedNFC_Patient", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			res.jsonp(data);
		}
	});
}

//get activated NFC providers

function select_activated_NFC_Providers(req,res){

	cn.query("SELECT * FROM ActivatedNFC_Provider", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			res.jsonp(data);
		}
	});
	
}

// get all patient's name and id
function select_Patient_Name(req,res){
	
	cn.query("SELECT patient_id, patient_first_name, patient_last_name FROM Patient_Information", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			res.jsonp(data);
		}
	});
	
}

function select_Provider_Name_NotActive(req,res) {
	
	cn.query("SELECT pi.provider_id, pi.provider_first_name, pi.provider_last_name FROM Provider_Information pi WHERE NOT EXISTS (SELECT ap.provider_id FROM ActivatedNFC_Provider ap WHERE ap.provider_id = pi.provider_id)", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			res.jsonp(data);
		}
	});
	
}

function select_Appointment_Type_Name(req,res) {
	
	cn.query("SELECT appointment_type_id, appointment_name FROM Appointment_Type", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			res.jsonp(data);
		}
	});

}

function select_Flag_Color(req,res) {

	cn.query("SELECT fc.flag_color_id, fc.flag_color_name, fc.flag_hex FROM Flag_Color fc LEFT JOIN Actions a ON fc.flag_color_id = a.flag_color_id WHERE (a.flag_color_id IS NULL OR a.flag_color_id=0) UNION SELECT fc.flag_hex, fc.flag_color_id, fc.flag_color_name FROM Flag_Color fc, Actions a WHERE fc.flag_color_id = a.flag_color_id AND (a.status_id=75 AND a.flag_color_id NOT IN (SELECT a1.flag_color_id FROM Actions a1 WHERE a1.status_id=74))", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			res.jsonp(data);
		}
	});
	
}

function select_patient_wait_time(req, res)
{
	var startcnt = 33;
	var endcnt=0;
	var sum1  = 0; 
	var wait_time = 0;
	var beep = 0;
	var test=0;
	var appointment_ids=[];
	sync.fiber(function(){
		var ids = sync.await(cn.query("SELECT appointment_id FROM Appointment WHERE appointment_date = '"+req.params.date+"'", sync.defer()));
		for(var i=0;i<ids.length;i++){
			appointment_ids.push(ids[0].appointment_id);
		}

		for(var i=0;i<appointment_ids.length;i++){
			var data1 = sync.await(cn.query("SELECT TIMESTAMPDIFF(minute,start_time, end_time) AS time1 FROM Appointment WHERE appointment_id = "+appointment_ids[i], sync.defer()));
			var data2 = sync.await(cn.query("SELECT SUM(TIMESTAMPDIFF(minute,start_time, end_time)) AS time2 FROM Action_Performed WHERE appointment_id = "+appointment_ids[i], sync.defer()));
			console.log("DATA 1:"+ data1[0].time1)
			console.log("DATA 2:"+ data2[0].time2)
			test=data1[0].time1-data2[0].time2
			console.log(i)
			wait_time+=	test;
			beep+=1;

	
		}
		console.log("FINAL WAIT TIME:  "+wait_time);
		console.log("FINAL BEEP:  "+beep);
		res.jsonp(wait_time/beep);
	});
	
	
}


function select_Average_NPS(req, res)
{
 
	cn.query("SELECT AVG(rating) AS average FROM Survey_Activity", function(err,data)
	{
	if(err)
	{
		console.log(err);
		res.send(err);
	}
	else
	{
		res.jsonp(data);
	}
	});
   
}


function select_ActiveNFCProvider(req, res)
{
 
	cn.query("SELECT nfc.nfc_hex, act.nfc_id FROM NFC_Bracelet nfc, ActivatedNFC_Provider act WHERE nfc.nfc_id=act.nfc_id", function(err,data)
	{
		if(err)
		{
			console.log(err);
			res.send(err);
		}
		else
		{
			res.jsonp(data);
		}
	});  
}

function select_ActiveNFCPatient(req, res)
{
 
	cn.query("SELECT nfc.nfc_hex, act.nfc_id FROM NFC_Bracelet nfc, ActivatedNFC_Patient act WHERE nfc.nfc_id=act.nfc_id", function(err,data)
	{
		if(err)
		{
			console.log(err);
			res.send(err);
		}
		else
		{
			res.jsonp(data);
		}
	});  
}

function select_dup_flag_color_id(req,res) {
	cn.query("SELECT flag_color_id FROM Actions WHERE status_id=74 GROUP BY flag_color_id HAVING ( COUNT(*) > 1 )", function(err,data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			res.jsonp(data);
		}
	});
}

function select_provider_id_by_NFC(req,res){
	cn.query("SELECT pi.provider_first_name, pi.provider_last_name, act.provider_id AS provider_id, act.nfc_id, nfc.nfc_id, nfc.nfc_hex FROM Provider_Information pi, ActivatedNFC_Provider act, NFC_Bracelet nfc WHERE pi.provider_id=act.provider_id AND nfc.nfc_id = act.nfc_id AND nfc.nfc_hex= '"+req.params.nfc_hex+"'", function(err,data)
	{
		if(err)
		{
			console.log(err);
			res.send(err);
		}
		else
		{
			res.jsonp(data);
		}
	});
}

function select_patient_id_by_NFC(req,res){
	cn.query("SELECT act.appointment_id AS appointment_id, a.patient_id AS patient_id, pi.patient_first_name as patient_first_name, pi.patient_last_name as patient_last_name, act.nfc_id, nfc.nfc_id, nfc.nfc_hex FROM Appointment a , ActivatedNFC_Patient act, NFC_Bracelet nfc, Patient_Information pi WHERE nfc.nfc_id = act.nfc_id AND nfc.nfc_hex= '"+req.params.nfc_hex+"' AND a.appointment_id= act.appointment_id AND a.patient_id=pi.patient_id", function(err,data)
	{
		if(err)
		{
			console.log(err);
			res.send(err);
		}
		else
		{
			res.jsonp(data);
		}
	});
}

function get_patient_wait_time_C(req,res){
	
	var start_month=parseInt(req.params.start_date.substring(6,8));
	var end_month=parseInt(req.params.end_date.substring(6,8));

	var dataArr=[];

	sync.fiber(function(){
		for(var i=start_month;i<(end_month+1);i++){
			var wait_time = 0;
			var beep = 0;
			var test=0;
			var start= req.params.start_date.substring(0,4)+"-"+String(i)+"-01"
			var end= req.params.end_date.substring(0,4)+"-"+String(i)+"-31"
			console.log("Start date"+start);
			console.log("End date"+ end);
			var data1 = sync.await(cn.query("SELECT appointment_id FROM Appointment WHERE appointment_date between '"+start+"' and '"+end+"'", sync.defer()));
		
			for(var j=0;j<data1.length;j++){
				
				var diff = sync.await(cn.query("SELECT TIMESTAMPDIFF(minute,start_time, end_time) AS time1 FROM Appointment WHERE appointment_id = "+data1[j].appointment_id, sync.defer()));
				console.log(diff[0].time1+ " start to end appointment");
				var sum = sync.await(cn.query("SELECT SUM(TIMESTAMPDIFF(minute,start_time, end_time)) AS time2 FROM Action_Performed WHERE appointment_id = "+data1[j].appointment_id, sync.defer()));
				console.log(sum[0].time2+ " sum of start to end appointment actions");
				test=diff[0].time1-sum[0].time2;
				console.log("difference: "+ test)
				wait_time+=	test;
				beep+=1;
				
			}

			console.log(wait_time/beep +" final push");
			dataArr.push(wait_time/beep);

		}

		res.jsonp(dataArr);
		
	});

	

		
			
}
function get_question(req,res){
	cn.query("SELECT * FROM Question", function(err,data)
	{
		if(err)
		{
			console.log(err);
			res.send(err);
		}
		else
		{
			res.jsonp(data);
		}
	});
}

function select_patient_queue_time(req,res){
	sync.fiber(function(){
		var sum=0;
		var count=0;
		var appts = sync.await(cn.query("SELECT TIMESTAMPDIFF(minute,expected_start_time,start_time) AS timediff FROM Appointment WHERE appointment_date='"+req.params.appointment_date+"' AND provider_id= "+req.params.provider_id+" AND expected_start_time<'"+req.params.expected_start_time+"' AND expected_start_time >'00:00:00' AND start_time IS NOT NULL ORDER BY start_time DESC LIMIT 1", sync.defer()));
		console.log(appts);
		
		res.jsonp(appts);
		
	});
}

function select_queue_position(req,res){
	

	cn.query("SELECT * FROM Appointment WHERE appointment_date='"+req.params.appointment_date+"' AND start_time IS NULL AND expected_start_time< '"+req.params.expected_start_time+"' AND provider_id="+ req.params.provider_id, function(err,data)
	{
		if(err)
		{
			console.log(err);
			res.send(err);
		}
		else
		{
			res.jsonp(data);
		}
	});
}

function get_text_alert(req,res){
	console.log("help");
	var today = new Date();
	var today_time= today.toISOString().substring(11, 19);
	var new_today_time= String(parseInt(today_time.substring(0,2))+1)+":"+today_time.substring(3,5)+":"+ today_time.substring(6,8);
	var today_date= today.toISOString().substring(0, 10);
	
	

	 sync.fiber(function(){
		
		var data = sync.await(cn.query("SELECT a.appointment_id AS appointment_id, pi.patient_phone_number AS patient_phone_number, pi.patient_first_name AS patient_first_name, pi.patient_last_name AS patient_last_name FROM Appointment a, Patient_Information pi WHERE a.expected_start_time>='"+today_time+"' AND a.expected_start_time<= '"+new_today_time+"' AND a.appointment_date='"+today_date+"' AND a.text_alert=1 AND a.patient_id=pi.patient_id", sync.defer()));

		for(var i=0;i<data.length;i++){

			nexmo.message.sendSms(
			'12018340387', data[i].patient_phone_number, data[i].patient_first_name+', you have one hour until your appointment',
			(err, responseData) => {
				if (err) {
					console.log(err);
				} else {
					console.dir(responseData);
				}
			}
			);
			
			sync.await(cn.query("UPDATE Appointment SET text_alert=0 WHERE appointment_id="+data[i].appointment_id, sync.defer()));
		
		}
		res.send("Success");	

	 });
}

function get_light(req,res){
	 cn.query("SELECT * FROM Light", function (err, data) {
        if(err){
            console.log(err);
            res.send(err);
        } else{
            console.log(data);
            res.jsonp(data);
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
	select_NFC_Providers,
	select_NFC_Patients,
	select_current_appointments,
	select_activated_NFC_Patients,
	select_activated_NFC_Providers,
	select_Patient_Name,
	select_Provider_Name_NotActive,
	select_Appointment_Type_Name,
	select_Average_NPS,
	select_patient_wait_time,
	select_Flag_Color,
	select_ActiveNFCProvider,
	select_ActiveNFCPatient,
	select_dup_flag_color_id,
	select_provider_id_by_NFC,
	select_patient_id_by_NFC,
	get_patient_wait_time_C,
	get_question,
	select_appointment_information_for_patient_id,
	select_patient_queue_time,
	select_queue_position,
	get_text_alert,
	get_light
	
}
