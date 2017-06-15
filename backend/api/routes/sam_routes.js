'use strict';
module.exports = function(app) {
var api = require('../controller/sam_controller.js');

//TESTED AND DONE
app.route('/portal/average/time/:action_id/:provider_id') //Sam get time taken for each task for each doctor (RT)
    .get(api.getTimeEachDoctor_RT)


app.route('/portal/average/time/:action_id') //Sam get time taken for each task for all doctors (RT)
    .get(api.getTimeAllDoctors_RT)

app.route('/portal/average/time/:action_id/:provider_id/:start_date/:end_date') //Sam get time taken for each task for each doctor (C)
    .get(api.getTimeEachDoctorDates_C)

app.route('/portal/average/time/:action_id/:start_date/:end_date') //Sam get time taken for each task for all doctors (C)
    .get(api.getTimeAllDoctorsDates_C)
}