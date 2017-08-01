var question_id;
$(document).ready(function(){

    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: 'http://applicationDashboard.us-east-1.elasticbeanstalk.com/dashboard/present/Question',
        success: function(data) {
            $.each(data, function(i, brace) {
                $('.panel-heading').append(brace.question)
                question_id = brace.question_id;
            });
        },
        error: function(shr, status, error) {
            console.log('Error: ' + error.message);
        },
    });

    // Adding Survey Activity
    $('#submit').click(function() {
        var survey_patient_id = 1147; //getting Survey Patient ID val()
        var rating = $('#ex13').slider('getValue'); // getting Survey Rating val()
        var today = new Date();
        var rating_date = today.toISOString().substring(0,10); // getting Survey Rating Date val()
        var survey_question_id = question_id; // getting Survey Question ID val()
        $.ajax({
            type: "POST",
            url: "http://applicationDashboard.us-east-1.elasticbeanstalk.com/general/insert/Survey_Activity/" +survey_patient_id
            + '/' +rating +'/' +rating_date + '/' +survey_question_id,
            success: function (insert_status) {
                alert("Your response has been submitted. Thank you!")
                location.href="landingpage.html"
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    $('#skipButton').click(function(){
      location.href="landingpage.html"
    });

    /* click button to open/close sidebar */
    $('#topBar-button').click(function () {
        if (document.getElementById("mySidebar").style.display == "block") {
            w3_close();
        }
        else {
            w3_open();
        }
    }); // end of topBar-button click function

    $('#mainContent').click(function() {
        if (document.getElementById("mySidebar").style.display == "block") {
            w3_close();
        }
    }); // end of mainContent click function

    $('img').click(function() {
        if (document.getElementById("mySidebar").style.display == "block") {
            w3_close();
        }
    }); // end of img click function

    $('#add-flag').click(function() {
        div_show();
    }); // end of add-flag click function

    $('#button-close').click(function() {
        div_hide();
    }); // end of button-close click function (close popup window from 'x')

    // slider With JQuery ex 13
$("#ex13").slider({
    ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ticks_labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    ticks_snap_bounds: 30,
    id:"slider2",
    handle:"round",
    tooltip_position:""

});

}); // end of document.ready function

// SHOW sidebar
function w3_open() {
    document.getElementById("main").style.marginLeft = "18%";
    document.getElementById("mySidebar").style.width = "18%";
    document.getElementById("mySidebar").style.display = "block";
}

// HIDE sidebar
function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
}
