'use strict';
module.exports = function(app) {
  var api = require('../controller/controller.js');


  // todoList Routes
  app.route('/question/:question_name')
    .post(api.insert_Question)
    
  
};