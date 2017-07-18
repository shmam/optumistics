var config = require('../../config.js')

var db = require('mysql');
 var cn = db.createConnection({
  host: "amazondash-tdp.cps5ypxg9leo.us-east-1.rds.amazonaws.com",
  user: "optumistics",
  password: "password",
  database: "optumistics"
});;

cn.connect();


function delete_Action(req, res) {

    cn.query("DELETE FROM Actions WHERE action_id="+ req.params.action_id, function (err, data) {
        if(err){
            console.log(err);
            res.send(err);
        } else{
            console.log("Successful deletion of action!");
            res.send("Successful deletion of action!")
        }   
    });
	
}



module.exports = {
	delete_Action
}
