/*
  The following JavaScript file will mostly be used for the dayDash.html page
  TOB:
    -Global variables - Lines 9 - 35
    -jQuery functions - Lines 38 - 164
    -Helper functions - Lines 168 - 521
*/

/*
  ---------------------------------------------GLOBAL VARIABLES------------------------------------------
  The following sections are the instantiations of variables used throughout the code..
*/
const baseUrl = 'http://applicationDashboard.us-east-1.elasticbeanstalk.com';
var Interval;
var counter = 0;
var okjay = 0;
var cardRunning = false; //Is there a card running in the program?
var socket = new WebSocket("ws://localhost:8080")
var nfcHex = null;
var popupFlag = false;
var nfcArray = [];
var validCard = false;
var isPolling = false;
var startHours;
var startMinutes;
var startSeconds;
var sendStartTime;
var endHours;
var endMinutes;
var endSeconds;
var sendEndTime;
var hexArr=[];
/*
  --------------------------------------------END of GLOBAL VARIABLES--------------------------------------
*/

/*
  -------------------------------------------JQUERY FUNCTIONS---------------------------------------------
  The following jQuery functions are involved with AJAX functions to gather data for the statistics.
*/

/*
    This jQuery function will run an aJAX call that will get all the operations that are active. This will determine how many cards are on the screen.
*/

$( document ).ready(function() {
    $.ajax({
    type: 'GET',
    url: 'http://applicationDashboard.us-east-1.elasticbeanstalk.com'+"/dashboard/present/actions/active",
    contentType: 'application/x-www-form-urlencoded',
    jsonpCallback: 'callback',
    dataType : 'jsonp',   //you may use jsonp for cross origin request
    //crossDomain:true,
    success: function(friends) {
      console.log(friends)

      $.each(friends, function(i, friend)
      {
        $("#"+i+" .header").text(friend.button_label); //This will determine the text on the card based on the ajax call...
        $("#"+i+" .front").css('background-color', friend.flag_hex); //This will determine the color of the card based on what color the operation is...
        $("#"+i+" .back").css('background-color', friend.flag_hex); //This will determine the color of the card based on what color the operation is...
        $("#"+i).show();  //Show the card on the dashboard screen with the specified dimensions.


        if((i==0 && friends.length>1) || (i==1 &&friends.length>2) ||(i==3 && friends.length>4) || (i==4 && friends.length>5))
        {
          $(".vline"+i).show();
        }
      });
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
    },

  });

});

$(".callB").click(function(){

  var flipCard = $(this).attr('id');
  //openNav(flipCard+1)
  okjay++;
  var appendString = "#" + flipCard;
  //alert(appendString)

})
/*
  This jQuery function will get the times to be sent to the database once the card has been flipped back to its original state...
*/
$('.card').click(function()
{
    okjay++;
    console.log(okjay);
    var date = new Date();  //Sets a new date and time...

    //var startTimers = startTimer.bind(cards[flipCard].tens, cards[flipCard].seconds, cards[flipCard].htmlSeconds, cards[flipCard].htmlTens);
    var flipCard = $(this).attr('id');
    var appendString = "#" + flipCard; //Find the ID of the card that is clicked.
    if (cardRunning === false && okjay % 2 !== 0 ) //If there is NOT a card that is running a timer......
    {
      $(appendString).flip(true); //Flip the card that was clicked
        cardRunning = true; //The card is now running a timer
        cards[flipCard].isEnabled = true; //That specific card is now running a timer.
        clearInterval(Interval);
        Interval = setInterval(function(){startTimer(flipCard)}, 1000); //Start timer
        startHours = date.getHours(); //Get the hours of the time.
        startMinutes = date.getMinutes(); //Get the minutes of the time.
        startSeconds = date.getSeconds(); //Get the seconds of the time.
        sendStartTime = startHours + ":" + startMinutes + ":" + startSeconds; //Make all them a string.
        console.log(sendStartTime);
      }
    else //If there IS a timer running...
    {
       if (cards[flipCard].isEnabled) //If the card clicked has a timer running
       {
         var group = confirm("Would you like to submit this time");
         if (group)
         {
           clearInterval(Interval); //Stop the timer.
           cardRunning = false; //There is no timer that is now running anymore
           cards[flipCard].isEnabled = false; //That specific card is not running anymore.
           //MAKE THE AJAX CALL
           //
           var date2 = new Date();
           endHours = date2.getHours(); //Get the hours of the time.
           endMinutes = date2.getMinutes(); //Get the minutes of the time.
           endSeconds = date.getSeconds();  //Get the seconds of the time.
           sendEndTime = endHours + ":" + endMinutes + ":" + endSeconds;  //Make them all one string.
           console.log(sendEndTime);
           ajaxCallSendTime(sendStartTime, sendEndTime, cards[flipCard].operation_id, sessionStorage.getItem("current_provider_id")); //Post the time into the DB using an AJAX POST function.
           $(appendString).flip(false); //Flip the card back.
           clearAllCards(flipCard);

         }
         else
         {
           okjay++; //Continue the timer.
         }
       }

    }
  });

  /*
    This function does the animation flip from the JS plugin.
  */

  $(".card").flip(
  {
      axis: 'y',
      trigger: 'manual'
  });

  $(document).ready(function()
  {
    ajaxCallNFC();
    document.getElementById('name_div').innerHTML = sessionStorage.getItem("patient_name")

  });

/*
  -------------------------------------------END OF JQUERY FUNCTIONS---------------------------------------------
*/

/*
  -------------------------------------------HELPER FUNCTIONS-----------------------------------------------------
*/


/*
  Instantiate a new CARD object that has the following properties...
*/
var Card = function(operation, operation_id){
  this.startTimeDisplayed = false; //Each card will have a START TIME...each card will start out not having a start time displayed...
  this.endTimeDisplayed = false; //Each card will have a END TIME...each card will start out not having a end time displayed....
  this.callDisplayed = false; //Each card will have a "call" option...the call screen will start out not being displayed....
  this.cardOperation = operation;//Each card will have an operation name assigned to it...
  this.operation_id = operation_id;
  this.id = ""; //Each card will have an element based on the HTML
  this.seconds = 00; //seconds for the timer
  this.tens = 00;//tens for the timer
  this.htmlSeconds = ""; //htmlSeconds
  this.htmlTens = "";
  this.isEnabled = false; //Is the card running a timer?
};
/**
The following data is BRUTE FORCED data for the card functionalities.....
**/
var card0 = new Card("physical", 134);
card0.id = document.getElementById("0");
card0.htmlSeconds = document.getElementById("seconds0");
card0.htmlTens = document.getElementById("tens0");

///////////////////////////////////////////////////
var card1 = new Card("vital signs", 152);
card1.id = document.getElementById("1");
card1.htmlSeconds = document.getElementById("seconds1");
card1.htmlTens = document.getElementById("tens1");
///////////////////////////////////////////////////
var card2 = new Card("blood", 133);
card2.id = document.getElementById("2");
card2.htmlSeconds = document.getElementById("seconds2");
card2.htmlTens = document.getElementById("tens2");
///////////////////////////////////////////////////
var card3 = new Card("operations", 153);
card3.id = document.getElementById("3");
card3.htmlSeconds = document.getElementById("seconds3");
card3.htmlTens = document.getElementById("tens3");
///////////////////////////////////////////////////
var card4 = new Card("x-ray", 130);
card4.id = document.getElementById("4");
card4.htmlSeconds = document.getElementById("seconds4");
card4.htmlTens = document.getElementById("tens4");
///////////////////////////////////////////////////
var card5 = new Card("injection", 137);
card5.id = document.getElementById("5");
card5.htmlSeconds = document.getElementById("seconds5");
card5.htmlTens = document.getElementById("tens5");
////////////////////////////////////////////////////
/*
End of brute forced data entry
*/

var cards = [card0, card1, card2, card3, card4, card5];

socket.onopen = openSocket;
socket.onmessage = showData;

/*
  Runs the web socket.
*/
function openSocket()
{
  console.log("Socket Open");
  socket.send("Hwllo server");
}

/*
  when the server returns, record the result
*/
function showData(result)
{
  if(!popupFlag){
    nfcHex = result.data;
    if(isPolling){
        allowAccess(nfcHex);
    }
  }
  console.log(isPolling);

}

/*
  This function determines the control access of whether the NFC scanned is a provider/patient based on their NFC hex.
*/
function allowAccess(hexCode)
{
  console.log("Allow Access!");
  hexCode = hexCode.substring(1,20);  //Grab the NFC Hex.
  var validCard = false;  //Always starts out as as invalid card....

  if(hexCode !== null)  //If the hexcode scanned is not null then go through this if.
   {
    for(var i = 0; i < nfcArray.length; i++)  //Linear loop to check the NFC hex compared to all the other NFC hex that are registered.
     {
      if(hexCode === nfcArray[i]) //If they are the same....
      {
        validCard = true; //Then validCard is TRUE.
        break;
      }

    }
    if(validCard)
    {

      ajaxCallGetProviderId(hexCode);
      closeNav();
    }
    else
    {
      popupFlag = true;
      var r = confirm("this NFC Card is not valid");
      popupFlag = false;
    }
  }
}

/*
  This function is the timer functionality of our cards.
*/

function startTimer(flipCard)
{
  counter++;
  //console.log(counter);

  var tens = cards[flipCard].tens;
  var seconds = cards[flipCard].seconds;
  var cardTens = cards[flipCard].htmlTens;
  var cardSec = cards[flipCard].htmlSeconds;

  tens++;

  if(tens <= 9){
    //console.log(tens);
    cards[flipCard].tens = tens;
    cardTens.innerHTML = "0" + tens;
  }

  if (tens > 9){
    cardTens.innerHTML = tens;
    cards[flipCard].tens = tens;

  }
  if (tens > 59) {
    //console.log("seconds");
    seconds++;
    cardSec.innerHTML = "0" + seconds;
    cards[flipCard].seconds = seconds;
    tens = 0;
    cards[flipCard].tens = 0;
    cardTens.innerHTML = "0" + 0;
  }

  if (seconds > 9){
    cardSec.innerHTML = seconds;
    cards[flipCard].seconds = seconds;
  }

}

/*
    This function resets the time that was sent to the DB back to 0:00:00, for the next operation.
*/
function clearAllCards(i){

    cards[i].seconds = 00; //seconds for the timer
    cards[i].tens = 00;//tens for the timer
    cards[i].htmlSeconds.text("00") ; //htmlSeconds
    cards[i].htmlTens.text("00") ;
    cards[i].isEnabled = false;
}


/*
  This function runs when the call button is pressed on the card.
*/
function openNav(number)
{
  //timeDisplayed = 1;
  isPolling = true;


  if (cardRunning === false)  //If there is not a card running....
  {
    document.getElementById("myNav").style.height = "100%"; //Open the call screen
  }
  if (number === 1)
  {
    document.getElementById("myNav").style.background = hexArr[0];
    ajaxSendColor("red");
  }
  else if (number === 2)
  {

    document.getElementById("myNav").style.background = hexArr[1];
    ajaxSendColor("green");
  }
  else if (number === 3)
  {
    document.getElementById("myNav").style.background = hexArr[2];
    ajaxSendColor("magenta");
  }
  else if (number === 4)
  {
    document.getElementById("myNav").style.background = hexArr[3];
    ajaxSendColor("yellow");
  }
  else if (number === 5)
  {
    document.getElementById("myNav").style.background = hexArr[4];
    ajaxSendColor("cyan");
  }
  else if (number === 6)
  {
    document.getElementById("myNav").style.background = hexArr[5];
    ajaxSendColor("blue");
  }
  //API CALL TO TURN ON THE LIGHT.....


}
/*
  This function runs when the SCAN NFC button is pressed on the call screen...
*/
function closeNav()
{
    isPolling = false;
    document.getElementById("myNav").style.height = "0%";
    console.log("Run the API call...and turn off the light")
    ajaxSendColor("n")

}

/*
  This function will push all the valid NFC hex ID's into an array so when a provider scans a NFC..it can be checked whether it is valid or not.
*/
function ajaxCallNFC()
{
  $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: baseUrl + '/dashboard/verification/nfc',
      success: function(data) {
        $.each(data, function(i, brace)
        {
            nfcArray.push(String( brace.nfc_hex));  //Get every entry in the NFC db that are PROVIDERS
            console.log(nfcArray);
        });
      },
      error: function (xhr, status, error)
      {
          console.log('Error: ' + error.message);
      },
  })
};

/*
  This function will POST to the DB...the start time/end time of the operation specified..and then the doctor that did that operation.
*/
function ajaxCallSendTime(startTime, endTime, action_id, provider_id)
{

  var today = new Date();
  today = today.toISOString().substring(0, 10);

  $.ajax({
      type: 'POST',
      jsonpCallback: 'callback',

      url: baseUrl + '/general/insert/Action_Performed/'+String(action_id)+'/10/2/' + String(startTime) + '/' + String(endTime) + '/' + String(provider_id) + '/' + String(today),
      //url: baseUrl + 'general/insert/Action_Performed/' + String(action_id) + '/10/1/' + String(startTime) + '/' + String(endTime) + '/2290/' + String(today)
      success: function(data) {
        console.log("successful!" + startTime + " " + endTime);

      },
      error: function (xhr, status, error) {
          console.log('Error: ' + error.message);
      },
  })
};

/*
    This function will POST to the DB what color is CALLED...this will determine what color the light will be.
*/
function ajaxSendColor(color)
{
  $.ajax({
      type: 'POST',
      jsonpCallback: 'callback',
      url: baseUrl + '/light/post' + '/' + color,
      //url: baseUrl + 'general/insert/Action_Performed/' + String(action_id) + '/10/1/' + String(startTime) + '/' + String(endTime) + '/2290/' + String(today)
      success: function(data) {
        console.log("hehe");
      },
      error: function (xhr, status, error) {
          console.log('Error: ' + error.message);
      },
  })
};

/*
    This function will get provider ID to verify if they are a valid provider or not.
*/
function ajaxCallGetProviderId(hexcode){
  $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: baseUrl + '/dashboard/verification/provider/' + hexcode,
      success: function(data)
      {
	       console.log(data[0].provider_id);
	        sessionStorage.setItem("current_provider_id",data[0].provider_id);

      },
      error: function (xhr, status, error) {
          console.log('Error: ' + error.message);
      },
  })

}

/*
  This function ends the appointment by sending the information based on the appointment.
*/
function endAppointment()
{
   if(sessionStorage.getItem("current_appointment_id") !== '0'){

  	$.ajax({
   	   type: 'POST',
   	   jsonpCallback: 'callback',

   	   url: baseUrl + '/general/update/appointment_end_time/' + sessionStorage.getItem("current_appointment_id") +"/true",
   	   success: function(data) {
   	     console.log("updated appointment id yeet");

    	  },
    	  error: function (xhr, status, error) {
     	     console.log('Error: ' + error.message);
     	 },
  	})
   }
   window.location.href = "NPS.html"; //Go to the NPS page for the patient to fill out.
}
/*
  -------------------------------------------END HELPER FUNCTIONS-----------------------------------------------------
*/
