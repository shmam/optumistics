var config = require('./config.js')

var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
    + config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';

// Date convention
// var today = new Date();
// today.toISOString().substring(0, 10);

//NOT TESTED YET 
//Select average time for all doctors for an individual task given an action name
function select_Avg_Time_AD_action_name(action_name){
    if(typeof action_name === 'string'){
        db.open(cn, function (err) { 
            if (err) return console.log(err);
            db.query("SELECT action_id FROM Actions WHERE action_name = '" + action_name +"'", function (err,data) {
                if (err) console.log(err);

                if(data.length == 1){
                    db.query("SELECT AVG(time_taken) FROM Action_Performed WHERE action_id = " + data[0].toString(), function (err,data2) {
                        if (err) console.log(err);
                        else return data2[0]
                    });
                }
                else{
                    console.log("Error in the query, there was no or more than one actionid returned for that action name")
                }

            });
        });

    }
    else{
        console.log("ERROR: action_name has to be a string type to work")
    }
} 

// NOT TESTED YET 
//Select an average time for all doctors for an individual task given an action id
function select_Avg_Time_AD_action_id(action_id){
    if(typeof action_id === 'number'){
        db.open(cn,function(err){
            if (err) return console.log(err);
            db.query("SELECT AVG(time_taken) FROM Action_Performed WHERE action_id = " + action_id, function (err,data2) {
                if (err) console.log(err);
                else return data2[0]
            });
        });
    }
}

// NOT TESTED
//Select all average times for all doctors for all tasks
function select_Avg_Time_AD(){
    db.open(cn,function(err){
        if (err) return console.log(err);
        db.query("SELECT action_id FROM Actions", function(err,data){
            var result = []
            for(var i = 0; i < data.length; i++){
               result.push(select_Avg_Time_AD_action_id(data[i]))
            }
            return result;
        })
    });
}

//Takes in two dates and an action id, and returns the average of the time taken between these two dates for all doctors
function select_AVG_Time_AD_dates(date1,date2,action_id){
    if(typeof date1 === 'string' && typeof date2 === 'string'){
        db.open(cn,function(err){
            if (err) return console.log(err);
            db.query("SELECT AVG(time_taken) FROM Action_Performed WHERE (action_id = '"+ action_id +"') AND (action_date BETWEEN "+date1+" AND "+date2+" )", function(err,data){
                if (err) return console.log(err);
                else return data
            })
        })
    }
    else console.log("ERROR: dates have to be a string")
}

function select_status_id(status_name){
    if(typeof status_name === 'string'){
        db.open(cn,function(err){
            if(err) return console.log(err);
            else db.query("SELECT status_id FROM Status WHERE status_name = '" + status_name +"'",function(err,data){
                if(err) return console.log(err);
                else return data[0]
            })
        });
    }
    else console.log("Error: status_name has to be string")
}

function select_person_type_id(person_type_name){
    if(typeof person_type_name === 'string'){
        db.open(cn,function(err){
            if(err) return console.log(err)
            else db.query("SELECT person_type_id FROM Person_Type WHERE person_type_name = '"+ person_type_name +"'", function(err,data){
                if(err) return console.log(err)
                else return data[0]
            })
        })
    }
    else console.log("ERROR: person_type_name has to be a string")
}

function select_patient_id(patient_first_name){
    if(typeof patient_first_name === "string"){
        db.open(cn,function(err){
            if(err) return console.log(err)
            else db.query("SELECT patient_id FROM Patient_Information WHERE patient_first_name = '"+ patient_first_name +"'",function(err,data){
                if(err) return console/log(err)
                else return data[0]
            })
        })
    }
    else console.log("ERROR: patient_first_name has to be a string")
}

function select_question_id(question){
    if(typeof question === "string"){
        db.open(cn,function(err){
            if(err) return console.log(err)
            else db.query("SELECT question_id FROM Quesiton WHERE question = '"+ question +"'",function(err,data){
                if(err) return console.log(err)
                else return data[0]
            })
        })
    }
    else console.log("ERROR: question has to be a string")
}

function select_action_id(action_name){
    if(typeof action_name === "string"){
        db.open(cn,function(err){
            if(err) return console.log(err)
            else db.query("SELECT action_id FROM Actions WHERE action_name = '"+ action_name +"'",function(err,data){
                if(err) return console.log(err)
                else return data[0]
            })
        })
    }
    else console.log("ERROR: action_name has to be a string")
}

function select_room_id(room_name){
    if(typeof room_name === "string"){
        db.open(cn,function(err){
            if(err) return console.log(err)
            else db.query ("SELECT room_id FROM Room WHERE room_name = '"+ room_name + "'", function(err,data){
                if(err) return console.log(err)
                else return data[0]
            })
        })
    }
    else console.log("ERROR: room_name has to be a string ")
}

function select_provider_id(provider_first_name){
    if(typeof provider_first_name === "string"){
        db.open(cn,function(err){
            if(err) return console.log(err)
            else db.query("SELECT provider_id FROM Provider_Information WHERE provider_first_name = '"+ provider_first_name +"'",function(err,data){
                if(err) return console.log(err)
                else return data[0]
            })
        })
    }
    else console.log("ERROR: provider_first_name has to be a string")
}

function select_NFC_id(status_id){
    if(typeof status_id === "number"){
        db.open(cn,function(err){
            if(err) return console.log(err)
            else db.query("SELECT nfc_id FROM NFC_Bracelet WHERE status_id = " + status_id.toString(),function(err,data){
                if(err) return console.log(err)
                else return data[0]
            })
        })
    }
    else console.log("ERROR: status_id has to be a number")
}

function select_appointment_id(appointment_name){
    if(typeof appointment_name === "string"){
        db.open(cn,function(err){
            if(err) return console.log(err)
            else db.query("SELECT appointment_id FROM Appointment_Type WHERE appointment_name = '"+ appointment_name + "'",function(err,data){
                if(err) return console.log(err)
                else return data[0]
            })
        })
    }
    else console.log("ERROR: appointment_name has to be a string")
}

console.log(select_status_id("active"))


module.exports = {
    select_Avg_Time_AD, 
    select_Avg_Time_AD_action_id,
    select_Avg_Time_AD_action_name,
    select_AVG_Time_AD_dates, 
    select_status_id,
    select_person_type_id,
    select_patient_id,
    select_question_id,
    select_action_id,
    select_room_id,
    select_provider_id,
    select_NFC_id,
    select_appointment_id,

}