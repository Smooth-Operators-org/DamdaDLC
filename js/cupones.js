sessionCheck();
MicroModal.init();
$(document).ready(function(){
    loadAllCoupons();
    $('#openFixedMenu').click(function(){
        $('#fixedMenu').show();
    });
    $('#closeFixedMenu').click(function(){
        $('#fixedMenu').hide();
    });
    $('#open-insertcoupon').click(function(){
        MicroModal.show('modal-insertcoupon');
    });
    $('.cerrarSession').click(function(e){
        e.preventDefault();
        Cookies.remove('sessionExists');
        Cookies.remove('userSerial');
        Cookies.remove('userRole');
        sessionCheck();
    });
    $('input[type=radio][name=tipoCoupon]').change(function(){
        if($('input[name=tipoCoupon]:checked').val() == '1'){
            console.log("1");
            changeToPercent();
            loadPercentInput();
        } else {
            console.log("2");
            changeToFixed();
        }
    });
    loadPercentInput();
    $('.chosen-select').chosen({width:'100%'});
    $(function(){
        let hoy = new Date();
        $('#startDate, #endDate').datepicker({
            dateFormat: 'yy-mm-dd'
        });
        $('#startDate, #endDate').datepicker("option", "minDate", new Date(hoy.getFullYear(), String(hoy.getMonth()).padStart(2, '0'), String(hoy.getDate()).padStart(2, '0')));
    });
    $('#btnInsertCoupon').click(function(){
        let tipoCoupon = $('input[type=radio][name=tipoCoupon]:checked').val();
        let valorCoupon = $('input[name=valorCoupon]').val();
        let selectForApp = $('select[name=selectForApp]').val();
        let selectForPlan = $('select[name=selectForPlan]').val();
        let startDate = $('input[name=startDate]').val();
        let endDate = $('input[name=endDate]').val();
        let tipotipo = $('input[name=valorCoupon').data('typenumber');
        let e = 0;
        let d = 0.0;
        if(tipotipo == 'entero'){
            d = valorCoupon;
            e = 0.0;
        }else{
            e = valorCoupon;
            d = 0.0;
        }
        let obj = {
            Type: tipoCoupon,
            Porcent: e,
            Amount: d,
            Platform: selectForApp,
            Plan: selectForPlan,
            Start: startDate,
            End: endDate
        };
        let obj2 = JSON.stringify(obj);
        console.log(tipoCoupon, valorCoupon, selectForApp, selectForPlan, startDate, endDate);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/api/coupon/register',
            contentType: 'application/json; charset=utf-8',
            data: obj2,
            dataType: 'json',
            crossDomain: true,
            success: function(r){
                MicroModal.close('modal-insertcoupon');
                $('#insertCouponForm')[0].reset();
                $('select[name=selectForApp]').val('').trigger('chosen:updated');
                $('select[name=selectForPlan]').val('').trigger('chosen:updated');
                MicroModal.show('modal-responseInsert');
                $('#modal-responseInsert-title').text(r.message);
                $('#codeResponse input').val(r.code);
            },
            error: function(r){
                // Ah
            }
        });
    });
    // $.ajax({
    //     type: 'POST',
    //     url: 'http://localhost:5000/api/coupon',
    //     contentType: 'application/json',
    //     dataType: 'json',
    //     crossDomain: true,
    //     success: function(r){
    //         console.log(r);
    //     },
    //     error: function(r){
    //         console.log(r);
    //     }
    // });
});
function sessionCheck(){
    if(typeof Cookies.get('sessionExists') === 'undefined'){
        window.location.href = 'login.html';
    } else {
        $('body').show();
    }
}
function changeToFixed(){
    $('.numberContainer').html(`
        <div class="iconoForCoupon start">
            <i class="fas fa-dollar-sign"></i>
        </div>
        <input type="number" name="valorCoupon" min=".01" step=".01" value="10" data-typenumber="decimal">
    `);
}
function changeToPercent(){
    $('.numberContainer').html(`
        <input type="number" name="valorCoupon" min="1" max="99" step="1" value="10" data-typenumber="entero">
        <div class="iconoForCoupon end">
            <i class="fas fa-percent"></i>
        </div>
    `);
}
function loadPercentInput(){
    $('<div class="numberContainer-nav"><div class="numberContainer-button numberContainer-up">+</div><div class="numberContainer-button numberContainer-down">-</div></div>')
        .insertAfter('.numberContainer input');
        $('.numberContainer').each(function(){
            var spinner = $(this),
            input = spinner.find('input[type=number]'),
            btnUp = spinner.find('.numberContainer-up'),
            btnDown = spinner.find('.numberContainer-down'),
            min = input.attr('min'),
            max = input.attr('max');
            btnUp.click(function(){
                var oldValue = parseFloat(input.val());
                if(oldValue >= max){
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue + 1;
                }
                if(isNaN(oldValue)){
                    var newVal = 99;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
            btnDown.click(function(){
                var oldValue = parseFloat(input.val());
                if(oldValue <= min){
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - 1;
                }
                if(isNaN(oldValue)){
                    var newVal = 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
        });
}
function copyTheCode(){
    let textBox = $('#codeResponse input');
    textBox.select();
    document.execCommand("copy");
    textBox.css({'border':'1px solid #11aa44', color: '#11aa44'});
    $('#copyDone').html('<small>Copied!</small>');
}
function loadAllCoupons(){
    let serv = 'http://tandas.smoothoperators.com.mx/damdaservice';
    let local = 'localhost:5000';
    // $.ajax({
    //     type: 'GET',
    //     url: local + '/api/coupons/',
    //     contentType: 'application/json; charset=utf-8',
    //     dataType: 'json',
    //     crossDomain: true,
    //     success: function(r){
    //         console.log(r);
    //     },
    //     error: function(r){
    //         console.log(r);
    //     }
    // });
}