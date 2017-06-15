'use strict';
module.exports = function(app) {
var api = require('../controller/jenny_controller.js');


app.route('/general/insert/Appointment_Type/:appointment_name/:appointment_duration') 
    .get(api.insert_NFC_Bracelet)

app.route('/general/insert/Question/:question') 
    .get(api.Patient_Information)

app.route('/general/insert/Survey_Activity/:appointment_name/:appointment_duration') 
    .get(api.insert_Provider_Information)

app.route('/general/insert/Action_Performed/:appointment_name/:appointment_duration') 
    .get(api.insert_Actions)



}