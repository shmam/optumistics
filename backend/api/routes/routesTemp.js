  'use strict';
module.exports = function(app) {
  var api = require('../controller/controllerTemp.js');
  
  app.route('/portal/add/time/:provider_id/:action_id') // time for each doctor for each tasks (RT)
        .get(api.add_time_provider_task_rt) 

   app.route('/portal/add/time/:provider_id/:action_id/:start_date/:end_date')  //time for each doctor for each tasks (C)
        .get(api.add_time_provider_task_c) 

    app.route('/portal/average/time/:action_id/:provider_id') //get time taken for each task for each doctor (RT)
        .get(api.getTimeEachDoctor_RT)

    app.route('/portal/average/time/:action_id') //get time taken for each task for all doctors (RT)
        .get(api.getTimeAllDoctors_RT)

    app.route('/portal/average/time/:action_id/:provider_id/:start_date/:end_date') //get time taken for each task for each doctor (C)
        .get(api.getTimeEachDoctorDates_C)

    app.route('/portal/average/time/:action_id/:start_date/:end_date') //get time taken for each task for all doctors (C)
        .get(api.getTimeAllDoctorsDates_C)

    app.route('/dashboard/present/actions/:status_name')
        .get(api.select_active_actions)// get all actions where status is active

    app.route('/dashboard/present/actions')
        .get(api.select_all_actions) // get all actions

    app.route('/portal/present/providers/:status_name')
        .get(api.select_active_providers)// get all providers

    app.route('/portal/present/duration/:action_name')
        .get(api.select_expected_duration) // get all expected durations for each task

    app.route('/portal/add/time/:provider_id')
        .get(api.total_time_for_each_doctor) //time for each doctor (RT) ADD UP ALL TIME FOR EACH DOCTOR

    app.route('/portal/add/time/:provider_id/:start_date/:end_date') // time for each doctor (C)
        .get(api.total_time_each_doctor_range)

}


