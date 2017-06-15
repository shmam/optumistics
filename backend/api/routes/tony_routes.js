'use strict';
module.exports = function(app) {
var api = require('../controller/tony_controller.js');


app.route('/general/insert/ActivatedNFC_Patient/:appointment_name/:appointment_duration') 
    .get(api.nsert_ActivatedNFC_Patient)

app.route('/general/insert/ActivatedNFC_Provider/:appointment_name/:appointment_duration') 
    .get(api.insert_ActivatedNFC_Provider)

app.route('/general/insert/Person_Type/:appointment_name/:appointment_duration') 
    .get(api.insert_Person_Type)

app.route('/general/insert/Status/:appointment_name/:appointment_duration') 
    .get(api.insert_Status)

}