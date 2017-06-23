  'use strict';
module.exports = function(app) {
  var insertAPI = require('../controller/postController.js');
  var selectAPI = require('../controller/getController.js')
  
  app.route('/portal/add/time/:provider_id/:action_id') // time for each doctor for each tasks (RT)
        .get(selectAPI.add_time_provider_task_rt) 

   app.route('/portal/add/time/:provider_id/:action_id/:start_date/:end_date')  //time for each doctor for each tasks (C)
        .get(selectAPI.add_time_provider_task_c) 

    app.route('/portal/average/time/:action_id/:provider_id') //get time taken for each task for each doctor (RT)
        .get(selectAPI.getTimeEachDoctor_RT)

    app.route('/portal/average/time/:action_id') //get time taken for each task for all doctors (RT)
        .get(selectAPI.getTimeAllDoctors_RT)

    app.route('/portal/average/time/:action_id/:provider_id/:start_date/:end_date') //get time taken for each task for each doctor (C)
        .get(selectAPI.getTimeEachDoctorDates_C)

    app.route('/portal/average/time/:action_id/:start_date/:end_date') //get time taken for each task for all doctors (C)
        .get(selectAPI.getTimeAllDoctorsDates_C)

    app.route('/dashboard/present/actions/:status_name')
        .get(selectAPI.select_active_actions)// get all actions where status is active

    app.route('/dashboard/present/actions')
        .get(selectAPI.select_all_actions) // get all actions

    app.route('/portal/present/providers/:status_name')
        .get(selectAPI.select_active_providers)// get all providers

    app.route('/portal/present/duration/:action_name')
        .get(selectAPI.select_expected_duration) // get all expected durations for each task

    app.route('/portal/add/time/:provider_id')
        .get(selectAPI.total_time_for_each_doctor) //time for each doctor (RT) ADD UP ALL TIME FOR EACH DOCTOR

    app.route('/portal/add/time/:provider_id/:start_date/:end_date') // time for each doctor (C)
        .get(selectAPI.total_time_each_doctor_range)

    app.route('/portal/signin/providers/:username') //get the password from provider_information to match username
        .get(selectAPI.provider_sign_in)
    
    app.route('/portal/present/Person_Type')    //get all provider person types
        .get(selectAPI.select_person_type)
    
    app.route('/portal/present/time_waited/:patient_id') //select the time waited for appointment(RT)
        .get(selectAPI.select_time_waited_appointment_id_RT)
    
    app.route('/portal/present/avg/timme_waited/:appointment_type_id') //select the average time waited for a certain appointment type (RT)
        .get(selectAPI.select_time_waited_appointment_type_RT)
    
     app.route('/portal/present/time_waited/:patient_id/:start_date/:end_date') //select the time waited for appointment (C)
        .get(selectAPI.select_time_waited_appointment_id_C)
    
    app.route('/portal/present/avg/timme_waited/:appointment_type_id/:start_date/:end_date') //select the average time waited for a certain appointment type (C)
        .get(selectAPI.select_time_waited_appointment_type_C)

    /* ------------------------------------------------------------------------------------------------------------------------------------------------------- */
    
    //Post Functions Routes

    app.route('/general/insert/Person_Type/:person_type_name') 
        .post(insertAPI.insert_Person_Type)

    app.route('/general/insert/Question/:question') 
        .post(insertAPI.insert_Question)

    app.route('/general/insert/Flag_Color/:flag_color_name')
        .post(insertAPI.insert_Flag_Color)

    app.route('/general/insert/Appointment_Type/:appointment_name/:appointment_duration') 
        .post(insertAPI.insert_Appointment_Type)

    app.route('/general/insert/Status/:status_name') 
        .post(insertAPI.insert_Status)

    app.route('/general/insert/NFC_Bracelet/:provider_nfc/:status_id') 
        .post(insertAPI.insert_NFC_Bracelet)

    app.route('/general/insert/Room/:room_name/:status_id') 
        .post(insertAPI.insert_Room)

    app.route('/general/insert/Survey_Activity/:patient_id/:rating/:rating_date/:question_id') 
        .post(insertAPI.insert_Survey_Activity)

    app.route('/general/insert/Patient_Information/:patient_first_name/:patient_last_name/:patient_gender/:person_type_id') 
        .post(insertAPI.insert_Patient_Information)

    app.route('/general/insert/Provider_Information/:provider_first_name/:provider_last_name/:provider_gender/:provider_username/:provider_password/:person_type_id/:status_id') 
        .post(insertAPI.insert_Provider_Information)

    app.route('/general/insert/Actions/:action_name/:flag_color_id/:button_label/:action_duration/:status_id/:icon') 
        .post(insertAPI.insert_Actions)

    app.route('/general/insert/ActivatedNFC_Provider/:provider_id/:room_id/:nfc_id') 
        .post(insertAPI.insert_ActivatedNFC_Provider)

    app.route('/general/insert/Appointment/:start_time/:end_time/:patient_id/:appointment_type_id/:status_id/:appointment_date')
        .post(insertAPI.insert_Appointment)

    app.route('/general/insert/ActivatedNFC_Patient/:room_id/:appointment_id/:nfc_id') 
        .post(insertAPI.insert_ActivatedNFC_Patient)

    app.route('/general/insert/Action_Performed/:action_id/:room_id/:appointment_id/:start_time/:end_time/:provider_id/:action_date') 
        .post(insertAPI.insert_Action_Performed)

}


