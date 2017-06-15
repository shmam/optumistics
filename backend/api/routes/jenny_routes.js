'use strict';
module.exports = function(app) {
var api = require('../controller/jenny_controller.js');


app.route('/general/insert/NFC_Bracelet/:status_id') 
    .post(api.insert_NFC_Bracelet)

app.route('/general/insert/Patient_Information/:patient_first_name/:patient_last_name/:patient_gender/:person_type_id') 
    .post(api.insert_Patient_Information)

app.route('/general/insert/Provider_Information/:provider_first_name/:provider_last_name/:provider_gender/:username/:password/:person_type_id/:status_id') 
    .post(api.insert_Provider_Information)

app.route('/general/insert/Actions/:action_name/:flag_color/:button_label/:action_duration/:status_id/:icon') 
    .post(api.insert_Actions)



}