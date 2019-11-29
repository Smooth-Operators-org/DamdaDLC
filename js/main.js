sessionCheck();
MicroModal.init();

$(document).ready(function(){

    $('#openFixedMenu').click(function(){
        $('#fixedMenu').show();
    });
    $('#closeFixedMenu').click(function(){
        $('#fixedMenu').hide();
    });
    $('#open-modal-1').click(function(){
        MicroModal.show('modal-1');
    });
    $('.cerrarSession').click(function(e){
        e.preventDefault();
        Cookies.remove('sessionExists');
        sessionCheck();
    });
    // PRUEBA DE CONEXIÓN A LA API
    $('#estoEsUnaPrueba').click(function(){
        let dataPersona = '657489';
        let urlPost = 'http://localhost:5000/api/users/';
        let urlDef = urlPost + dataPersona;
        // $.post(urlDef, function(e){
        //     console.log(e);
        // }, "JSON");
        $.ajax({
            type: 'GET',
            crossDomain: true,
            url: urlDef,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            responseType: "application/json; charset=utf-8",
            headers: {
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'GET',
                'Access-Control-Allow-Headers':'application/json'
            },
            success: function(msg){
                console.log(msg);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function(){
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid', 'interaction', 'timeGrid'],
        header: {
            left: 'dayGridMonth,timeGridWeek,timeGridDay',
            right: 'title'
        },
        footer: {
            right: 'prevYear,prev,next,nextYear'
        }
    });
    calendar.on('dateClick', function(info){
        console.log('clicked on ' + info.dateStr);
    });
    calendar.render();
});

function sessionCheck(){
    if(typeof Cookies.get('sessionExists') === 'undefined'){
        window.location.href = 'login.html';
    } else {
        $('body').show();
    }
}