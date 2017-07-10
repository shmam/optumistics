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
    if (isDisplayed === true)
    {
      timeDisplayed = 2;
    }
  document.getElementById("myNav").style.height = "0%";

}
