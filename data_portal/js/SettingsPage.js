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

    $.ajax({ // get the available flag color name
        type: 'GET',
        dataType: 'jsonp',
        url: 'http://applicationDashboard.us-east-1.elasticbeanstalk.com/portal/present/Flag_Color/name',
        success: function(data) {
            $.each(data, function(i, brace)
            {
                $("#flag-color-dropdown").append("<option id=" +brace.flag_color_id +">"+ brace.flag_color_name + "</option>");
                $('#available-color').append("<svg height='80' width='80'>" 
                                        +"<circle onclick=\"update_flag_color_02("+brace.flag_color_id +")\" id= circle_"+brace.flag_color_id +" cx='40' cy='40' r='35' stroke='black' stroke-width='2' fill='"+brace.flag_color_name +"'/>" // append circle
                                    +"</svg><br>");
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
        if(document.getElementById('button-label-input').value == "") { // check for empty button label
            alert("Please enter a button label");
        }
        if(document.getElementById('exp-duration-input').value == "") { // check for empty expected duration
            alert("Please enter an expected duration for this action");
        }
        var action_name = $('#action-name-input').val();
        var action_flag_color_id = $("#flag-color-dropdown option:selected").attr("id");
        var button_label = $("#button-label-input").val(); 
        var action_duration = $("#exp-duration-input").val();
        $.ajax({ // post actions
            type: "POST",
            url: "http://applicationDashboard.us-east-1.elasticbeanstalk.com/general/insert/Actions/" +action_name +'/' +action_flag_color_id +'/'
            +button_label + '/' +action_duration +'/74/NULL',
            success: function (insert_status) {
                if(insert_status == "Unsuccessful insertion into Actions table. Action name must be unique.") // check for unique action name
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

    $.ajax({ // get + show action control area (name + circle + slider)
        type: 'GET',
        dataType: 'jsonp',
        async: false,
        url: 'http://applicationDashboard.us-east-1.elasticbeanstalk.com/dashboard/present/actions',
        success: function(data) {
            $.each(data, function(i, brace) {
                $('#action-control-area').append("<div class='card' id=div_" +brace.action_id +">"); // append action div tag
                $('#div_'+brace.action_id).append("<br/><b><p id=action_" +brace.action_id +" class = 'animated fadeIn'>" +brace.action_name +"</p></b>"); // append action name
                $('#div_'+brace.action_id).append("<svg height='80' width='80'>" 
                                        +"<circle onclick=\"show_update_flag_color_screen("+brace.action_id+")\" id= circle_"+brace.action_id +" class = 'animated fadeIn' cx='40' cy='40' r='35' stroke='black' stroke-width='2' fill='"+brace.flag_color_name +"'/>" // append circle
                                    +"</svg><br>");
                $('#div_'+brace.action_id).append("<div id=container_"+brace.action_id +" class=\"container\"></div>");
                $('#container_'+brace.action_id).append("<label id=switch_"+brace.action_id +" class='switch'>"); // next 4 lines = append round slider
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
        url: 'http://applicationDashboard.us-east-1.elasticbeanstalk.com/gneral/update/flag_color/'+action_clicked +'/'+flag_color_id,
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
}

// SHOW update-flag-color popup window
function div_show_update() {
    document.getElementById('update-flag-color').style.display = "block";
}

// HIDE update-flag-color popup window
function div_hide_update(){
    document.getElementById('update-flag-color').style.display = "none";
}