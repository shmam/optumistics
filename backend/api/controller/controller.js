var config = require('../../config.js') 
 
 var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
+ config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';

//TESTED AND PASSED
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
    select_question
}


