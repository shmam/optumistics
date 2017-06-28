// Adding Person Type
    $('#person_type_button').click(function () {
        var add_person_type = $("#add_person_type").val(); // getting Person Type val()
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/general/insert/Person_Type/' +add_person_type,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of Person Type</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    // Adding Question
    $('#question_button').click(function() {
        var question = $('#question').val(); // getting Question val()
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/general/insert/Question/' +question,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of Question</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    // Adding Flag Color
    $('#flag_color_button').click(function() {
        var flag_color_name = $('#flag_color_name').val(); // getting Flag Color Name val()
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/general/insert/Flag_Color/' +flag_color_name,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of Flag Color</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    // Adding Appointment Type
    $('#appointment_type_button').click(function() {
        var appointment_name = $('#appointment_name').val(); // getting Appointment Name val()
        var appointment_duration = $('#appointment_duration').val(); // getting Appointment Duration val(). If null, type in null.
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/general/insert/Appointment_Type/' +appointment_name +'/' +appointment_duration,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of Appointment Type</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    // Adding Status
    $('#status_button').click(function() {
        var status_name = $('#status_name').val(); // getting Status Name val()
        $.ajax({
            type: "POST",
            url:'http://localhost:3000/general/insert/Status/' +status_name,
            success: function(insert_status) {
               $('#insert_status').append("Successful Insertion of Status</br>");
            },
            error: function(xhr, status, error) {
               console.log('Error: ' +error.message);
            },
        });
    });

    // Adding NFC Bracelet
    $('#nfc_bracelet_button').click(function() {
        var nfc_status_id = $('#nfc_status_id').val();  // getting NFC Status ID val()
        var provider_nfc = $('#provider_nfc').val(); // getting provider_nfc val()
        var nfc_hex = $('#nfc_hex').val(); // getting nfc_hex val()
        $.ajax({
            type:"POST",
            url: 'http://localhost:3000/general/insert/NFC_Bracelet/' +provider_nfc +'/' +nfc_status_id +'/' +nfc_hex,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of NFC Bracelet</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    // Adding Room Information
    $('#room_button').click(function() {
        var room_name = $('#room_name').val(); // getting Room Name val()
        var room_status_id = $('#room_status_id').val(); // getting Room Status ID val()
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/general/insert/Room/" +room_name +'/' +room_status_id,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of Room</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    // Adding Survey Activity
    $('#survey_button').click(function() {
        var survey_patient_id = $('#survey_patient_id').val(); //getting Survey Patient ID val()
        var rating = $('#rating').val(); // getting Survey Rating val()
        var rating_date = $('#rating_date').val(); // getting Survey Rating Date val()
        var survey_question_id = $('#survey_question_id').val(); // getting Survey Question ID val()
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/general/insert/Survey_Activity/" +survey_patient_id
            + '/' +rating +'/' +rating_date + '/' +survey_question_id,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of Survey</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    // Adding Patient Information
    $('#patient_button').click(function() {
        var patient_first_name = $('#patient_first_name').val(); // getting Patient First Name val()
        var patient_last_name = $('#patient_last_name').val(); // getting Patient Last Name val()
        var patient_gender = $('#patient_gender').val(); // getting Patient Gender val(). If null, type in null.
        var patient_person_type_id = $('#patient_person_type_id').val(); // getting Patient Person Type ID val()
        $.ajax({
           type: "POST",
           url: 'http://localhost:3000/general/insert/Patient_Information/' +patient_first_name +'/' +patient_last_name +'/' +patient_gender +'/' +patient_person_type_id,
           success: function(insert_status) {
               $('#insert_status').append("Successful Insertion of Patient</br>");
           },
           error: function(xhr, status, error) {
               console.log('Error: ' +error.message);
           },
        });
    });

    // Adding Provider Information
    $('#provider_button').click(function() {
        var provider_first_name = $('#provider_first_name').val(); // getting Provider First Name val()
        var provider_last_name = $('#provider_last_name').val(); // getting Provider Last Name val()
        var provider_gender = $('#provider_gender').val(); // getting Provider Gender val(). If null, type in null.
        var provider_username = $('#provider_username').val(); // getting Provider Username val()
        var provider_password = $('#provider_password').val(); // getting Provider Password val()
        var provider_person_type_id = $('#provider_person_type_id').val(); // getting Provider Person Type ID val()
        var provider_status_id = $('#provider_status_id').val(); // getting Provider Status ID val()
        //the next two lines encrypt the password
        var encryptedData = CryptoJS.SHA256(provider_password); 
        var password_hash = encryptedData.toString(CryptoJS.enc.Hex);
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/general/insert/Provider_Information/" +provider_first_name +'/' +provider_last_name +'/' +provider_gender +'/' +provider_username +'/'
            +password_hash +'/' +provider_person_type_id +'/' +provider_status_id,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of Provider</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    // Adding Actions
    $('#actions_button').click(function() {
        var action_name = $('#action_name').val(); // getting Action Name val()
        var action_flag_color_id = $("#action_flag_color_id").val(); // getting Action Flag Color ID val()
        var button_label = $("#button_label").val(); // getting Button Label val()
        var action_duration = $("#action_duration").val(); // getting Action Duration val()
        var action_status_id = $("#action_status_id").val(); // getting Action Status ID val()
        var icon = $("#icon").val(); // getting Icon val(). If null, type in null.
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/general/insert/Actions/" +action_name +'/' +action_flag_color_id +'/'
            +button_label + '/' +action_duration +'/' +action_status_id +'/' +icon,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of Action</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    // Adding Activated NFC Provider
    $('#activatednfc_provider_button').click(function() {
        var activatednfc_provider_id = $("#activatednfc_provider_id").val(); // getting Provider ID val()
        var activatednfc_provider_room_id = $("#activatednfc_provider_room_id").val(); // getting Room ID val() If null, type in null.
        var activatednfc_provider_nfc_id = $("#activatednfc_provider_nfc_id").val(); // getting Provider NFC ID val()
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/general/insert/ActivatedNFC_Provider/" +activatednfc_provider_id +'/'
            +activatednfc_provider_room_id +'/' +activatednfc_provider_nfc_id,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of Acitvated Provider NFC</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    // Adding Appointment
    $('#appointment_button').click(function() {
        var appointment_start_time = $('#appointment_start_time').val(); // getting Appointment Start Time val()
        var appointment_end_time = $('#appointment_end_time').val(); // getting Appointment End Time val()
        var appointment_patient_id = $('#appointment_patient_id').val(); // getting Appointment Patient ID val()
        var appointment_appointment_type_id = $('#appointment_appointment_type_id').val(); // getting Appointment Type ID val(). If null, type in null.
        var appointment_status_id = $('#appointment_status_id').val(); // getting Appointment Status ID val()
        var appointment_date = $('#appointment_date').val(); // getting Appointment Date val()
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/general/insert/Appointment/" +appointment_start_time +'/' +appointment_end_time +'/'
            +appointment_patient_id +'/' +appointment_appointment_type_id +'/' +appointment_status_id +'/' +appointment_date,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of Appointment</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    // Adding Activated NFC Patient
    $('#activatednfc_patient_button').click(function() {
        var activatednfc_patient_room_id = $("#activatednfc_patient_room_id").val();  // getting Room ID val() If null, type in null.
        var activatednfc_patient_appointment_id = $('#activatednfc_patient_appointment_id').val();  // getting Appointment ID val()
        var activatednfc_patient_nfc_id = $("#activatednfc_patient_nfc_id").val();  // getting Patient NFC ID val()
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/general/insert/ActivatedNFC_Patient/" +activatednfc_patient_room_id +'/'
            +activatednfc_patient_appointment_id +'/' +activatednfc_patient_nfc_id,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of Acitvated Patient NFC</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    // Adding Action Performed
    $('#action_performed_button').click(function() {
        var action_performed_action_id = $("#action_performed_action_id").val(); // getting Action Performed Action ID val()
        var action_performed_room_id = $("#action_performed_room_id").val();  // getting Room ID val() If null, type in null.
        var action_performed_appointment_id = $("#action_performed_appointment_id").val();  // getting Appointment ID val() If null, type in null.
        var action_performed_start_time = $("#action_performed_start_time").val(); // getting Action Performed Start Time val()
        var action_performed_end_time = $("#action_performed_end_time").val(); // getting Action Performed End Time val()
        var action_performed_provider_id = $("#action_performed_provider_id").val(); // getting Provider ID val() If null, type in null.
        var action_date = $("#action_date").val(); // getting Action Performed Date val()
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/general/insert/Action_Performed/" +action_performed_action_id +'/'
            +action_performed_room_id +'/' +action_performed_appointment_id +'/'
            +action_performed_start_time +'/' +action_performed_end_time +'/' +action_performed_provider_id +'/' +action_date,
            success: function (insert_status) {
                $("#insert_status").append("Successful Insertion of Action Performed</br>");
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });