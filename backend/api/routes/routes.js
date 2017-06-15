'use strict';
module.exports = function(app) {
  var api = require('../controller/controller.js');


  // todoList Routes
  // app.route('/question/:question_name')
  //   .post(api.insert_Question)

  //routing convention: where/why/what/how

  app.route('/dashboard/present/actions/:status_name')//Tony get all actions where status is active

  app.route('dashboard/present/actions') //Tony get all actions

  app.route('portal/present/providers/:status_name') //Tony get all providers

  app.route('portal/present/duration/:action_name') //Tony get all expected durations for each task

  app.route('portal/average/time/:action_id/:provider_id') //Sam get time taken for each task for each doctor (RT)

  app.route('portal/average/time/:action_id/') //Sam get time taken for each task for all doctors (RT)

  app.route('portal/average/time/:action_id/:provider_id/:start_date/:end_date') //Sam get time taken for each task for each doctor (C)

  app.route('portal/average/time/:action_id/:start_date/:end_date') //Sam get time taken for each task for all doctors (C)

  app.route('portal/add/time/:provider_id/:action_id') //Jenny time for each doctor for each tasks (RT)

  app.route('portal/add/time/:provider_id') //Jenny time for each doctor (RT)

  app.route('portal/add/time/:provider_id/:action_id/:start_date/:end_date') //Jenny time for each doctor for each tasks (C)

  app.route('portal/add/time/:provider_id/:start_date/:end_date') //Jenny time for each doctor (C)



      
    
  
};