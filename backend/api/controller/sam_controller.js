var config = require('../../config.js') 
 
 var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
+ config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';


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

module.exports = {
    getTimeEachDoctor_RT,
    getTimeAllDoctors_RT,
    getTimeEachDoctorDates_C,
    getTimeAllDoctorsDates_C,
}