var config = require('./config.js')

var db = require('odbc')(), cn = 'DRIVER=' + config.driver + ';PORT=1433;SERVER='
    + config.server + ';PORT=1443;DATABASE=' + config.database + ';Trusted_Connection=yes';
    
var select = require('../testConnection.js')
var insert = require('./insertAPI.js')

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


select.testConnection()
insert.insert_Status("test_status_name")
insert.insert_Appointment_Type("test_appointemnt_type",10)
insert.insert_Question("test_question")
//Ruh Roh we need to get the status id from the insert status function that is above
insert.insert_Actions()
