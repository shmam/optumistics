'use strict';
module.exports = function(app) {
  var insertAPI = require('../controller/postController.js');
  var selectAPI = require('../controller/getController.js');

  app.route('/portal/add/time/:provider_id/:action_id') // time for each doctor for each tasks (RT)
        .get(selectAPI.add_time_provider_task_rt)

   app.route('/portal/add/time/:provider_id/:action_id/:start_date/:end_date')  // time for each doctor for each tasks (C)
        .get(selectAPI.add_time_provider_task_c)

    app.route('/portal/average/time/:action_id/:provider_id') // get time taken for each task for each doctor (RT)
        .get(selectAPI.getTimeEachDoctor_RT)

    app.route('/portal/average/time/:action_id') // get time taken for each task for all doctors (RT)
        .get(selectAPI.getTimeAllDoctors_RT)

    app.route('/portal/average/time/:action_id/:provider_id/:start_date/:end_date') // get time taken for each task for each doctor (C)
        .get(selectAPI.getTimeEachDoctorDates_C)

    app.route('/portal/average/time/:action_id/:start_date/:end_date') // get time taken for each task for all doctors (C)
        .get(selectAPI.getTimeAllDoctorsDates_C)

    app.route('/dashboard/present/actions/:status_name') // get all actions where status is active
        .get(selectAPI.select_active_actions)

    app.route('/dashboard/present/actions') // get all actions
        .get(selectAPI.select_all_actions) 

    app.route('/portal/present/providers/:status_name') // get all providers
        .get(selectAPI.select_active_providers)

    app.route('/portal/present/duration/:action_id') // get all expected durations for each task
        .get(selectAPI.select_expected_duration)

    app.route('/portal/add/time/:provider_id') // time for each doctor (RT) ADD UP ALL TIME FOR EACH DOCTOR
        .get(selectAPI.total_time_for_each_doctor)

    app.route('/portal/add/time/:provider_id/:start_date/:end_date') // time for each doctor (C)
        .get(selectAPI.total_time_each_doctor_range)

    app.route('/portal/signin/providers/:username') // get the password from provider_information to match username
        .get(selectAPI.provider_sign_in)

    app.route('/portal/present/Person_Type') // get all provider person types
        .get(selectAPI.select_person_type)

    app.route('/portal/present/time_waited/:patient_id') // select the time waited for appointment(RT)
        .get(selectAPI.select_time_waited_appointment_id_RT)

    app.route('/portal/present/avg/timme_waited/:appointment_type_id') // select the average time waited for a certain appointment type (RT)
        .get(selectAPI.select_time_waited_appointment_type_RT)

     app.route('/portal/present/time_waited/:patient_id/:start_date/:end_date') // select the time waited for appointment (C)
        .get(selectAPI.select_time_waited_appointment_id_C)

    app.route('/portal/present/avg/timme_waited/:appointment_type_id/:start_date/:end_date') // select the average time waited for a certain appointment type (C)
        .get(selectAPI.select_time_waited_appointment_type_C)

    app.route('/portal/present/Activated_NFC_Patients') // select all of the activated NFC patients
        .get(selectAPI.select_activated_NFC_Patients)

    app.route('/portal/present/Activated_NFC_Providers') // select all of the activated NFC providers
        .get(selectAPI.select_activated_NFC_Providers)

    app.route('/portal/present/Appointments') // select the appointments for today's date that haven't started yet
        .get(selectAPI.select_current_appointments)

    app.route('/portal/present/NFC_Bracelet/patient') // select the NFC bracelets designated for patients
        .get(selectAPI.select_NFC_Patients)

    app.route('/portal/present/NFC_Bracelet/provider') // select the NFC bracelets designated for providers
        .get(selectAPI.select_NFC_Providers)

    app.route('/portal/present/Patient/name') // select the patients' name and patient id
        .get(selectAPI.select_Patient_Name)

    app.route('/portal/present/Provider/name') // select the providers' name based on provider id
        .get(selectAPI.select_Provider_Name_NotActive)

    app.route('/portal/present/Appointment_Type/name') // select appointment name and appointment id
        .get(selectAPI.select_Appointment_Type_Name)

    app.route('/portal/present/Flag_Color/name') // select available flag color that hasn't been used
        .get(selectAPI.select_Flag_Color)

    app.route('/portal/present/patientWaitTime/:date') // select patient wait time based on certain date
        .get(selectAPI.select_patient_wait_time)

    app.route('/portal/present/npsScore') // select avg NPS score
        .get(selectAPI.select_Average_NPS)

    app.route('/dashboard/verification/nfc') // select activaedNFC Provider
        .get(selectAPI.select_ActiveNFCProvider)
    
    app.route('/dashboard/verification/nfc/patient') // select activatedNFC Patient
        .get(selectAPI.select_ActiveNFCPatient)
    
    app.route('/dashboard/verification/provider/:nfc_hex') // select provider id based on NFC hex value
        .get(selectAPI.select_provider_id_by_NFC)

    app.route('/portal/checkDuplicate/Actions/flag_color_id') // select flag_color_id where it has duplicate color in Actions Table
        .get(selectAPI.select_dup_flag_color_id)

    app.route('/dashboard/verification/patient/:nfc_hex') // select patient id based on NFC hex value
        .get(selectAPI.select_patient_id_by_NFC)
    
    app.route('/portal/present/wait_time/:start_date/:end_date') // select comprehensive patient wait time (start date -> end date)
        .get(selectAPI.get_patient_wait_time_C)
    
    app.route('/dashboard/present/Question') // select all questions
        .get(selectAPI.get_question);

    app.route('/queue/present/appointment_information/:patient_id') // select patient's appt info based on their patient id
        .get(selectAPI.select_appointment_information_for_patient_id)
    
    app.route('/queue/present/wait_time/:appointment_date/:provider_id/:expected_start_time') // select patient queue time
        .get(selectAPI.select_patient_queue_time)

    app.route('/queue/present/queue_position/:appointment_date/:provider_id') // select patient's queue position
        .get(selectAPI.select_queue_position)
    
    app.route('/queue/text_alert') // get text alert
        .get(selectAPI.get_text_alert)
    
    app.route('/light/select_light') // select light color
        .get(selectAPI.get_light)

    /* ------------------------------------------------------------------------------------------------------------------------------------------------------- */

    //Post Functions Routes

    app.route('/general/insert/Person_Type/:person_type_name') // insert person type
        .post(insertAPI.insert_Person_Type)

    app.route('/general/insert/Question/:question') // insert question
        .post(insertAPI.insert_Question)

    app.route('/general/insert/Flag_Color/:flag_color_name/:flag_hex') // insert flag color
        .post(insertAPI.insert_Flag_Color)

    app.route('/general/insert/Appointment_Type/:appointment_name/:appointment_duration') // insert appt type
        .post(insertAPI.insert_Appointment_Type)

    app.route('/general/insert/Status/:status_name') // insert status
        .post(insertAPI.insert_Status)

    app.route('/general/insert/NFC_Bracelet/:provider_nfc/:status_id/:nfc_hex') // insert NFC bracelet
        .post(insertAPI.insert_NFC_Bracelet)

    app.route('/general/insert/Room/:room_name/:status_id') // insert room info
        .post(insertAPI.insert_Room)

    app.route('/general/insert/Survey_Activity/:patient_id/:rating/:rating_date/:question_id') // insert survey activity
        .post(insertAPI.insert_Survey_Activity)

    app.route('/general/insert/Patient_Information/:patient_first_name/:patient_last_name/:person_type_id') // insert patient info
        .post(insertAPI.insert_Patient_Information)

    app.route('/general/insert/Provider_Information/:provider_first_name/:provider_last_name/:provider_username/:provider_password/:person_type_id/:status_id') // insert provider info
        .post(insertAPI.insert_Provider_Information)

    app.route('/general/insert/Actions/:action_name/:flag_color_id/:button_label/:action_duration/:status_id/:icon') // insert actions
        .post(insertAPI.insert_Actions)

    app.route('/general/insert/ActivatedNFC_Provider/:provider_id/:room_id/:nfc_id') // insert ActivatedNFC Provider
        .post(insertAPI.insert_ActivatedNFC_Provider)

    app.route('/general/insert/Appointment/:start_time/:end_time/:patient_id/:appointment_type_id/:status_id/:appointment_date/:expected_start_time/:expected_end_time/:provider_id')
        .post(insertAPI.insert_Appointment)

    app.route('/general/insert/ActivatedNFC_Patient/:room_id/:appointment_id/:nfc_id')
        .post(insertAPI.insert_ActivatedNFC_Patient)

    app.route('/general/insert/Action_Performed/:action_id/:room_id/:appointment_id/:start_time/:end_time/:provider_id/:action_date')
        .post(insertAPI.insert_Action_Performed)

    app.route('/general/update/flag_status/on/:action_id')
        .post(insertAPI.update_Flag_Status_On)

    app.route('/general/update/flag_status/off/:action_id')
        .post(insertAPI.update_Flag_Status_Off)

    app.route('/general/update/flag_color/:action_id/:flag_color_id')
        .post(insertAPI.update_Flag_Color)
    
    app.route('/general/update/appointment_end_time/:appointment_id/:isPatient')
        .post(insertAPI.end_appointment)
    
    app.route('/queue/update/text_alert/:appointment_id/:patient_id/:phone_number')
        .post(insertAPI.update_text_alert)
    
    app.route('/light/post/:light_rgb')
        .post(insertAPI.insert_light)
}
