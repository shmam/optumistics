$(document).ready(function(){

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

    $.ajax({ // get the available flag color name
        type: 'GET',
        dataType: 'jsonp',
        url: 'http://optumistics-dev.us-east-1.elasticbeanstalk.com/portal/present/Flag_Color/name',
        success: function(data) {
            $.each(data, function(i, brace)
            {
                $("#flag-color-dropdown").append("<option id=" +brace.flag_color_id +">"+ brace.flag_color_name + "</option>");
            });
            document.getElementById("color-display").style.backgroundColor = data[0].flag_color_name;
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    }); //end of ajax call

    $('#submitFlag').click(function() { // submit the action and put it in the actions table
        if(document.getElementById('action-name-input').value == "") { // check for empty action name
            alert("Please enter an action name");
        }
        if(document.getElementById('button-label-input').value == "") { // check for 
            alert("Please enter a button label");
        }
        if(document.getElementById('exp-duration-input').value == "") {
            alert("Please enter an expected duration for this action");
        }
        var action_name = $('#action-name-input').val();
        var action_flag_color_id = $("#flag-color-dropdown option:selected").attr("id");
        var button_label = $("#button-label-input").val(); 
        var action_duration = $("#exp-duration-input").val();
        $.ajax({
            type: "POST",
            url: "http://optumistics-dev.us-east-1.elasticbeanstalk.com/general/insert/Actions/" +action_name +'/' +action_flag_color_id +'/'
            +button_label + '/' +action_duration +'/75/NULL',
            success: function (insert_status) {
                if(insert_status == "Unsuccessful insertion into Actions table. Action name must be unique.")
                {
                    alert("Action name must be unique, please choose another action name and try again.");
                }
                else {
                    $("#insert_status").append("Successful Insertion of Action</br>");
                    window.location.reload();
                    div_hide();
                }
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    }) // end of submitFlag click function

    $("#flag-color-dropdown").change(function() {
        document.getElementById("color-display").style.backgroundColor = $("#flag-color-dropdown option:selected").text();
    }) // change the color of color-display as you click on different color name

    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        async: false,
        url: 'http://optumistics-dev.us-east-1.elasticbeanstalk.com/dashboard/present/actions',
        success: function(data) {
            $.each(data, function(i, brace) {
                $('#action-control-area').append("<div id=div_" +brace.action_id +">");
                $('#div_'+brace.action_id).append("<b><p id=action_" +brace.action_id +" class = 'animated fadeIn'>" +brace.action_name +"</p></b>");
                $('#div_'+brace.action_id).append("<svg height='80' width='80'>"
                                        +"<circle class = 'animated fadeIn' cx='40' cy='40' r='35' stroke='black' stroke-width='2' fill='"+brace.flag_color_name +"'/>"
                                    +"</svg><br>");
                $('#div_'+brace.action_id).append("<label id=switch_"+brace.action_id +" class='switch'>");
                $('#switch_'+brace.action_id).append("<input onclick=\"update_flag("+brace.action_id+")\" id=_"+brace.action_id +" type='checkbox'>");
                $('#switch_'+brace.action_id).append("<div id=switch_"+brace.action_id +" class='slider round'></div>");
                $('#div_'+brace.action_id).append("</label>");
                $('#action-control-area').append("</div>");
            });
        },
        error: function(shr, status, error) {
            console.log('Error: ' + error.message);
        },
    });

    

}); // end of document.ready function

function update_flag(action_id) {
    if ($('#_' + action_id).is(':checked') == true) {
        $.ajax({
            type: "POST",
            url: 'http://optumistics-dev.us-east-1.elasticbeanstalk.com/general/update/flag_status/on/' + action_id,
            success: function (data) {

            },
            error: function (shr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    }
    if ($('#_' + action_id).is(':checked') == false) {
        $.ajax({
            type: "POST",
            url: 'http://optumistics-dev.us-east-1.elasticbeanstalk.com/general/update/flag_status/off/' + action_id,
            success: function (data) {

            },
            error: function (shr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    }
}

function w3_open() {
    document.getElementById("main").style.marginLeft = "18%";
    document.getElementById("mySidebar").style.width = "18%";
    document.getElementById("mySidebar").style.display = "block";
}
function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
}
function div_show() {
    document.getElementById('flag-registration').style.display = "block";
}
function div_hide(){
    document.getElementById('flag-registration').style.display = "none";
}