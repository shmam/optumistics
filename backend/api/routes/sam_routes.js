'use strict';
module.exports = function(app) {
var api = require('../controller/sam_controller.js');


app.route('/general/insert/Appointment_Type/:appointment_name/:appointment_duration') 
    .get(api.insert_Appointment_Type)

app.route('/general/insert/Question/:question') 
    .get(api.insert_Question)

app.route('/general/insert/Survey_Activity/:appointment_name/:appointment_duration') 
    .get(api.insert_Survey_Activity)

app.route('/general/insert/Action_Performed/:appointment_name/:appointment_duration') 
    .get(api.insert_Action_Performed)

app.route('/general/insert/Room/:appointment_name/:appointment_duration') 
    .get(api.nsert_Room)


}