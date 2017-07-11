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

/*
  New Object of Card.
*/

var Card = function(operation){
  this.startTimeDisplayed = false; //Each card will have a START TIME...each card will start out not having a start time displayed...
  this.endTimeDisplayed = false; //Each card will have a END TIME...each card will start out not having a end time displayed....
  this.callDisplayed = false; //Each card will have a "call" option...the call screen will start out not being displayed....
  this.cardOperation = operation;//Each card will have an operation name assigned to it...
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
var card0 = new Card("physical");
card0.id = document.getElementById("0");
card0.htmlSeconds = document.getElementById("seconds0");
card0.htmlTens = document.getElementById("tens0");
///////////////////////////////////////////////////
var card1 = new Card("vital signs");
card1.id = document.getElementById("1");
card1.htmlSeconds = document.getElementById("seconds1");
card1.htmlTens = document.getElementById("tens1");
///////////////////////////////////////////////////
var card2 = new Card("blood");
card2.id = document.getElementById("2");
card2.htmlSeconds = document.getElementById("seconds2");
card2.htmlTens = document.getElementById("tens2");
///////////////////////////////////////////////////
var card3 = new Card("operations");
card3.id = document.getElementById("3");
card3.htmlSeconds = document.getElementById("seconds3");
card3.htmlTens = document.getElementById("tens3");
///////////////////////////////////////////////////
var card4 = new Card("x-ray");
card4.id = document.getElementById("4");
card4.htmlSeconds = document.getElementById("seconds4");
card4.htmlTens = document.getElementById("tens4");
///////////////////////////////////////////////////
var card5 = new Card("diagnostic");
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
  console.log(result.data)
  if(!popupFlag){
    nfcHex = result.data;
    allowAccess(nfcHex);
  }

}

function allowAccess(hexCode)
{
  hexCode = hexCode.substring(1,20);
  var vaildCard = false;
  if(nfcHex !== null){
    console.log(hexCode)
    for(var i = 0; i < nfcArray.length; i++){
      if(hexCode === nfcArray[i]){
        console.log("card validated")
        validCard = true;
        break;
      }
    }
    if(validCard){
      closeNav()
    }
    else{
      popupFlag = true;
      var r = confirm("this NFC Card is not valid")
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

    document.getElementById("myNav").style.height = "0%";

}

$('.card').click(function()
{
    okjay++;
    console.log(okjay);
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
