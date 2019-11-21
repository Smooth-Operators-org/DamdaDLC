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