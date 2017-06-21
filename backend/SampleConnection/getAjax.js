
$(document).ready(function(){
    //used to make all the calls, change when we actually host 
    var host = 'http://localhost:3000'

    /**
     *  summary: total time taken FOR THAT DAY, given an action id, and a provider id
     *           ajax right now listening for click on component with id 'timeEDEA'
     *  route:   /portal/add/time/:provider_id/:action_id
     *  params:  patient_id, action_id
     *  author:  Sam Crochet
     *  
     */
    $("#timeEDEA").click(function(){
        
        // CHANGE THESE
        // Variables that are used in the URL call
        var patient_id
        var action_id

        $.ajax({
            type: 'GET',
            url:  host + '/portal/add/time/'+patient_id+'/'+action_id,
            contentType: 'application/x-www-form-urlencoded',
            jsonpCallback: 'callback', 
            dataType : 'jsonp', 
            success: function(data) {
                //CHANGE THIS TO RETURN HOWEVER YOU WANT
                console.log(data)
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        })
    })


    /**
     *  summary: total time taken between two dates, given action id, provider id, and two dates
     *           Ajax listening for click for id 'timeEDEAdate'
     *  route:   /portal/add/time/:provider_id/:action_id/:start_date/:end_date
     *  params:  patient_id, action_id, start_date, end_date
     *  author:  Sam Crochet
     * 
     */
    $("#timeEDEAdate").click(function(){
        
        // CHANGE THESE
        // Variables that are used in the URL call
        var patient_id
        var action_id
        var start_date
        var end_date 

        $.ajax({
            type: 'GET',
            url:  host + '/portal/add/time/'+provider_id+'/'+action_id+'/'+start_date+'/'+end_date,
            contentType: 'application/x-www-form-urlencoded',
            jsonpCallback: 'callback', 
            dataType : 'jsonp', 
            success: function(data) {
                //CHANGE THIS TO RETURN HOWEVER YOU WANT
                console.log(data)
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        })
    })


    /**
     *  summary: get the average time for actions performed today for each doctor and each task
     *           ajax call listening for component with id AvgTimeEDEA
     *  route:   /portal/average/time/:action_id/:provider_id
     *  params:  provider_id, action_id 
     *  author:  Sam Crochet
     * 
     */
     $("#AvgTimeEDEA").click(function(){
        
        // CHANGE THESE
        // Variables that are used in the URL call
        var patient_id
        var action_id

        $.ajax({
            type: 'GET',
            url:  host + '/portal/average/time/'+action_id+'/' + provider_id,
            contentType: 'application/x-www-form-urlencoded',
            jsonpCallback: 'callback', 
            dataType : 'jsonp', 
            success: function(data) {
                //CHANGE THIS TO RETURN HOWEVER YOU WANT
                console.log(data)
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        })
    })


    /**
     *  summary: get the average time for actions performed today for ALL DOCTORS and each task
     *           ajax call listening for component with id AvgTimeEA
     *  route:   /portal/average/time/:action_id
     *  params:  action_id 
     *  author:  Sam Crochet
     *  
     */
     $("#AvgTimeEA").click(function(){
        
        // CHANGE THESE
        // Variables that are used in the URL call
        var action_id

        $.ajax({
            type: 'GET',
            url:  host + '/portal/average/time/'+action_id,
            contentType: 'application/x-www-form-urlencoded',
            jsonpCallback: 'callback', 
            dataType : 'jsonp', 
            success: function(data) {
                //CHANGE THIS TO RETURN HOWEVER YOU WANT
                console.log(data)
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        })
     })


     /**
     *  summary: get average time for each tas
     *  route:   /portal/average/time/:action_id/:provider_id/:start_date/:end_date'
     *  params:  action_id 
     *  author:  Sam Crochet
     *  
     */
     $("#AvgTimeEA").click(function(){
        
        // CHANGE THESE
        // Variables that are used in the URL call
        var action_id

        $.ajax({
            type: 'GET',
            url:  host + '/portal/average/time/'+action_id,
            contentType: 'application/x-www-form-urlencoded',
            jsonpCallback: 'callback', 
            dataType : 'jsonp', 
            success: function(data) {
                //CHANGE THIS TO RETURN HOWEVER YOU WANT
                console.log(data)
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        })
     })


    
})