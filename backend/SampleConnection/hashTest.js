

// function hashFunction(){
//     var hash = sha256.create();
//     hash.update('Message to hash');
//     console.log(hash.hex())
//     console.log("BREAAAKKKK********************************")
//     var hash2 = sha256.create();
//     hash2.update('Message2 to hash');
//     hash2.array();
//     console.log(hash2)
// }


function here(){
    
   //these are the variables that need to be assigned in order for the query to run
   //provider gender can be assigned null
    var provider_first_name='Sam';
    var provider_last_name='Crochet';
    var provider_gender='M';
    var provider_username='lmao';
    var person_type_id=20;
    var status_id=74;
    var password="hello"

    //the next two lines encrypt the password
    var encryptedData = CryptoJS.SHA256(password); 
    var password_hash=encryptedData.toString(CryptoJS.enc.Hex);
    
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/general/insert/Provider_Information/'+provider_first_name+'/'+provider_last_name+'/'+provider_gender+'/'+provider_username+'/'+password_hash+'/'+person_type_id+'/'+status_id,
        crossDomain:true,
        success: function(friends) {

         console.log(friends)
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },

    });

    }


function signIn(){
    //username and password needs to be defined
    var username='success';
    var password='password';

    //returned data will be assigned to password_check
    var password_check;
    
    //this is the code that encrypts the password entered to check against returned password data
    var encryptedData = CryptoJS.SHA256(password); 
    var password_hash=encryptedData.toString(CryptoJS.enc.Hex);
    console.log(password_hash)
    

    
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/portal/signin/providers/'+username,
        contentType: 'application/x-www-form-urlencoded',
        jsonpCallback: 'callback', 
        dataType : 'jsonp',   //you may use jsonp for cross origin request
        //crossDomain:true,
        success: function(data) {
            console.log(data[0])
            if(data.length>0){
               password_check=data[0].password
                if(password_check==password_hash){
                    console.log("success!!!")
                }
                else{
                    console.log("incorrect password")
                }
            }
            else{
                console.log("This username does not exist")
            }
        

        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },

    });

}

