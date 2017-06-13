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


test.testConnection()
insert.insert_Status("test_status_name")
insert.insert_Appointment_Type("test_appointemnt_type",10)
insert.insert_Question("test_question")

insert.insert_Actions("test_action_name","test_flag_color","test_button_label", "test_action_duration",select.select_status_id("test_status_name"),"test_icon")
insert.insert_person_type("test_person_type_name")
insert.insert_Patient_Information("test_patient_first_name", "test_patient_last_name","test_patient_gender",)