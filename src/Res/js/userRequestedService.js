$(document).ready(function() {

    $('#favoriteForm').submit(function(event) {
        var id = $('#id').val();
        var data = 'id=' + encodeURIComponent(id);
        $.ajax({
            url: $("#favoriteForm").attr("action"),
            data: data,
            type: "GET",

            success: function(response) {
                if (response == "isFavourite") {
                    $("#favoriteForm").addClass("added");
                } else if (response == "isNotFavourite") {
                    $("#favoriteForm").removeClass("added");
                }
            },
            error: function(xhr, status, error) {
                alert(xhr.responseText);
            }
        });
        return false;
    });

    $('.useragentform-wrapper select#customer > option').each(function() {
        if ($(this).html().length > 28) {
            $(this).html($(this).html().substr(0, 25) + '...');
        }
    });


    if ($('input#externalURL')) {
        if ($('input#externalURL').val().length <= 0)
            creatModalPopup();
    } else {
        creatModalPopup();
    }



    $('.related-service-content .load-more-services').on('click', function() {
        $(this).closest('.accordion-wrapper').addClass('loaded');
    });
    $(document).on('click', '#user-agent #submitFrame', function(e) {
        e.preventDefault();

        var $form = $('#user-agent');
        var id = $('#id', $form).val();
        var customer = $('#customer', $form).val();
        var customerSplit = customer.split("#");
        var serviceName = $('#userServiceName', $form).val();
        if (!customer || customer.length <= 0) {
            $form.addClass('invalid-form');
            return;
        } else {
            $form.removeClass('invalid-form');
        }
        var rememberMe = $('#remember', $form).get(0).checked;
        var data = 'id=' + encodeURIComponent(id) + "&customer=" + encodeURIComponent(customer) + "&remember=" + encodeURIComponent(rememberMe) + "&serviceName=" + encodeURIComponent(serviceName);
        console.log(data);
        $.ajax({
            url: $form.attr("action"),
            data: data,
            type: "POST",

            success: function(response) {

                var ifrm = {};
                if ($("iframe#frame1").length > 0) {
                    ifrm = $("iframe#frame1");
                    ifrm.attr('src', response);
                } else {
                    ifrm = $('<iframe name="frame1" id="frame1" width="100%" height="1000" onload="iframeResizer();"></iframe>');
                    ifrm.attr('src', response).insertBefore($('body').find('section.content .sticky-sidebar'));
                }
                $('.full-screen-popup.user-agent-popup a.close-button').trigger('click');
                $('.welcome-msg .userAgent').html(customerSplit[1]+"-"+ customerSplit[0]);
            },
            error: function(xhr, status, error) {
                alert(xhr.responseText);
            }
        });
    });
    $("#user-agent select").on('change', function() {
        var $th = $(this);
        if ($th.val() && $th.val().length > 0) {
            $th.removeClass('not_chosen');
            $th.find('option').eq($th[0].selectedIndex).attr('selected', true).siblings('option').attr('selected', false);
            $th.closest('form').removeClass('invalid-form');
        }
    });


});


window.onload = function() {

    var isFav = $("#isFav").val() == 'true' ? true : false;
    if (isFav)
        $("#favoriteForm").addClass('added');
    else
        $("#favoriteForm").removeClass('added');

};


function creatModalPopup() {
    var userAgentPop = $('.user-agent-container');
    console.log(userAgentPop);
    if (userAgentPop.length > 0) {
        var dontOpenInIframe = false;
        var $pop = DT.modalPopup.createPopup(userAgentPop, 'user-agent-popup', dontOpenInIframe);
        DT.modalPopup.showPopup($pop);
    }
}
$('.select-user-agent').on('click', function() {
    var userAgentPopup = DT.modalPopup.getPopupInstance('user-agent-popup');
    userAgentPopup.addClass('clicked');
    if (userAgentPopup.length <= 0) {
        creatModalPopup();
    } else {
        console.log(userAgentPopup);
        DT.modalPopup.showPopup(userAgentPopup);
    }
});

function resizeIframe() {
    try {
        console.log('resize');
        var ifrm = document.getElementById('frame1');
        console.log(window.frames['frame1']);

        if (window.frames['frame1'] && window.frames['frame1'].document) {
            window.frames['frame1'].window.scroll(0, 0);
            var body = window.frames['frame1'].document.body;
            console.log(body);
            if (body) {
                var height = body.scrollHeight + 30;
                if (height < 600)
                    height = 600;
                ifrm.style.height = height + 'px';
            }
        }
    } catch (error) {
        console.log(error);
    }
}