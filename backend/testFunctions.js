var config = require('./config.js')

var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
    + config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';
    
var test = require('../testConnection.js')
var insert = require('./insertAPI.js')
var select = require('./selectionAPI.js')

/*
ORDER OF THE INSERT CASES
1. Status
2. Appointment_Type
3. Question 
4. Actions 
5. Person_Type
6. Patient_Information
7. Provider_Information
8. Survery_Activity
9. Room 
10. Action_Performed
11. NFC_Bracelet
12. ActivatedNFC_Provider 
13. ActivatedNFC_Patient
*/

//RUN THROUGH AND MAKE SURE THE ARGUMENTS MATCH UP 
test.testConnection()
insert.insert_Status("test_status_name")

insert.insert_Appointment_Type("test_appointemnt_name",10)

insert.insert_Question("test_question")

var test_status_id = select.select_status_id("test_status_name")
insert.insert_Actions("test_action_name","test_flag_color","test_button_label", "test_action_duration",test_status_id,"test_icon")

insert.insert_person_type("test_person_type_name")

var test_person_type_id = select.select_person_type_id("test_person_type_name")
insert.insert_Patient_Information("test_patient_first_name", "test_patient_last_name","test_patient_gender",test_person_type_id)

insert.insert_Provider_Information("test_provider_first_name","test_provider_last_name","test_provider_gender","test_provider_username","test_provider_password",test_person_type_id,test_status_id)

var test_patient_id = select.select_patient_id("test_patient_first_name")
var test_question_id = select.select_question_id("test_question")
insert.insert_Survey_Activity(test_patient_id,"test_rating","test_rating_date",test_question_id)

insert.insert_Room("test_room_name",test_status_id)

var test_action_id = select.select_action_id("test_action_name")
var test_room_id = select.select_room_id("test_room_name")
var test_provider_id = select.select_provider_id("test_provider_first_name")
insert.insert_Action_Performed(test_action_id,"test_action_date", test_room_id, test_patient_id,"test_time_taken",test_provider_id)

insert.insert_NFC_Bracelet(test_status_id)

var test_NFC_id = select.select_NFC_id(test_status_id)
insert.insert_ActivatedNFC_Provider(test_provider_id,test_room_id,test_NFC_id)

var test_appointment_id = select.select_appointment_id("test_appointment_name")
insert.insert_ActivatedNFC_Patient(test_patient_id,test_room_id,test_appointment_id,test_NFC_id)