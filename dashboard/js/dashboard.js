const baseUrl = 'http://optumistics-dev.us-east-1.elasticbeanstalk.com';
var counter = 0; //The counter is used to determine if the time should start or not.
var isDisplayed = false; //This variable is used to explain if the start time is displayed or not. Set to false because it is originally not.
var timeDisplayed = 0; //Time displayed is use to navigate. Because click is inside the div (clicked), must determine if the click is a START TIMER click, "call click" that should be invalid, or if it is a STOP TIMER click
var endTimeDisplayed = false; //This variableis used to explain if the end time is displayed or not. Set to false because it is originally not.
var checkCompleteTimer = 0; //Counter to determine if the card should flip or not.
var seconds = 00;
var tens = 00;



var appendTens = document.getElementById("tenss");
var appendSeconds = document.getElementById("secondss");
var buttonStart = document.getElementById('contentPage');
var buttonStop = document.getElementById('button-stop');
var buttonReset = document.getElementById('button-reset');
var appendHour = document.getElementById('hourTime');
var appendMinute = document.getElementById('minuteTime');
var appendSecond = document.getElementById('secondTime');
var appendStopHour = document.getElementById('hourStopTime');
var appendStopMinute = document.getElementById('minuteStopTime');
var appendStopSecond = document.getElementById('secondStopTime');
var Interval;
var hour;
var minute;
var second;

function openNav(number)
{
  //timeDisplayed = 1;
  counter = counter + 2;
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
function startTimer () {
  tens++;

  if(tens <= 9){
    appendTens.innerHTML = "0" + tens;
  }

  if (tens > 9){
    appendTens.innerHTML = tens;

  }

  if (tens > 59) {
    console.log("seconds");
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }

}
$('.card').click(function(){

});

//This function clears the interval for the minutes and starts the timer.
$('.card').click(function()
{
  var flipCard = $(this).attr('id');
  var appendString = "#" + flipCard;
  var date = new Date();  //Sets a new date and time...
  var date2 = new Date();
  console.log(flipCard);

  console.log(appendString);
  if (timeDisplayed === 0 && isDisplayed === false) //If the div should be a START TIMER click and the start time has not been displayed yet.
  {


    $(appendString).flip(true);
    hour = date.getHours(); //Get the hour in the time.
    minute = date.getMinutes(); //Get minyy
    second = date.getSeconds(); //Get secs
    appendHour.innerHTML = hour;
    appendMinute.innerHTML = minute;
    appendSecond.innerHTML = second;
    isDisplayed = true;
    counter++;
    timeDisplayed = 2;
    if (counter % 2 !== 0)
   {
     clearInterval(Interval);
     Interval = setInterval(startTimer, 1000);
     console.log(timeDisplayed);
     console.log(isDisplayed);
   }
  }

else if (endTimeDisplayed === false && timeDisplayed === 2)
{
  var wantToSend = confirm("Would you like to submit this time?");
  if (wantToSend)
  {
    console.log(timeDisplayed);
    console.log(isDisplayed);
    endTimeDisplayed = true;
    isDisplayed = false;
    clearInterval(Interval);
    hour2 = date2.getHours();
    minute2 = date2.getMinutes();
    second2 = date2.getSeconds();
    appendStopHour.innerHTML = hour2;
    appendStopMinute.innerHTML = minute2;
    appendStopSecond.innerHTML = second2;
    var actionId = $('.card').attr('id');
    console.log(actionId);
    var sendStartTime = String(hour + ":" + minute + ":" + second);
    var sendEndTime = String(hour2 + ":" + minute2 + ":" + second2);
    sendTime(sendStartTime, sendEndTime, actionId);
    $(appendString).flip(false);
    timeDisplayed = 0;
    isDisplayed = false;
    endTimeDisplayed = false;
    console.log(timeDisplayed);
    console.log(isDisplayed);
  }

}

});

$(".card").flip(
{
    axis: 'y',
    trigger: 'manual'
});

function sendTime(startTime, endTime, action_id)
{
  var today = new Date();
  today = today.toISOString().substring(0, 10);
    $.ajax({
        type: 'POST',
        dataType: 'jsonp',
        //url: baseUrl + '/general/insert/Action_Performed/' + action_id + '/null/null/' + startTime + '/' + endTime + '/2323/' + today,
        //url: baseUrl + 'general/insert/Action_Performed/2/10/1/10:52/10:58/2290/2017-10-10',
        url: baseUrl + 'general/insert/Action_Performed/' + String(action_id) + '/10/1/' + String(startTime) + '/' + String(endTime) + '/2290/' + String(today),
        success: function(data)
        {
          alert("Successful!");
        },
        error: function (xhr, status, error)
        {
            console.log('Error: ' + error.message);
        },
    })
}
