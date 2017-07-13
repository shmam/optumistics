/*
  The following JavaScript file will mostly be used for the neoStats.html page
  TOB:
    -Global variables
    -Hamburger screen shift;
    -Line graph data
    -Bar graph data
    -Graph update functions
    -jQuery functions
    -Helper functions
*/



/*
  ---------------------------------------------GLOBAL VARIABLES------------------------------------------
  The following sections are the instantiations of variables used throughout the code..
*/

const baseUrl = 'http://applicationDashboard.us-east-1.elasticbeanstalk.com'; //Variable for the first portion for the URL in our AJAX calls
var optionSelected;
var operationString = [[130, "X-RAY"], [133, "BLOOD DRAW"], [134, "PHYSICAL"], [137, "INJECTION"]]; //The following array are all the operations ID's and their operation name. GLOBAL VARIABLE
var benchmark = [100, 14, 87, 26]; //The following are random benchmark values to compare to.
var ctx = document.getElementById("myChart").getContext("2d"); //Line graph in the top left portion of the screen.
var ctx2 = document.getElementById("myPieChart").getContext("2d"); //Bar graph in the bottom left portion of the screen
var currentChart; //Default selection for the dropdown in order to navigate which LINE GRAPH, the user would want.
var currentPieChart; //Default selection for the dropdown in order to navigate which BAR GRAPH, the user would want.
var isFirst = true;
var waitTimeBench = 45; //Benchmark patient wait time.
var avgBloodDrawAllDoc = [];
var avgInjectionAllDoc = [];
var testArray = [0,0,0,0,14,0,10];

/*
  --------------------------------------------END of GLOBAL VARIABLES--------------------------------------
*/


/*
  --------------------------------------------HAMBURGER SCREEN SHIFT--------------------------------------
  The following functions shift the contents of the page towards the right, when the hamburger button is pressed.
*/
function w3_open()
{
  document.getElementById("main").style.marginLeft = "20%";
  document.getElementById("mySidebar").style.width = "20%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';

}
function w3_close()
{
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}
/*
  -------------------------------------------END of HAMBURGER SCREEN SHIFT----------------------------------
*/

    /*
      -------------------------------------------JQUERY FUNCTIONS---------------------------------------------
      The following jQuery functions are involved with AJAX functions to gather data for the statistics.
    */

    /*
      The following jQuery functions automatically loads when the page runs.
    */
  $(document).ready(function()
  {
    //The following AJAX call gets all the name of providers and displays it in the provider drop down....
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: baseUrl + '/portal/present/providers/active',
        success: function(data) {
          $.each(data, function(i, brace)
          { //Get every entry in the NFC db that are PROVIDERS
            $("#providerDropDown").append("<option class='swag' id=" +brace.provider_id +" value = " + i + ">"+ brace.provider_first_name + " " + brace.provider_last_name + "</option>");
            $("#chartType").append("<option class='providers' value = line" + i + ">"+ brace.provider_first_name + " " + brace.provider_last_name + "</option>");
            updateChart();

          });
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });

    $("#averages").empty(); //Empty the list so it refreshes instead of append.

    for (var i = 0; i < operationString.length; i++) //This for loop calls ajaxCallAverageTime to append all the average times of all doctors.
    {
      ajaxCallAverageTime(operationString[i][0], operationString[i][1]);


    }
    //The following ajax calls gets the patient wait time ON LOAD...
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: baseUrl + '/portal/present/patientWaitTime',
        success: function(data)
        {
          console.log(data)


            document.getElementById('NPSLoad2').style.display = 'none';
            document.getElementById('avgWaitTime').style.display = "block";
            if (Math.round(data) > waitTimeBench)
            {
              document.getElementById('avgWaitTime').style.border = "10px solid red";
            }
            else{
              document.getElementById('avgWaitTime').style.border = "10px solid green";
            }
            $('#patientWT').text(Math.round(data));

            $('#avgWaitTime').append("</br><span style = \"font-size: 24px;\">MINUTES</span>");



        },
        error: function (xhr, status, error) {
          console.log("error here")
            console.log('Error: ' + error.message);
        },
    });
    //The following ajax calls gets the NPS score ON LOAD...
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: baseUrl + '/portal/present/npsScore',
        success: function(data)
        {
          $.each(data, function(i, brace)
          { //Get every entry in the NFC db that are PROVIDERS

            document.getElementById('NPSLoad').style.display = "none";
            $('#NPS').html('<strong style="font-size:130px;">' + Math.round(brace.average * 10)/10 + '</strong>');
            $('#NPS').append('<p style="font-weight:200">/10</p>')
            document.getElementById('NPS').style.display = "block";


          });
        },
        error: function (xhr, status, error) {

            console.log('Error: ' + error.message);
        },
    });

    //The following ajax call gets the average blood draw time for the clinic
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: baseUrl + '/portal/average/time/133/2017-01-01/2017-07-01',


        success: function(data)
        {
          console.log(data);
          for(var i=0; i <data.length; i++)
          {
            avgBloodDrawAllDoc.push(data[i]);
            // if(avgBloodDrawAllDoc[i] === testArray[i])
            //   console.log("true");
            // else {
            //   console.log("false");
            // }

          }
          updateChart();

          for(var i = 0; i < data.length; i++)
          {
            console.log(avgBloodDrawAllDoc[i] == testArray[i]);
          }
          console.log(avgBloodDrawAllDoc);

        },
        error: function (xhr, status, error) {

            console.log('Error: ' + error.message);
        },
    });

    //The following ajax call gets the average injection time for the clinic
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: baseUrl + '/portal/average/time/137/2017-01-01/2017-07-01',
        contentType: 'application/x-www-form-urlencoded',
        jsonpCallback: 'callback',
        success: function(data)
        {
          console.log(data);
          avgInjectionAllDoc = data;
          console.log(avgInjectionAllDoc);
          console.log(testArray);
        },
        error: function (xhr, status, error) {

            console.log('Error: ' + error.message);
        },
    });


  });

  //This function gives the different stats when a new provider is selected in the drop down menu.
  $("#providerDropDown").change(function()
  {
      $('#chartType').empty();
      optionSelected = $("#providerDropDown option:selected").attr('id'); //This is the provider ID of the option selected, for the URL in the AJAX call....
      //alert(optionSelected);
      $("#averages").empty(); //Empty the list so it refreshes instead of append.

      for (var i = 0; i < operationString.length; i++) //This for loop calls ajaxCallAverageTime to append all the average times of all doctors.
      {
        if(optionSelected !== "null") //If there is no average time for a specific operation...
        {
          ajaxCallIndiDoctor(operationString[i][0], operationString[i][1], optionSelected, i);
        }
        else{
          ajaxCallAverageTime(operationString[i][0], operationString[i][1]);
        }
      }
    });

    $("#chartType").change(function()
    {

        $('#operationType').empty();
        optionSelected = $("#chartType option:selected").attr('id'); //This is the provider ID of the option selected, for the URL in the AJAX call....
        //alert(optionSelected);
        for (var i = 0; i < operationString.length; i++) //This for loop calls ajaxCallAverageTime to append all the average times of all doctors.
        {
            console.log("We are on this element" + i + " and we are about to add this to the list: " + operationString[i][1]);
            $("#operationType").append("<option class='hello' value = line" + i + ">" + operationString[i][1] + "</option>");
            console.log("BLOOD ARRAY IS" + avgBloodDrawAllDoc);
            console.dir("BENCHMARK IS" + benchmark);
        }
        updateChart();

      });
    /*
      -------------------------------------------END OF JQUERY FUNCTIONS---------------------------------------------
    */


    /*
      -------------------------------------------HELPER FUNCTIONS-----------------------------------------------------
    */


    //This function is a helper function for when you select a new provider in the drop down for providers.
  function ajaxCallAverageTime(id, operation_name){
    console.log(baseUrl + '/portal/average/time/' + id)
     $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: baseUrl + '/portal/average/time/' + id,
        success: function(data)
        {

          $.each(data, function(i,brace)
          { //Get every entry in the NFC db that are PROVIDERS

                $("#averages").append("<li>" + " <strong>" + operation_name + " </strong>: " + Math.round(brace.time * 10)/10 + " minutes </li>");
                benchmark.push(Math.round(brace.time * 10)/10);

            });
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });
  }

  //This function is a helper function for when you select a new provider in the drop down for providers.
    function ajaxCallIndiDoctor(operation_id, operation_name, provider_id, iteration)
    {
      $.ajax({  //This ajax call will get the average times for all operations of the provider selected
          type: 'GET',
          dataType: 'jsonp',
          contentType: 'application/x-www-form-urlencoded',
          jsonpCallback: 'callback',
          url: baseUrl + '/portal/average/time/' + operation_id + '/' + provider_id,
          success: function(data) {
            $.each(data, function(i,brace)
            { //Get every entry in the NFC db that are PROVIDERS
              //console.log(operationString[j][1]);
              if( brace.time !== null){
                $("#averages").append("<li>" + " <strong>" + operation_name + " </strong> " + Math.round(brace.time * 10)/10 + " minutes" + compareMe(Math.round(brace.time * 10)/10, benchmark[iteration]) + "</li>");
              }
            });
          },
          error: function (xhr, status, error) {
              console.log('Error: ' + error.message);
          },
      });
    }

    //This function determines the green/red arrow depending on whether the number is better or worse than the benchmark.
    function compareMe(number, comparison)
    {
      if (number < comparison)
      {
        return ("<div class = \"arrow-up\"></div>");
      }
      else
      {
        return ("<div class = \"arrow-down\"></div>");
      }


    }

    /*
      -------------------------------------------END OF HELPER FUNCTIONS-----------------------------------------------------
    */

    /*
      -------------------------------------------LINE GRAPH DATA------------------------------------------------
      The following variable contains all the setup and data for the LINE GRAPH. All labels that have comments next to them and have (*) can be changed.
    */

    var dataMap = {
      'line': { //Variable that correlates to the dropdown variable
        method: 'Line', //Type of graph for "Chart.js"(*)
           data: {
              labels: ["January", "February", "March", "April", "May", "June", "July"],//X-Axis Data(*)
             datasets: [
               {
               label: "My First dataset",
               fillColor: "rgba(0,0,0,0)",
               strokeColor: "#3748ac",
               pointColor : "#fff",
               pointStrokeColor : "#FF8153",
               data: avgBloodDrawAllDoc  //Y-Axis Data(*)
               },
               {
                 label: "My second dataset",
                 fillColor: "rgba(0,0,0,0)",
                 strokeColor: "rgba(255, 102, 0, 1.0)",
                 pointColor : "#fff",
                 pointStrokeColor : "#000",
                 data: avgInjectionAllDoc


               },
               {
                 label: "My third dataset",
                 fillColor: "rgba(0,0,0,0)",
                 strokeColor: "rgba(46, 204, 113, 1.0)",
                 pointColor : "#fff",
                 pointStrokeColor : "#000",
                   data: testArray//Y-Axis Data(*)

               },
             ],
           }
      },
      'line0': { //Variable that correlates to the dropdown variable
        method: 'Line', //Type of graph for "Chart.js"(*)
           data: {
             labels: ["April", "May", "June","July"], //X-Axis Data(*)
             datasets: [
               {
               label: "My First dataset",
               fillColor: "rgba(0,0,0,0)",
               strokeColor: "#3748ac",
               pointColor : "#fff",
               pointStrokeColor : "#FF8153",
               data: avgInjectionAllDoc //Y-Axis Data(*)
             },

               {
                 label: "My Second dataset",
                 fillColor: "rgba(0,0,0,0)",
                 strokeColor: "#3748ac",
                 pointColor : "#fff",
                 pointStrokeColor : "#FF8153",
                 data: [20, 41, 50, 39, 40, 64, 13] //Y-Axis Data(*)
               },
             ],
           }
      },
      'line1': {
        method: 'Line', //Type of graph for "Chart.js"(*)
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August"], //X-Axis Data(*)
          datasets: [{
            label: "My First dataset",
            fillColor: "rgba(0,0,0,0)",
            strokeColor: "#3748ac",
            pointColor : "#fff",
            pointStrokeColor : "#FF8153",
            data: [14, 23, 27, 44, 44, 53, 12, 50] //Y-Axis Data(*)
          }, ],
        }
      },
      'line2': {
        method: 'Line', //Type of graph for "Chart.js"(*)
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August"], //X-Axis Data(*)
          datasets: [{
            label: "My First dataset",
            fillColor: "rgba(0,0,0,0)",
            strokeColor: "#3748ac",
            pointColor : "#fff",
            pointStrokeColor : "#FF8153",
            data: [15, 78, 53, 63, 94, 11, 12, 8] //Y-Axis Data(*)
          }, ],
        }
      },
      'line3': {
        method: 'Line', //Type of graph for "Chart.js"(*)
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August"], //X-Axis Data(*)
          datasets: [{
            label: "My First dataset",
            fillColor: "rgba(0,0,0,0)",
            strokeColor: "#3748ac",
            pointColor : "#fff",
            pointStrokeColor : "#FF8153",
            data: [17, 64, 78, 36, 27, 53, 75, 75] //Y-Axis Data(*)
          }, ],
        }
      }

  };

      /*
        -------------------------------------------END of LINE GRAPH DATA---------------------------------------------
      */


      /*
        -------------------------------------------BAR GRAPH DATA-----------------------------------------------------
        The following variable contains all the setup and data for the BAR GRAPH. All labels that have comments next to them and have (*) can be changed.
      */

      var dataMap2 = {

       'pie': {
         method: 'Bar', //Type of graph for "Chart.js" (*)
         data: {
           labels: [ "April", "May", "June", "July"], //X Axis Data (*)
               datasets: [{
                   label: 'Dataset 1',
                   fillColor: "rgba(243, 156, 18, 0.4)",
                   borderWidth: 1,
                   data: [14, 20, 15, 10], //Y Axis Data (*)
                 }]
               }
             },

       'pie2': {
           method: 'Pie', //Type of graph for "Chart.js" (*)
           data: [{
               value: 350,
               color: "#F7464A",
               highlight: "#FF5A5E",
               label: "operation"
           }, {
               value: 100,
               color: "#46BFBD",
               highlight: "#5AD3D1",
               label: "physical"
           }, {
               value: 20,
               color: "#FDB45C",
               highlight: "#FFC870",
               label: "blood time"
           }]
       },
       'pie3': {
           method: 'Pie', //Type of graph for "Chart.js" (*)
           data: [{
               value: 210,
               color: "#F7464A",
               highlight: "#FF5A5E",
               label: "operation"
           }, {
               value: 170,
               color: "#46BFBD",
               highlight: "#5AD3D1",
               label: "physical"
           }, {
               value: 50,
               color: "#FDB45C",
               highlight: "#FFC870",
               label: "blood time"
           }]
       }
    };

      /*
        -------------------------------------------END OF BAR GRAPH DATA----------------------------------------------
      */

      /*
        -------------------------------------------GRAPH UPDATE FUNCTIONS---------------------------------------------
        The following functions update their respective graphs, when a different graph is selected from the dropdown menu.
      */

        /*
            1.) This set of functions correspond to the LINE GRAPH on the top left portion of the screen
        */
        function updateChart()
        {
            if(currentChart)
            {
              currentChart.destroy();
            }

            var determineChart = $("#operationType").val(); //Find the value of the option selected from the dropdown menu.

            var params = dataMap[determineChart]  //Find which data corresponds to the value of the option selected.
            currentChart = new Chart(ctx)[params.method](params.data, {}); //Make a new graph.
            document.getElementById("myChart").style.width = "95%"; //Changes the size of the grpah due to some weird HTML bug...
            document.getElementById("myChart").style.height = "77%"; //Changes the size of the graph due to some weird HTML bug...
        }
        $('#operationType').on('change', updateChart) //When the selection is changed do this.
        console.log("this is the blood" + avgBloodDrawAllDoc);
        updateChart(); //Do this
        /*
            1.) End of LINE GRAPH UPDATE
        */

        /*
            2.) This set of functions correspond to the PIE GRAPH on the top left portion of the screen
        */

          function updatePieChart()
          {
            if (currentPieChart)
            {
              currentPieChart.destroy();
            }


            var determinePieChart = $("#chartPieType").val(); //Find the value of the option selected from the dropdown menu.
            var params1 = dataMap2[determinePieChart] //Find which data cooresponds to the value of the option selected.
            currentPieChart = new Chart(ctx2)[params1.method](params1.data, {}); //Make a new graph.
            document.getElementById("myPieChart").style.width = "90%"; //Changes the size of the graph due to some weird HTML bug...
            document.getElementById("myPieChart").style.height = "74%"; //Changes the size of the graph due to some weird HTML bug...
          }
          $('#chartPieType').on('change', updatePieChart) //When the selection is changed do this.
          updatePieChart(); //Do this
        /*
            2.) End of PIE GRAPH UPDATE
        */

        /*
          -------------------------------------------END OF GRAPH UPDATE FUNCTIONS---------------------------------------------
        */
