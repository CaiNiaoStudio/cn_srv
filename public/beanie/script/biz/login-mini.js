$(function() {

    function getUserAgent(){
        return navigator.userAgent.toLowerCase();
    }

    $('#loginNo').focus(function(){
        var text = $(this).val();
        if (text == '豆豆号或邮箱或手机号码'){
            $(this).val('');
        }
    }).blur(function (){
        var text = $.trim($(this).val());
        if (!text){
            $(this).val('豆豆号或邮箱或手机号码');
        }
    }).bind('keyup cut paste', function () {
        onContentChanged();
    });

    $('#password').bind('keyup cut paste', function () {
        onContentChanged();
    });

    function isInputValid() {
        var loginNo = $.trim($('#loginNo').val());
        var password = $('#password').val();
        if (loginNo == '豆豆号或邮箱或手机号码')
            loginNo = '';
        if (!loginNo || password.length < 6 || password.length > 25)
            return false;

        return true;
    }

    function onContentChanged() {
        if (!isInputValid()){
            $('#submit-button').button('disable');
        } else {
            $('#submit-button').button('enable');
        }
    }

    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function submitForm()
    {
        if (!isInputValid())
            return;

        var loginNo = $.trim($('#loginNo').val());
        var password = $('#password').val();
        if (loginNo == '豆豆号或邮箱或手机号码')
            loginNo = '';

        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            jsonpCallback: 'success_callback',
            crossDomain: true,
            url: '/api/signin?method=ajax',
            data: $.param({loginNo: loginNo, passwd: password, webUa: getUserAgent()})
        }).success(function (data) {
            switch(data.code) {
                case 403:
                    $('.error-text').text('禁止登录！');
                    $('.error-tips').show();
                    startTimer();
                    break;
                case 400:
                case 401:
                    $('.error-text').text('用户名或密码错误!');
                    $('.error-tips').show();
                    startTimer();
                    break;
                case 200:
                {
                    var newId = data.userId?data.userId:'';
                    var gotoUrl = getParameterByName('ref');
                    var myId = getParameterByName('id');
                    if (newId == myId && gotoUrl && gotoUrl.length > 0) {
                        document.location.href = gotoUrl;
                    } else {
                        document.location.href = '/2/app/timeline';
                    }
                }
                    break;
                default:
                    $('.error-text').text('亲，网络不给力，请休息一会再回来。');
                    $('.error-tips').show();
                    startTimer();
                    break;
            }
        }).error(function () {
            $('.error-text').text('亲，网络不给力，请休息一会再回来。');
            $('.error-tips').show();
            startTimer();
        });
    }

    var timerId;
    function startTimer(){
        if (timerId){
            clearTimeout(timerId);
        }
        timerId = setTimeout(function(){
            $('.error-tips').fadeOut();
        }, 2000);
    }

    $('input').keydown(function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            submitForm();
        }
    });

    $('#submit-button').button().click(function(){
        submitForm();
    });

    $('#apple-student').button();

    onContentChanged();
});
