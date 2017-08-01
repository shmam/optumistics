/*
  The following JavaScript file will mostly be used for the neoStats.html page
  TOB:
    -Global variables - Lines 20 - 40
    -Hamburger screen shift - Lines 47 - 65
    -jQuery functions - Lines 69 - 232
    -Helper functions - Lines 233 - 431
    -Line graph data - Lines 435 - 572
    -Bar graph data - Lines 577 -637
    -Graph update functions - Lines 641 - 728


*/



/*
  ---------------------------------------------GLOBAL VARIABLES------------------------------------------
  The following sections are the instantiations of variables used throughout the code..
*/

const baseUrl = 'http://applicationDashboard.us-east-1.elasticbeanstalk.com'; //Variable for the first portion for the URL in our AJAX calls
var optionSelected;
var operationString = [[130, "X-RAY"], [133, "BLOOD DRAW"], [134, "PHYSICAL"], [137, "INJECTION"]]; //The following array are all the operations ID's and their operation name. GLOBAL VARIABLE
var operationNumbers = [130,133,134,137]
var benchmark = [15, 4, 30, 6]; //The following are random benchmark values to compare to.
var ctx = document.getElementById("myChart").getContext("2d"); //Line graph in the top left portion of the screen.
var ctx2 = document.getElementById("myPieChart").getContext("2d"); //Bar graph in the bottom left portion of the screen
var currentChart; //Default selection for the dropdown in order to navigate which LINE GRAPH, the user would want.
var currentPieChart; //Default selection for the dropdown in order to navigate which BAR GRAPH, the user would want.
var isFirst = true;
var avgBloodDrawAllDoc = [];
var waitTimeBench = 45; //Benchmark patient wait time.
var avgXRayEachDoc = [40, 14, 35, 24, 75, 4, 24];
var dynamicPatientWait = []; //This benchmark will be the dynamic patient waitTime for the comprehensive wait time graph.
var dynamicBenchmark = []; //This benchmark will be the dynamic benchmark based on what OPERATION was chosen.
var allOperations = []; //This array will be all the operations.
var allHex = [];
var allActionID = [];
var counter = 0;
var operation1 = [];

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
            $("#chartType").append("<option class='providers' value = line" + i + " id=" +brace.provider_id + ">"+ brace.provider_first_name + " " + brace.provider_last_name + "</option>");
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
      ajaxCallAverageTime(operationString[i][0], operationString[i][1],i);


    }
    //The following ajax calls gets the patient wait time ON LOAD...
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: baseUrl + '/portal/present/patientWaitTime/' + '2017-08-09',
        success: function(data)
        {
            document.getElementById('NPSLoad2').style.display = 'none';
            document.getElementById('avgWaitTime').style.display = "block";
            if (Math.round(data) > waitTimeBench)
            {
              document.getElementById('avgWaitTime').style.border = "10px solid red"; //If this aJAX patient wait time is bad...the circle will be red.
            }
            else{
              document.getElementById('avgWaitTime').style.border = "10px solid green"; //If this aJAX patient wait time is good...the circle will be green.
            }
            $('#patientWT').text(Math.round(data));

            $('#avgWaitTime').append("</br><span style = \"font-size: 24px;\">MINUTES</span>"); //Add the time onto the card.



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
            $('#NPS').html('<strong style="font-size:130px;">' + Math.floor(Math.round(brace.average * 100)/10) + '</strong>');
            var barWidth = -1 * parseInt((100 - (brace.average * 100))/10) + "%";
            console.log("bar width: " + barWidth);
            $('#NPS').append("<div id='progressbarcolor'> <div id='progressbarwhite' style='width: '"+ barWidth +";></div></div>")
            $('#NPS').append('<p style="font-weight:200">/100</p>')
            document.getElementById('NPS').style.display = "block";


          });
        },
        error: function (xhr, status, error) {

            console.log('Error: ' + error.message);
        },
    });


    getDynamicPatientWait(); //Dynamically loads data onto the graphs
    updatePieChart();
    getAllOperations();
    updateChart();
    });

  //This function gives the different stats when a new provider is selected in the drop down menu.
  $("#providerDropDown").change(function()
  {

      optionSelected = $("#providerDropDown option:selected").attr('id'); //This is the provider ID of the option selected, for the URL in the AJAX call....
      //alert(optionSelected);

      $("#averages").empty(); //Empty the list so it refreshes instead of append.

      for (var i = 0; i < operationString.length; i++) //This for loop calls ajaxCallAverageTime to append all the average times of all doctors.
      {
        if(optionSelected !== "null") //If there is no average time for a specific operation...
        {
          ajaxCallIndiDoctor(operationString[i][0], operationString[i][1], optionSelected, i);


        }
        else //When you click "All Clinicians" on the dropdown.
        {
          ajaxCallAverageTime(operationString[i][0], operationString[i][1],i);
        }
      }

    });

    /*
      This function is called when the provider dropdown is changed in the line graph in the top left side of the page.
    */
    $("#chartType").change(function()
    {
        $('#operationType').empty(); //Empty because you want to reload the doctors (real time)
        optionSelected = $("#chartType option:selected").attr('id'); //This is the provider ID of the option selected, for the URL in the AJAX call....

        //alert(optionSelected);
        for (var i = 0; i < operationString.length; i++) //This for loop calls ajaxCallAverageTime to append all the average times of all doctors.
        {
            $("#operationType").append("<option class='"+i+"' id = \"" + operationString[i][0] + "\" value = \"line1" + "\">" + operationString[i][1] + "</option>");
        }
        var operationSelecteds = $('#operationType option:selected').attr('id');
        ajaxCallAvgXRayEachProvider(optionSelected, operationSelecteds);
        getDynamicBenchmark(operationSelecteds);
        counter++;
        updateChart();

      });
      /*
        This function is called when the operation dropdiown is changed in the line graph in the top left side of the page.
      */
      $("#operationType").change(function()
      {

          var providerSelected = $("#chartType option:selected").attr('id'); //This is the provider ID of the option selected, for the URL in the AJAX call....
          var operationSelected = $('#operationType option:selected').attr('id');
          ajaxCallAvgXRayEachProvider(providerSelected, operationSelected);
          getDynamicBenchmark(operationSelected); //This function call will append the dynamic benchmark.
          updateChart();


        });


    /*
      -------------------------------------------END OF JQUERY FUNCTIONS---------------------------------------------
    */
    /*
    This function will return all the data of the operations for the graphs.
    */
    function getPastDataOperations(operation_id, index)
    {
      $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: baseUrl + '/portal/average/time/' + operation_id + '/2017-01-01/2017-07-31',
        success: function(data)
        {
            operation1[index] = data;

            console.log("This is the operation id " + operation_id);
            console.log("Array after push: " + operation1);
            updateChart();
        },
        error: function (xhr, status, error) {

            console.log('Error: ' + error.message);
        },
    });
    }
    //This function will get all the operations plus their hex values for the colors.
    function getAllOperations()
    {
      $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: baseUrl + '/dashboard/present/actions/active',
        success: function(data)
        {
          $.each(data, function(i,brace)
          {
            allOperations.push(brace.action_name);  //Names of the operations
            allHex.push(brace.flag_hex);  //Color HEX of the operations.
            allActionID.push(brace.action_id); //Action IDS of the operations
            console.log("This is the action ID lenght" + allActionID.length);

            });
            console.log(allHex);
            console.log(allOperations);
            console.log(allActionID);
            for (var i = 0; i < allActionID.length; i++)
            {
              getPastDataOperations(allActionID[i], i);
            }

            updateChart();
        },
        error: function (xhr, status, error) {

            console.log('Error: ' + error.message);
        },
    });
    }
    /*
    This funtion returns the patient wait time given a certain date restriction.
    */
    function getDynamicPatientWait()
    {
          $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: baseUrl + '/portal/present/wait_time/2017-03-01/2017-09-31',
            success: function(data)
            {

              dynamicPatientWait = [];
              dynamicPatientWait = data;
              updatePieChart();
            },
            error: function (xhr, status, error) {

                console.log('Error: ' + error.message);
            },
        });
    }
    //This function will get the dynamic patient wait times for the previous months.
    //This function will get the dynamic benchmark of whatever option was selected in the operation selection
    function getDynamicBenchmark(operation_id){

      $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: baseUrl + '/portal/present/duration/' + operation_id,
            success: function(data)
            {
              dynamicBenchmark = [];
              for(var i = 0; i < 7; i++)
              {
                dynamicBenchmark.push(data[0].action_duration);

                console.log("WE JUST ADDED THIS ELEMENT" + data[0].action_duration);

              }

              updateChart();
            },
            error: function (xhr, status, error) {

                console.log('Error: ' + error.message);
            },
        });
    }
    /*

    */
    function ajaxCallAvgXRayEachProvider(provider_id, operation_id)
      {
        //The following ajax call gets the average x-ray time for each provider
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: baseUrl + '/portal/average/time/' + operation_id + '/' + provider_id + '/2017-01-01/2017-07-01',
            success: function(data)
            {
              avgXRayEachDoc = [];
              for(var i = 0; i < data.length; i++)
              {
                avgXRayEachDoc.push(data[i]);

              }
              updateChart();
            },
            error: function (xhr, status, error) {

                console.log('Error: ' + error.message);
            },
        });
      }

    /*
      -------------------------------------------HELPER FUNCTIONS-----------------------------------------------------
    */


    //This function is a helper function for when you select a new provider in the drop down for providers. This is the default stats that are shown when you load the page.
  function ajaxCallAverageTime(id, operation_name,iteration){
     $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: baseUrl + '/portal/average/time/' + id,
        success: function(data)
        {

          $.each(data, function(i,brace)
          { //Get every entry in the NFC db that are PROVIDERS

                $("#averages").append("<li>" + " <strong>" + operation_name + " </strong>: " + Math.round(brace.time * 10)/10 + " minutes " + compareMe(Math.round(brace.time * 10)/10, benchmark[iteration]) + "[" + benchmark[iteration] + "]</li>");
                //benchmark.push(Math.round(brace.time * 10)/10)

            });
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });
  }

  //This function is a helper function for when you select a new provider in the drop down for providers. This is when you select a provider on the drop down and bring up their stats.
    function ajaxCallIndiDoctor(operation_id, operation_name, provider_id, iteration)
    {
      $.ajax({  //This ajax call will get the average times for all operations of the provider selected
          type: 'GET',
          dataType: 'jsonp',
          url: baseUrl + '/portal/average/time/' + operation_id + '/' + provider_id,
          success: function(data) {

             //Get every entry in the NFC db that are PROVIDERS
             if(data[0].time !== 0){

                $("#averages").append("<li>" + " <strong>" + operation_name + " </strong> " + Math.round(data[0].time * 10)/10 + " minutes" + compareMe(Math.round(data[0].time * 10)/10, benchmark[iteration]) + "[" + benchmark[iteration] + "]</li>");
            }
          },
          error: function (xhr, status, error) {
              console.log('Error: ' + error.message);
          },
      });
    }

    //This function determines the green/red arrow depending on whether the number is better or worse than the benchmark.
    function compareMe(number, comparison)
    {
      if (number <= comparison)
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


    var dataMap = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        responsive: false,
        maintainAspectRatio: false,
        // The data for our dataset
        data: [{
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: allOperations[0],
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: allHex[0],
                pointColor : "#3748ac",
                pointStrokeColor : "#FF8153",
                borderWidth: 3,
                data: operation1[0]
              },
              {
                label: allOperations[1],
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: allHex[1],
                pointColor : "rgba(255, 102, 0, 1.0)",
                pointStrokeColor : "#000",
                borderWidth: 3,
                data: operation1[1]


              },
              {
                label: allOperations[2],
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: allHex[2],
                pointColor : "rgba(46, 204, 113, 1.0)",
                borderWidth: 3,
                pointStrokeColor : "#000",
                  data: operation1[2]//Y-Axis Data(*)

              },
              {
                label: allOperations[3],
                backgroundColor: "rgba(0,0,0,0)",
                  borderColor: allHex[3],
                pointColor : "rgba(142, 68, 173,1.0)",
                borderWidth: 3,
                pointStrokeColor : "#000",
                  data: operation1[3]//Y-Axis Data(*)

              },
              {
                label: allOperations[4],
                backgroundColor: "rgba(0,0,0,0)",
                  borderColor: allHex[4],
                pointColor : "rgba(142, 68, 173,1.0)",
                borderWidth: 3,
                pointStrokeColor : "#000",
                  data: operation1[4]//Y-Axis Data(*)

              },
              {
                label: allOperations[5],
                backgroundColor: "rgba(0,0,0,0)",
                  borderColor: allHex[5],
                pointColor : "rgba(142, 68, 173,1.0)",
                borderWidth: 3,
                pointStrokeColor : "#000",
                  data: operation1[5]//Y-Axis Data(*)

              }
            ]
        },{
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "Average time",
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: "#3748ac",
                pointBackgroundColor: "#3748ac",
                pointStrokeColor : "#FF8153",
                borderWidth: 4,
                data: avgXRayEachDoc//Y-Axis Data(*)
              },
              {
                label: "Benchmark",
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                borderColor: "rgba(255, 102, 0, 1.0)",
                pointBackgroundColor: "rgba(255, 102, 0, 1.0)",
                pointColor : "#fff",
                pointStrokeColor : "#000",
                data: dynamicBenchmark


              }]

        }],

        options: {
          tooltips:{
            mode:'index',
            intersect: true,
          },
          hover:{
            mode: 'nearest',
            intersect: true,
          },
          scales: {
              xAxes: [{
                display: true,
                scaleLabel:{
                  display:true,
                  labelString:'Months'
                }
              }],
              yAxes: [{
                  display: true,
                  scaleLabel:{
                    display: true,
                    labelString: 'Time (minutes)'
                  },
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
        }

    });






      /*
        -------------------------------------------END of LINE GRAPH DATA---------------------------------------------
      */


      /*
        -------------------------------------------BAR GRAPH DATA-----------------------------------------------------
        The following variable contains all the setup and data for the BAR GRAPH. All labels that have comments next to them and have (*) can be changed.
      */

      var gradientLine = ctx.createLinearGradient(500,0,100,0);
      gradientLine.addColorStop(0, "rgba(128, 182, 244, 1)");
      gradientLine.addColorStop(1, "rgba(244, 144, 128, 1)");

      var gradientFill = ctx.createLinearGradient(500,0,100,0);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.2)");
      gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.2)");


      var dataMap2 = new Chart(ctx2, {

        type: 'line',
        responsive: false,
        maintainAspectRatio: false,
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"], //X-Axis Data(*)
            datasets: [
              {
                label: "Benchmark",
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                borderColor: 'rgba(46, 204, 113, 1.0)',
                borderRadius: 5,
                data:[15, 15, 15, 15, 15, 15, 15]//Y-Axis Data(*)

              },
            {
              label: "Patient Wait Time",
              backgroundColor: gradientFill,
              pointRadius: 6,
              borderColor: gradientLine,
              borderWidth: 3,
              showLine: true,
              lineTension: 0,
              cubicInterpolationMode: 'default',
              data: dynamicPatientWait //Y-Axis Data(*)
            },


          ],
          },
          options: {
              legend:{
                display: true,
                position: 'right',

              },
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
        });
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

            var determineChart = $("#operationType").val();

          //Find the value of the option selected from the dropdown menu.

            var params = dataMap;  //Find which data corresponds to the value of the option selected.

            var x;

            //Changes the size of the graph due to some weird HTML bug...

            if(determineChart === "line"){
              x = 0;
            }
            else if(determineChart === 'line1'){
              x = 1;
            }



            params.data[x].datasets[0].data = avgXRayEachDoc;
            params.data[x].datasets[1].data = dynamicBenchmark;
            if (counter === 0)
            {
            for (var i = 0; i < allOperations.length; i++)
            {
              params.data[x].datasets[i].data = operation1[i];
              params.data[x].datasets[i].borderColor = allHex[i];
              params.data[x].datasets[i].label = allOperations[i];

            }

          }




            //dataMap["line1"].data = avgXRayEachDoc;

            //currentChart = new Chart(ctx)[params.method](params.data, {});
            currentChart = new Chart(ctx,{type:'line',data:params.data[x],}) //Make a new graph.

        }
        $('#operationType').on('change', updateChart()); //When the selection is changed do this.
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



            //var determinePieChart = $("#chartPieType").val(); //Find the value of the option selected from the dropdown menu.
            var params1 = dataMap2; //Find which data cooresponds to the value of the option selected
            params1.data.datasets[1].data = dynamicPatientWait;

            currentPieChart = new Chart(ctx2,{type: 'line',data:params1.data})//Make a new graph.

          }
          $('#chartPieType').on('change', updatePieChart) //When the selection is changed do this.
          updatePieChart(); //Do this
                  /*
          -------------------------------------------END OF GRAPH UPDATE FUNCTIONS---------------------------------------------
        */
