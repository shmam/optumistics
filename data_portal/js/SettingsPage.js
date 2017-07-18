// variable to save action clicked id
var action_clicked;

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

    // AJAX CALL: get all the available color 
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: 'http://applicationDashboard.us-east-1.elasticbeanstalk.com/portal/present/Flag_Color/name',
        success: function(data) {
            $.each(data, function(i, brace)
            {
                // append to the dropdown menu
                $("#flag-color-dropdown").append("<option id=" +brace.flag_color_id +">"+ brace.flag_color_name + "</option>");
                // next three lines = append available color circle for update action color purposes
                $('#available-color').append("<div class='col-md-1' id=div_" +brace.flag_color_id +"></div>");
                $('#div_'+brace.flag_color_id).append("<svg height='80' width='80'>" 
                                        +"<circle onclick=\"update_flag_color_02("+brace.flag_color_id +")\" id= circle_"+brace.flag_color_id +" cx='40' cy='40' r='35' stroke='black' stroke-width='2' fill='"+brace.flag_hex +"'/>"
                                    +"</svg><br>");
            });

            // set the color-display background color to the first available color so that it shows up on popup window
            document.getElementById("color-display").style.backgroundColor = data[0].flag_color_name;
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    }); //end of ajax call

    // Submit the action and put all the info in the Actions Table
    $('#submitFlag').click(function() {
        if(document.getElementById('action-name-input').value == "") { // check for empty action name
            alert("Please enter an action name");
        }
        if(document.getElementById('button-label-input').value == "") { // check for empty button label
            alert("Please enter a button label");
        }
        if(document.getElementById('exp-duration-input').value == "") { // check for empty expected duration
            alert("Please enter an expected duration for this action");
        }
        var action_name = $('#action-name-input').val();
        var action_flag_color_id = $("#flag-color-dropdown option:selected").attr("id"); //get the id value for the selected dropdown menu
        var button_label = $("#button-label-input").val(); 
        var action_duration = $("#exp-duration-input").val();
        // AJAX CALL: post the action to the Actions Table
        $.ajax({
            type: "POST",
            url: "http://applicationDashboard.us-east-1.elasticbeanstalk.com/general/insert/Actions/" +action_name +'/' +action_flag_color_id +'/'
            +button_label + '/' +action_duration +'/74/NULL',
            success: function (insert_status) {
                if(insert_status == "Unsuccessful insertion into Actions table. Action name must be unique.") // check for unique action name
                {
                    alert("Action name must be unique, please choose another action name and try again.");
                }
                else {
                    alert("Action Successfully Added");
                    window.location.reload();
                    div_hide();
                }
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    }) // end of submitFlag click function

    // change the color of color-display as you click on different color name
    $("#flag-color-dropdown").change(function() {
        document.getElementById("color-display").style.backgroundColor = $("#flag-color-dropdown option:selected").text();
    })

    // AJAX CALL: get all actions and show them on the action control area div tag (name + circle w/ color + slider)
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: 'http://applicationDashboard.us-east-1.elasticbeanstalk.com/dashboard/present/actions',
        success: function(data) {
            $.each(data, function(i, brace) {
                // append div_action_id tag for each action
                $('#action-control-area').append("<div class='col-md-1' id=div_" +brace.action_id +">");
                // append action name for each action
                $('#div_'+brace.action_id).append("<br/><b><p id=action_" +brace.action_id +" class = 'animated fadeIn'>" +brace.action_name +"</p></b>");
                // next 2 lines = making circles with chosen color for each action
                $('#div_'+brace.action_id).append("<svg height='80' width='80'>" 
                                        +"<circle onclick=\"show_update_flag_color_screen("+brace.action_id+")\" id= circle_"+brace.action_id +" class = 'animated fadeIn' cx='40' cy='40' r='35' stroke='black' stroke-width='2' fill='"+brace.flag_hex +"'/>");
                // append a div tag for container_action_id for each action
                $('#div_'+brace.action_id).append("<div id=container_"+brace.action_id +" class=\"container\"></div>");
                // next 6 lines = append round slider + end div tag
                $('#container_'+brace.action_id).append("<label id=switch_"+brace.action_id +" class='switch'>");
                $('#switch_'+brace.action_id).append("<input onclick=\"update_action_status("+brace.action_id+")\" id=_"+brace.action_id +" type='checkbox'>");
                update_check(brace.status_id,brace.action_id);
                $('#switch_'+brace.action_id).append("<div id=switch_"+brace.action_id +" class='slider round'></div>");
                $('#container_'+brace.action_id).append("</label>");
                $('#action-control-area').append("</div>");
            });
        },
        error: function(shr, status, error) {
            console.log('Error: ' + error.message);
        },
    });


    // SHOW update-flag-color popup window
    $('#update-flag-button-close').click(function() {
        div_hide_update();
    })

}); // end of document.ready function

// If status = active, change slider = on. If status = inactive, change slider = off
function update_check(status_id,action_id) {
    if(status_id == 74) {
        $('#_'+action_id).prop('checked', true);
    }
    else {
        $('#_'+action_id).prop('checked', false);
    }
}

// AJAX CALL: if slider = on, update action status_id to 74, and if slider = off, update action status_id to 75
function update_action_status(action_id) {
    if ($('#_' + action_id).is(':checked') == true) { // slider with action_id = on
        $.ajax({
            type: "POST",
            url: 'http://applicationDashboard.us-east-1.elasticbeanstalk.com/general/update/flag_status/on/' + action_id,
            success: function (data) {
                window.location.reload(); // reload the page
            },
            error: function (shr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    }
    if ($('#_' + action_id).is(':checked') == false) { // slider with action_id = off
        $.ajax({
            type: "POST",
            url: 'http://applicationDashboard.us-east-1.elasticbeanstalk.com/general/update/flag_status/off/' + action_id,
            success: function (data) {
                window.location.reload(); //reload the page
            },
            error: function (shr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    }
}

// SHOW update flag color popup window 
function show_update_flag_color_screen(action_id) {
    if ($('#_' + action_id).is(':checked') == true) { // slider with action_id = on
        action_clicked = action_id;
        div_show_update();
    }
    else {
        alert("Cannot update flag color because Action is inactive.");
    }
}

// AJAX call to update the Action's Flag Color
function update_flag_color_02(flag_color_id) {
    $.ajax({
        type: "POST",
        url: 'http://applicationDashboard.us-east-1.elasticbeanstalk.com/general/update/flag_color/'+action_clicked +'/'+flag_color_id,
        success: function(data) {
            window.location.reload(); // reload the page
            div_hide_update(); // close the popup window
        },
        error: function (shr, status, error) {
            console.log('Error: ' + error.message);
        },
    });
}

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

// SHOW flag-registration popip window
function div_show() {
    document.getElementById('flag-registration').style.display = "block";
}

// HIDE flag-registration popip window
function div_hide(){
    document.getElementById('flag-registration').style.display = "none";
    $('input').val(""); // clear all field when close the popup window
}

// SHOW update-flag-color popup window
function div_show_update() {
    document.getElementById('update-flag-color').style.display = "block";
}

// HIDE update-flag-color popup window
function div_hide_update(){
    document.getElementById('update-flag-color').style.display = "none";
}