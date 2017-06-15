  'use strict';
module.exports = function(app) {
  var api = require('../controller/controllerJ.js');

    // todoList Routes
  // app.route('/question/:question_name')
  //   .post(api.insert_Question)
  
  app.route('/portal/add/time/:provider_id/:action_id') // time for each doctor for each tasks (RT)
        .get(api.add_time_provider_task_rt) 

//   app.route('portal/add/time/:provider_id') //Jenny time for each doctor (RT)

   app.route('/portal/add/time/:provider_id/:action_id/:start_date/:end_date')
        .get(api.add_time_provider_task_c)  //Jenny time for each doctor for each tasks (C)

//   app.route('portal/add/time/:provider_id/:start_date/:end_date') //Jenny time for each doctor (C)
}