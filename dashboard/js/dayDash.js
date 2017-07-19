var Interval;
<<<<<<< HEAD



=======
>>>>>>> af6859514896276f539dc63252bcb4ab06df8be4
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



function startTimer(tens, seconds, cardSec, cardTens)
{
  tens++;

  if(tens <= 9){
    cardTens.innerHTML = "0" + tens;
  }

  if (tens > 9){
    cardTens.innerHTML = tens;

  }
  if (tens > 59) {
    console.log("seconds");
    seconds++;
    cardSec.innerHTML = "0" + seconds;
    tens = 0;
    cardTens.innerHTML = "0" + 0;
  }

  if (seconds > 9){
    cardSec.innerHTML = seconds;
  }

}

function openNav(number)
{
  //timeDisplayed = 1;
  //counter = counter + 2;
  if (isDisplayed === false)
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
    counter = counter + 2;
    document.getElementById("myNav").style.height = "0%";

}

<<<<<<< HEAD


=======
>>>>>>> af6859514896276f539dc63252bcb4ab06df8be4
$('.card').click(function()
{

    //var startTimers = startTimer.bind(cards[flipCard].tens, cards[flipCard].seconds, cards[flipCard].htmlSeconds, cards[flipCard].htmlTens);
    var flipCard = $(this).attr('id');
    console.log(flipCard);

    var appendString = "#" + flipCard;
    $(appendString).flip(true);
    //console.log(cards[flipCard].cardOperation);


    Interval = setInterval(function(){startTimer(cards[flipCard].tens, cards[flipCard].seconds, cards[flipCard].htmlSeconds, cards[flipCard].htmlTens)}, 1000);
    //Interval = setInterval(startTimer(cards[flipCard].tens, cards[flipCard].seconds, cards[flipCard].htmlSeconds, cards[flipCard].htmlTens), 500);

  });

$(".card").flip(
{
    axis: 'y',
    trigger: 'manual'
});
<<<<<<< HEAD




=======
>>>>>>> af6859514896276f539dc63252bcb4ab06df8be4
