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
///////////////////////////////////////////////////////////////////////
var startHours;
var startMinutes;
var startSeconds;
var sendStartTime;
///////////////////////////////////////////////////////////////////////
var endHours;
var endMinutes;
var endSeconds;
var sendEndTime;

/*
  New Object of Card.
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
      
      $.each(friends, function(i, friend){
        console.log(friend.button_label);
        $("#"+i+" .header").text(friend.button_label);
        console.log(friend.flag_hex);
        $("#"+i+" .front").css('background-color', friend.flag_hex);
        $("#"+i+" .back").css('background-color', friend.flag_hex);
        $("#"+i).show();
        

        if((i==0 && friends.length>1) || (i==1 &&friends.length>2) ||(i==3 && friends.length>4) || (i==4 && friends.length>5)){
          $(".vline"+i).show();
        }
      });
      //  <div class = "w3-col w3-shadow card" hidden id = "1" style = "margin-top: 2%;width: 31%; height: 94%;"> <!-- The first column of the first row -->
      //       <div class = "front" style = "width: 95%; height: 95%; background: rgba(52, 152, 219, 0.8);">
      //           <h2 class= "header" style = "font-size: 48px;font-family: 'Cabin', sans-serif; float: right; margin-top: 0; margin-right: 3%;color: white;">VITAL SIGNS</h2> <!--Name of Operation: Vital Signs -->
      //           <img src = "img/tPhone.png" style = "width: 100px; height: 100px;margin-top: 175px; margin-left: 75%;font-size: 48px; color: #ffffff" class="callB" id = "1" onclick = "openNav(2)">
      //       </div>
      //       <div class = "back" style = "width: 95%; height: 95%; background:rgba(52, 152, 219, 0.8); text-align:center;">
      //           <span class = "sec" id="seconds1" style = "font-size: 128px;color: #fff">00</span><span style = "font-size: 48px; color: #fff">:</span>
      //           <span class = "ten" id = "tens1" style = "font-size:  128px;color: #fff">00</span></br>
          
      //       </div>
      //   </div>
            
    
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + error.message);
    },

  });
});

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

function openSocket(){
  console.log("Socket Open");
  socket.send("Hwllo server");

}

function showData(result){
  //when the server returns, record the result
  
  if(!popupFlag){
    nfcHex = result.data;
    if(isPolling){
        allowAccess(nfcHex);
    }
  }
  console.log(isPolling);

}

function allowAccess(hexCode)
{
  console.log("Allow Access!");
  hexCode = hexCode.substring(1,20);
  var validCard = false;
  
  if(hexCode !== null)
   {
    for(var i = 0; i < nfcArray.length; i++)
     {
      if(hexCode === nfcArray[i]){
        validCard = true;
        break;
      }
	
    }
	
    if(validCard){
      
      ajaxCallGetProviderId(hexCode);
      closeNav();
    }
    else{
      popupFlag = true;
      var r = confirm("this NFC Card is not valid");
      popupFlag = false;
    }
  }
}

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

function clearAllCards(i){

    cards[i].seconds = 00; //seconds for the timer
    cards[i].tens = 00;//tens for the timer
    cards[i].htmlSeconds.text("00") ; //htmlSeconds
    cards[i].htmlTens.text("00") ;
    cards[i].isEnabled = false;
}

$(".callB").click(function(){

  var flipCard = $(this).attr('id');
  //openNav(flipCard+1)
  okjay++;
  var appendString = "#" + flipCard;
  //alert(appendString)

})

function openNav(number)
{
  //timeDisplayed = 1;
  isPolling = true;


  if (cardRunning === false)
  {
    document.getElementById("myNav").style.height = "100%";
  }
  if (number === 1){

    document.getElementById("myNav").style.background = "rgba(231, 76, 60, 1)";
  }
  else if (number === 2){

    document.getElementById("myNav").style.background = "rgba(52, 152, 219, 1)";
  }
  else if (number === 3){
    document.getElementById("myNav").style.background = "rgba(46, 204, 113, 1)";
  }
  else if (number === 4)
  {
    document.getElementById("myNav").style.background = "rgba(155, 89, 182, 1)";
  }
  else if (number === 5)
  {
    document.getElementById("myNav").style.background = "rgba(241, 196, 15, 1)";
  }
  else if (number === 6)
  {
    document.getElementById("myNav").style.background = "rgba(52, 73, 94, 1)";
  }


}
function closeNav()
{
    isPolling = false;
    document.getElementById("myNav").style.height = "0%";

}

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
        startHours = date.getHours();
        startMinutes = date.getMinutes();
        startSeconds = date.getSeconds();
        sendStartTime = startHours + ":" + startMinutes + ":" + startSeconds;
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
           endHours = date2.getHours();
           endMinutes = date2.getMinutes();
           endSeconds = date.getSeconds();
           sendEndTime = endHours + ":" + endMinutes + ":" + endSeconds;
           console.log(sendEndTime);
           ajaxCallSendTime(sendStartTime, sendEndTime, cards[flipCard].operation_id, sessionStorage.getItem("current_provider_id"));
           $(appendString).flip(false); //Flip the card back.
           clearAllCards(flipCard);

         }
         else
         {
           okjay++;
           //Continue the timer.
         }
       }

    }
  });

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

function ajaxCallNFC(){
  $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: baseUrl + '/dashboard/verification/nfc',
      success: function(data) {
        $.each(data, function(i, brace)
        { //Get every entry in the NFC db that are PROVIDERS
            nfcArray.push(String( brace.nfc_hex));
            console.log(nfcArray);
        });
      },
      error: function (xhr, status, error) {
          console.log('Error: ' + error.message);
      },
  })
};

function ajaxCallSendTime(startTime, endTime, action_id, provider_id){

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

function ajaxCallGetProviderId(hexcode){
  $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: baseUrl + '/dashboard/verification/provider/' + hexcode,
      success: function(data) {
	console.log(data[0].provider_id);
	sessionStorage.setItem("current_provider_id",data[0].provider_id);

      },
      error: function (xhr, status, error) {
          console.log('Error: ' + error.message);
      },
  })

}

function endAppointment() {
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
   window.location.href = "landingpage.html";
} 
