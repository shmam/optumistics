/** this file handles the javascript aspect of the registry page */


/** global variables */
var $appointmentID;
var thisShit;
//Function To Display Popup
/** retrieves data from the backend for all of the drop down boxes when the page is loaded */
$( document ).ready(function(){

  /** populates the drop down menu in the 'start appointment' page with patient names with appointments in the future of the current day */
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'http://optumistics-dev.us-east-1.elasticbeanstalk.com/portal/present/Appointments', //Connect to db
      success: function(bracelets) {

      $.each(bracelets, function(i, brace)
      {
        //displays patient first and last name in drop down menu while storing the appointment id for each name
        $("#patientSignUp").append("<option id=" +brace.appointment_id +" value = " + i + ">"+ brace.patient_first_name + " " + brace.patient_last_name + "</option>");
      });
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
    },

});

//populates the drop down menu in the 'provider NFC registration' page with available NFC ids
$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'http://optumistics-dev.us-east-1.elasticbeanstalk.com/portal/present/NFC_Bracelet/provider',
    success: function(data) {
      $.each(data, function(i, brace)
      {
        //displays available nfc ids in the drop down from the backend db
        $("#available-nfc").append("<option value = " + i + ">"+ brace.nfc_id + "</option>");
      });
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
    },
});

//populates the drop down in the 'provider registration' page with provider types
$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'http://optumistics-dev.us-east-1.elasticbeanstalk.com/portal/present/Person_Type',
    success: function(data) {
      $.each(data, function(i, brace)
      {
        //displays all the available provider types (ma, nurse, doctor) in the drop down menu and stores the corresponding person type ID
        $("#person-type").append("<option id=" +brace.person_type_id +" value = " + i + ">"+ brace.person_type_name + "</option>");
      });
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
    },
});

//populates the drop down menu in the 'provider NFC registration' window with unassigned provider first and last names
$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'http://optumistics-dev.us-east-1.elasticbeanstalk.com/portal/present/Provider/name',
    success: function(data) {
      $.each(data, function(i, brace)
      {
        //displays the first and last name of all providers with no NFC assigned to them and stores the corresponding provider id for each option
        $("#provider-id").append("<option id=" +brace.provider_id +" value = " + i + ">"+ brace.provider_first_name + " " + brace.provider_last_name + "</option>");
      });
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
    },
});

//poulates the drop down box in the 'new appointment' page with different appointment type names
$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'http://optumistics-dev.us-east-1.elasticbeanstalk.com/portal/present/Appointment_Type/name',
    success: function(data) {
      $.each(data, function(i, brace)
      {
        //displays the various appointment types as options in the drop down and stores the corresponding appointment type id
        $("#appointment_appointment_type_id").append("<option class='swag2' id=" +brace.appointment_type_id +" value = " + i + ">"+ brace.appointment_name + "</option>");
      });
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
    },
});

$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'http://optumistics-dev.us-east-1.elasticbeanstalk.com/portal/present/Patient/name',
    success: function(data) {
      $.each(data, function(i, brace)
      { //Get every entry in the NFC db that are PROVIDERS
        $("#appointment_patient_id").append("<option class='swag4' id=" +brace.patient_id +" value = " + i + ">"+ brace.patient_first_name + " " + brace.patient_last_name + "</option>");
      });
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
    },
});

});



$('#signInButton').click(function()
{

$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'http://optumistics-dev.us-east-1.elasticbeanstalk.com/portal/present/NFC_Bracelet/patient',
    success: function(data) {
      $.each(data, function(i, brace)
      { //Get every entry in the NFC db that are PROVIDERS
        $("#dropNFC").append("<option value = " + i + ">"+ brace.nfc_id + "</option>");
        printShit();
      });
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
    },
});

});

$('#create_appointment').click(function() {
  if(document.getElementById('appointment_date').value == "")
  {
    alert("please choose a valid date for the appointment and try again");
  }

  else {
    var start_int = parseInt($('#appointment_start_time_hr').val());
    if(document.getElementById('am_pm_start').value == 'pm' && start_int != 12)
    {
      var expected_start_time = (12 + start_int) + ":" + $('#appointment_start_time_min').val();
    }
    else {
      var expected_start_time = $('#appointment_start_time_hr').val() + ":" + $('#appointment_start_time_min').val(); // getting Appointment Start Time val()
    }

    /**if(document.getElementById('am_pm_end').value == 'pm')
    {
      var end_int = parseInt($('#appointment_end_time_hr').val());
      var appointment_end_time = (12 + end_int) + ":" + $('#appointment_end_time_min').val();
    }
    else {
      var appointment_end_time = $('#appointment_end_time_hr').val() + ":" + $('#appointment_end_time_min').val(); // getting Appointment End Time val()
    }*/
    var appointment_end_time = null;
    var appointment_patient_id = $("#appointment_patient_id option:selected").attr("id"); // getting Appointment Patient ID val()
    var appointment_appointment_type_id = $("#appointment_appointment_type_id option:selected").attr('id'); // getting Appointment Type ID val(). If null, type in null.
    var appointment_status_id = 74; // getting Appointment Status ID val()
    var appointment_date = $('#appointment_date').val(); // getting Appointment Date val()
    var appointment_start_time = null;
    console.log(expected_start_time);
    $.ajax({
        type: "POST",
        url: "http://optumistics-dev.us-east-1.elasticbeanstalk.com/general/insert/Appointment/" +appointment_start_time +'/' +appointment_end_time +'/'
        +appointment_patient_id +'/' +appointment_appointment_type_id +'/' +appointment_status_id +'/' +appointment_date + '/' +expected_start_time,
        success: function (insert_status) {
            $("#insert_status").append("Successful Insertion of Appointment</br>");
            hide_appt();
            //alert("appointment successfully added to schedule");
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });
  }
});

$('#submitTheNFC').click(function()
{

  if(document.getElementById('dropNFC').value == "")
  {
    alert("There currently are no available NFC badges");

  }
  else if(document.getElementById('patientSignUp').value == "")
  {
    alert("There are no future scheduled appointments for the day");
  }

  else {


  var activatednfc_patient_room_id = null;  // getting Room ID val() If null, type in null.
  var activatednfc_patient_appointment_id = $("#patientSignUp option:selected").attr('id');  // getting Appointment ID val()
  var activatednfc_patient_nfc_id = $("#dropNFC option:selected").text();  // getting Patient NFC ID val()
  console.log(activatednfc_patient_appointment_id);
  console.log(activatednfc_patient_nfc_id);
  $.ajax({
      type: "POST",
      url: "http://optumistics-dev.us-east-1.elasticbeanstalk.com/general/insert/ActivatedNFC_Patient/" +activatednfc_patient_room_id +'/'
      +activatednfc_patient_appointment_id +'/' +activatednfc_patient_nfc_id,
      success: function (insert_status)
      {
          console.log("SUCCESS!!!");

          div_hide(); //Close the window
          //alert("The patient has officially been signed in!"); //Alert the user that the connection has been successful.
      },
      error: function (xhr, status, error) {
          console.log('Error: ' + error.message);
      },
  });
}

});

$("#continue").click(function(){
  if($('#first-name').val() == "" || $('#last-name').val()== "" || $('#username').val()== "" || $('#password').val()== "" || $('#confirm-password').val()== "" || document.getElementById('person-type').value == 'select')
  {
    alert("please fill out missing fields and try again");

  }

  //alert(document.getElementById('password').value != document.getElementById('confirm-password').value);

  else if(document.getElementById('password').value != document.getElementById('confirm-password').value)
  {
    alert("the passwords you entered do not match, please try again");
    document.getElementById('confirm-password').value = "";
    document.getElementById('password').value = "";

  }

  else{

  var provider_first_name = $('#first-name').val(); // getting Provider First Name val()
  var provider_last_name = $('#last-name').val(); // getting Provider Last Name val()
  var provider_username = $('#username').val(); // getting Provider Username val()
  var provider_password = $('#password').val(); // getting Provider Password val()
  //var provider_person_type_id = $("#person-type").find(":selected").text();// getting Provider Person Type ID val()
  var provider_person_type_id = $("#appointment_appointment_type_id option:selected").attr('id'); // getting Provider ID val()
  //the next two lines encrypt the password
  //var encryptedData = CryptoJS.SHA256(provider_password);
  //var password_hash = encryptedData.toString(CryptoJS.enc.Hex);
  $.ajax({
      type: "POST",
      url: "http://optumistics-dev.us-east-1.elasticbeanstalk.com/general/insert/Provider_Information/" +provider_first_name +'/' +provider_last_name +'/' +provider_username +'/'
      +provider_password +'/' +provider_person_type_id +'/' + "74",
      success: function (insert_status) {
        if(insert_status == "The username must be unique")
        {
          alert("This username is already taken, please choose another username and try again.");
        }
        else {
          hide_div();
        }
      },
      error: function (xhr, status, error) {
          console.log('Error: ' + error.message);
      },
  });

}
});


$("#patient_continue").click(function(){
  if($('#patient-first-name').val() == "" || $('#patient-last-name').val()== "")
  {
    alert("please fill out missing fields and try again");

  }

  else {
    var patient_first_name = $('#patient-first-name').val(); // getting Patient First Name val()
    var patient_last_name = $('#patient-last-name').val(); // getting Patient Last Name val()
    var patient_person_type_id = 18; // getting Patient Person Type ID val()
        $.ajax({
           type: "POST",
           url: 'http://optumistics-dev.us-east-1.elasticbeanstalk.com/general/insert/Patient_Information/' +patient_first_name +'/' +patient_last_name +'/' +patient_person_type_id,
           success: function(insert_status) {
               $('#insert_status').append("Successful Insertion of Patient</br>");
               hide_div5();


           },
           error: function(xhr, status, error) {
               console.log('Error: ' +error.message);
           },
        });
      }
    });



$("#assign-NFC").click(function(){
  if(document.getElementById('available-nfc').value== "")
  {
    alert("There are no available NFC badges to be assigned");

  }

  else if(document.getElementById('provider-id').value == "")
  {
      alert("Make sure you register a provider before assigning an NFC");

  }

else {


var activatednfc_provider_id = $("#provider-id option:selected").attr('id'); // getting Provider ID val()
var activatednfc_provider_room_id = $("#activatednfc_provider_room_id").val(); // getting Room ID val() If null, type in null.
var activatednfc_provider_nfc_id = $("#available-nfc").find(":selected").text(); // getting Provider NFC ID val()


$.ajax({
    type: "POST",
    url: "http://optumistics-dev.us-east-1.elasticbeanstalk.com/general/insert/ActivatedNFC_Provider/" +activatednfc_provider_id +'/10/' +activatednfc_provider_nfc_id,
    success: function (insert_status) {
        $("#insert_status").append("Successful Insertion of Acitvated Provider NFC</br>");
        //alert("Provider successfully assigned NFC");
        hide_nfc();
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
    },
});
}
});

function printShit(){
  thisShit = $("#patientSignUp").find(":selected").text();
  console.log(thisShit);
}
function div_show2() {
document.getElementById('registerNFC').style.display = "block";
}
//Function to Hide Popup
function div_hide2(){
document.getElementById('registerNFC').style.display = "none";
}

function div_show() {
document.getElementById('abc').style.display = "block";
}
//Function to Hide Popup
function div_hide(){
document.getElementById('abc').style.display = "none";
$('dropNFC').empty();
window.location.reload();
//$('#patientSignUp').empty();

}

//Function to Hide Popup
function div_hidex(){
document.getElementById('abc').style.display = "none";

}

//END OF THE FOLLOWING SCRIPT THAT WORKS FOR THE POPUP!!!!
function w3_open() {
  document.getElementById("main").style.marginLeft = "20%";
  document.getElementById("mySidebar").style.width = "20%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';

}
function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}


function show_div3() {
document.getElementById('nfc-avail').style.display = "block";

}

//Function To Display Popup
function show_nfc() {
document.getElementById('abc3').style.display = "block";
}
//Function to Hide Popup
function hide_nfc(){
document.getElementById('abc3').style.display = "none";
window.location.reload();
}

//Function to Hide Popup
function hide_nfcx(){
document.getElementById('abc3').style.display = "none";
}

//Function To Display Popup
function show_appt() {
document.getElementById('abc4').style.display = "block";
}
//Function to Hide Popup
function hide_apptx(){
document.getElementById('abc4').style.display = "none";
}

//Function to Hide Popup
function hide_appt(){
document.getElementById('abc4').style.display = "none";
window.location.reload();
}

//Function To Display Popup
function show_div() {
document.getElementById('abc2').style.display = "block";
}
//Function to Hide Popup
function hide_divx(){

document.getElementById('abc2').style.display = "none";
}

//hides popup and refreshes page
function hide_div(){
window.location.reload();
document.getElementById('abc2').style.display = "none";

}

//Function To Display Popup
function show_div5() {
document.getElementById('abc5').style.display = "block";
}
//Function to Hide Popup
function hide_divx5(){

document.getElementById('abc5').style.display = "none";
}

//hides popup and refreshes page
function hide_div5(){
window.location.reload();
document.getElementById('abc5').style.display = "none";

}

$(document).ready(function(){
      var date_input=$('input[name="date"]'); //our date input has the name "date"
      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options={
        format: 'yyyy-mm-dd',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
      date_input.datepicker(options);
 })
