sessionCheck();
$(document).ready(function(){
    $('#btnForLogin').click(function(){
        let usr, pswd;
        usr = $('#usernameForLogin').val();
        pswd = $('#passwordForLogin').val();
        var obj = {
            email : usr.toLowerCase(),
            password : pswd
        };
        var obj2 = JSON.stringify(obj);
        if(usr == '' || pswd == ''){
            console.log("Campos vacíos");
        } else {
            $.ajax({
                type: 'POST',
                url: 'http://tandas.smoothoperators.com.mx/damdaservice/api/auth/login',
                contentType: 'application/json; charset=utf-8',
                data: obj2,
                dataType: 'json',
                crossDomain: true,
                success: function(msg){
                    // console.log(msg);
                    // checar(msg);
                    Cookies.set('sessionExists', true, {expires:null});
                    // Cookies.set('userSerial', true, {expires:null});
                    sessionCheck();
                },
                error: function(r){
                    // $('input').css({'border':'1px solid red'});
                    $('.error-display').show();
                    $('.error-display').html('<span>Usuario y/o contrase&ntilde;a incorrectos.</span>')
                }
            });

        }
    });
});

// function checar(r){
//     console.log(r);
//     if(r.status == "User of Password Incorrect"){
//         $('#usernameForLogin').css({color:'red'});
//     }
// }

function sessionCheck(){
    if(typeof Cookies.get('sessionExists') !== 'undefined'){
        window.location.replace('index.html');
    } else {
        $('body').show();
    }
}