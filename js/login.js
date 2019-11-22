$(document).ready(function(){
    $('#btnForLogin').click(function(){
        let usr, pswd;
        usr = $('#usernameForLogin').val();
        pswd = $('#passwordForLogin').val();
        var obj = {
            email : usr.toLowerCase(),
            password : pswd
        }
        var obj2 = JSON.stringify(obj)
        

        if(usr == '' || pswd == ''){
            console.log("Campos vacíos");
        } else {
             $.ajax({
                 type: 'POST',
                 url: 'http://localhost:5000/api/auth/login',
                 contentType: 'application/json; charset=utf-8',
                 data: obj2,
                 dataType: 'json',
                 crossDomain: true,
                 success: function(msg){
                      console.log(msg);
                      checar(msg);
                 }
             });

        }
    });
});

function checar(r){
    if(r.status == false){
        console.log("falso");
    } else {
        console.log("verdadero");
    }
}