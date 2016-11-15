var bxslider = [];
var i = 0;
$(document).ready(function() {
    var top_nav_sections = ['.home-left-wid-col', '.home-list-wrap', '.home-content-boxs', '.home-slider-tabs'];
    $('.top-navigation .top-nav li:not(.home-link,.contact-link,.howtostart-link,.back-to-classic) a ').on('click ', function(e) {
        e.preventDefault();
        $(this).parent().addClass('active').siblings().removeClass('active');
        var index = $('.top-navigation .top-nav li:not(.home-link,.contact-link,.howtostart-link,.back-to-classic) a ').index($(this));

        $('body,html').animate({
            scrollTop: $(top_nav_sections[index]).position().top
        }, 1000);
    });
    /* -------------------------------------- parallax scroll  ----------------------------------- */
    $('body').niceScroll({
        'cursorwidth': '8px',
        'horizrailenabled': false,
        "autohidemode": false
    });

    setParallaxHeight();
    $('.home-slider .bxslider, #training-cal-slider .bxslider, .home-tips-hints-slider').each(function(i) {
        var $slideMargin = i == 0 ? 0 : 10;
        bxslider[i++] = $(this).bxSlider({
            mode: 'horizontal',
            slideMargin: $slideMargin,
            captions: false,
            onSlideAfter: function($ele, oldIndex, newIndex) {
                $ele.find('.animatedparent .animated').addClass('go');
                $ele.siblings().find('.animatedparent .animated').removeClass('go');
            }
        });
    });

    $(".owl-carousel").owlCarousel();
    $('.subscribe-btn').on('click', function() {
        $(this).closest('form').submit();
    });
    $('.hero-scroll-down').on('click', function() {
        console.log($(this).offset().top);
        console.log($(this).height());
        $('body,html').animate({
            scrollTop: $(this).offset().top + $(this).height() - 30
        }, 500);
    });
});


var timer;
$(window).on('resize', function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
        setParallaxHeight();
    }, 250);
});

function setParallaxHeight() {
    var $windowHeight = $(window).height();
    $('#home-hero-slider .hero-img').height($windowHeight - $('header').height());
    if (bxslider.length > 0) {
        $.each(bxslider, function(index, value) {
            value.reloadSlider();
        });
    }
}