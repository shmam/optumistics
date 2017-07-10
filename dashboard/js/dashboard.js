var appendTens = document.getElementById("tenss");
var appendSeconds = document.getElementById("secondss");
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
var seconds = 00;
var tens = 00;

var counter = 0; //The counter is used to determine if the time should start or not.
var isDisplayed = false; //This variable is used to explain if the start time is displayed or not. Set to false because it is originally not.
var timeDisplayed = 0; //Time displayed is use to navigate. Because click is inside the div (clicked), must determine if the click is a START TIMER click, "call click" that should be invalid, or if it is a STOP TIMER click
var endTimeDisplayed = false; //This variableis used to explain if the end time is displayed or not. Set to false because it is originally not.

function startTimer ()
{
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

$('#firstColumn1').click(function()
{
  var date = new Date();  //Sets a new date and time...
  if (timeDisplayed === 0 && isDisplayed === false) //If the div should be a START TIMER click and the start time has not been displayed yet.
  {
    hour = date.getHours(); //Get the hour in the time.
    minute = date.getMinutes(); //Get minyy
    second = date.getSeconds(); //Get secs
    appendHour.innerHTML = hour;
    appendMinute.innerHTML = minute;
    appendSecond.innerHTML = second;
    isDisplayed = true;
    counter++;
    timeDisplayed = 2;
    if (counter % 2 !== 0){
     clearInterval(Interval);
     Interval = setInterval(startTimer, 1000);
   }
  }
  else if (timeDisplayed === 1){
    timeDisplayed = 2;
  }
else if (endTimeDisplayed === false && timeDisplayed === 2) { //sendToDB()
  endTimeDisplayed = true;
   var date2 = new Date();
   clearInterval(Interval);
   isDisplayed = false;
   hour2 = date2.getHours();
   minute2 = date2.getMinutes();
   second2 = date2.getSeconds();
   appendStopHour.innerHTML = hour2;
   appendStopMinute.innerHTML = minute2;
   appendStopSecond.innerHTML = second2;
 }

});
