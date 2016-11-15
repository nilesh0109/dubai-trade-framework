/* --------------------- document.ready start --------------------------------- */
jQuery(document).ready(function(Modernizr) {

    var $bodyFontSize = sessionStorage.bodyFont || '1em';
    var $font = $bodyFontSize.slice(0, -2) * 100;
    setBodyFont($bodyFontSize);
    $("#defaultSlider.range-selector").each(function() {
        console.log("slider");
        $(this).slider({
            min: 85,
            max: 115,
            step: 15,
            isRTL: $('body').hasClass('ar'),
            value: $font,
            slide: function(event, ui) {
                sessionStorage.bodyFont = (ui.value / 100) + 'em';
                // window.location.reload();
                var $bodyFontSize = sessionStorage.bodyFont || '1em';
                var $font = $bodyFontSize.slice(0, -2) * 100;
                setBodyFont($bodyFontSize);

            }
        });
    });



    function setBodyFont(fontSize) {
        if ($('body').hasClass('home')) {

            $('body > .wrapper >*:not(.slide-section,footer)').css('font-size', fontSize);
            $('.home-slider .home-hero-slider,.home-slider .hero-scroll-down').css('font-size', fontSize);
        } else {
            $('.content').css('font-size', fontSize);
        }
    }

    $('.increase-font').on('click', function() {
        var opt = $("#defaultSlider").slider("option");
        if ($("#defaultSlider").slider("value") != opt.max) {
            $("#defaultSlider").slider("value", $("#defaultSlider").slider("value") + opt.step);
            sessionStorage.bodyFont = ($("#defaultSlider").slider("value") / 100) + 'em';
            var $bodyFontSize = sessionStorage.bodyFont || '1em';
            var $font = $bodyFontSize.slice(0, -2) * 100;
            setBodyFont($bodyFontSize);
            // window.location.reload();
        }
    });

    $('.decrease-font').on('click', function() {
        var opt = $("#defaultSlider").slider("option");
        if ($("#defaultSlider").slider("value") != opt.min) {
            $("#defaultSlider").slider("value", $("#defaultSlider").slider("value") - opt.step);
            sessionStorage.bodyFont = ($("#defaultSlider").slider("value") / 100) + 'em';
            var $bodyFontSize = sessionStorage.bodyFont || '1em';
            var $font = $bodyFontSize.slice(0, -2) * 100;
            setBodyFont($bodyFontSize);
            // window.location.reload();
        }
    });

    $('.increase-font-icon').on('click', function(e) {
        e.stopPropagation();
        $('.font-wrap').slideToggle();
    });

    $(document).on('click', '*:not(.font-sizing-wrap,.increase-font-icon)', function(e) {

        if ($(this).closest('.font-sizing-wrap').length > 0) {
            e.stopPropagation();
            return;
        } else {
            $('.font-wrap').slideUp();
        }
    });

    /* -----------------------------------page specific link active  -----------------------------------*/
    var side_links = [];
    var top_links = [];
    var hamburger_links = [];
    var hamburger_inner_links = [];

    function activate_page_nav(selector, arr_ele) {

        selector.each(function(i) {
            arr_ele[i++] = $(this).parent().data('pagename') || '';
        });
        $.each(arr_ele, function(index, value) {
            if (checkClass($('body'), value)) {
                selector.eq(index).parent().addClass('active').siblings().removeClass('active');
                if ($(this).parents('.hamburger-menu .submenu')) {
                    selector.eq(index).parents('.submenu').parent().addClass('active').siblings().removeClass('active');
                }
                return false;
            }
        });
    }
    activate_page_nav($('.nav-sidebar ul > li:not(.main-heading) > a'), side_links);
    activate_page_nav($('.top-navigation .top-nav > li:not(.home-link) > a'), top_links);
    activate_page_nav($('.hamburger-menu .top-nav > li > a'), hamburger_links);
    activate_page_nav($('.hamburger-menu .top-nav > li > .submenu >li > a'), hamburger_inner_links);

    function checkClass(ele, className) {

        var classes = '';
        if (ele.attr('class') && ele.attr('class').length > 0)
            classes = ele.attr('class').trim().split(' ');
        return classes.indexOf(className) > -1;
    }



    /* -----------------------------------lang change slider  -----------------------------------*/

    $('.lang-wrap > li').on('click', function() {
        if ($(this).hasClass('active'))
            return false;
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).hasClass('ar')) {
            $('body').addClass('ar');
            loadCssJs('../Res/css/styles-ar.css', 'css');
            loadCssJs('../Res/css/bootstrap-rtl.min.css', 'css');
            removeCssJs('../Res/css/styles.css', 'css');
        } else {
            $('body').removeClass('ar');
            loadCssJs('../Res/css/styles.css', 'css');
            removeCssJs('../Res/css/bootstrap-rtl.min.css', 'css');
            removeCssJs('../Res/css/styles-ar.css', 'css');
        }
        adjustDatePicker();
    });



    function loadCssJs(filename, filetype) {
        if (filetype == "js") { //if filename is a external JavaScript file
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
        } else if (filetype == "css") { //if filename is an external CSS file
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
        if (typeof fileref != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);

        }
    }

    function removeCssJs(filename, filetype) {
        var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist from
        var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
        var allsuspects = document.getElementsByTagName(targetelement)
        for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
            if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
                allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
        }
    }

    function adjustDatePicker() {
        var $rtl = $('body').hasClass('ar');

        if ($('.date-picker > input').length > 0)
            $('.date-picker > input').each(function() {
                $(this).datepicker('remove');
                $(this).datepicker({
                    rtl: $rtl,
                    format: 'dd/mm/yyyy',
                    todayHighlight: true,
                    endDate: '+0d',
                    autoclose: true
                });
            });

    }
    /* ---------------------------------------------- polls bar affix ------------------------------- */
    if ($('.sticky-sidebar').length > 0) {
        $('.sticky-sidebar').affix({
            offset: {
                bottom: $('footer').outerHeight(true) + 20,
            }
        });
        $('.sticky-sidebar .dragToScreen').on('click', function() {
            $(this).closest('.pollbar').toggleClass('pull');
        });
    }
    /* ------------------------------------------------ training detail page ------------------------------------------- */
    bx_training = [];
    $('.training-detail .home-tab-controller .bxslider').each(function(i) {
        bx_training[i++] = $(this).bxSlider({
            mode: 'horizontal',
            captions: false
        });
    });

    /* ----------------------------------------------------------- news detail slider -------------------------------- */
    if ($('.thumbnail-slider .bxslider').length > 0)
        bx_news_detail = $('.thumbnail-slider .bxslider').bxSlider({
            infiniteLoop: false,
            controls: false,
            pagerCustom: '.thumbnail-slider #bx-pager',
            onSliderLoad: function(currentIndex) {
                $('.thumbnail-slider .caption-bar .total-slide-count').html($('.thumbnail-slider .bxslider').find('li').length);
                $('.thumbnail-slider .caption-bar .current-slide-no').html(currentIndex + 1);
            },
            onSlideBefore: function($ele, oldIndex, newIndex) {
                $ele.addClass('active').siblings().removeClass('active');
                $('.thumbnail-slider .caption-bar .current-slide-no').html(newIndex + 1);
                pager_news_detail.find('li').eq(newIndex).addClass('active').siblings().removeClass('active');
                pager_news_detail.goToSlide(newIndex);
            }
        });
    if ($('.thumbnail-slider .pager-bxslider').length > 0)
        pager_news_detail = $('.thumbnail-slider .pager-bxslider').bxSlider({
            infiniteLoop: false,
            slideWidth: ($('.thumbnail-slider #bx-pager').innerWidth() - 30) / 4,
            slideMargin: 10,
            minSlides: 1,
            maxSlides: 4,
            moveSlides: 1,
            pager: false,
            controls: false,
            onSliderLoad: function(currentIndex) {
                $('.thumbnail-slider .pager-bxslider > li').eq(currentIndex).addClass('active').siblings().removeClass('active');
            }
        });


    $('.caption-bar a.prev-slide').click(function() {
        var current = bx_news_detail.getCurrentSlide();
        bx_news_detail.goToPrevSlide();
        pager_news_detail.goToPrevSlide();
    });

    $('.caption-bar a.next-slide').click(function() {
        var current = bx_news_detail.getCurrentSlide();
        bx_news_detail.goToNextSlide();
        pager_news_detail.goToNextSlide();
    });


    /* ------------------------------------ share & print icon click ---------------------------------------- */
    $('a.share').on('click', function() {
        $(this).siblings('.addthis_sharing_toolbox').toggle().focus();
    });

    $('a.print').on('click', function(e) {
        e.preventDefault();
        window.print();
    });
    $('.addthis_sharing_toolbox').focusout(function(e) {
        if (e.relatedTarget == $(this).siblings('a.share').get(0))
            return false;
        if ($(e.relatedTarget).closest('.addthis_sharing_toolbox').length > 0)
            return false;
        $(this).hide();
    });
    /* -----------------------------------activate one radio button at a time  -----------------------------------*/


    $(':radio').bind('change', function() {
        var th = $(this);
        if (th.is(':checked'))
            th.siblings('.radio-button').prop('checked', false);
    });
    /* ----------------------------------- header login buttons  -----------------------------------*/

    $('.mob-header-login').on('click', function(e) {
        e.preventDefault();
        $('.account-wrap').slideDown();
    });

    $('header .close-button').on('click', function(e) {
        e.preventDefault();
        $('.account-wrap').slideUp();

    });



    /* ----------------------------------- sticky login icons ----------------------------------- */
    $('.sticky-login-icon').on('click', function(e) {
        $(this).closest('.top-navigation.affix').find('.sticky-login-wrap').slideToggle().siblings('.sticky-search-wrap').slideUp();
        $('.sticky-login-wrap').focus();
    });
    $('.top-navigation .search-button,.mobile-menu .search-button').on('click', function(e) {

        if ($(this).parents('.sticky-search-wrap').length > 0)
            return false;
        var $searchWrap = $(this).closest('.top-navigation').length > 0 ? $(this).closest('.top-navigation').find('.sticky-search-wrap') : $(this).closest('.mobile-menu').siblings('.top-navigation').find('.sticky-search-wrap');
        $searchWrap.slideToggle().siblings('.sticky-login-wrap').slideUp();
        $('input.textBox', $searchWrap).focus();

    });


    $(".sticky-login-wrap,.sticky-search-wrap").on({
        focusout: function(e) {
            var that = $(this);
            if ($(e.relatedTarget).closest(that.get(0)).length <= 0) {
                that.slideUp();

            }
        }
    });

    /* ------------------------------------ logout button click ---------------------------------- */
    $('.logout-wrapper').on('>a', 'click', function() {
        sessionStorage.clear();
    });
    /*--------------------------------------- top nav search -----------------------------------------*/
    $('.top-navigation select.searchList ,.mobile-menu select.searchList').change(function() {
        $(this).removeClass('not_chosen');
    });
    /*    $(document).on("click", '.top-navigation:not(.affix) .search-container .search-button,.mobile-menu .search-container .search-button', function(e) {
        e.stopPropagation();
        var $container = $(this).closest('.search-container');
        if ($container.hasClass('open-search') && $container.find('input.textBox').val().length > 0) {
            $(this).closest('form').submit();
        }
        $container.toggleClass('open-search');
        $container.find('input').focus();

    });
    $('.top-navigation .search-container input,.mobile-menu .search-container input').focusout(function(e) {
        if (e.relatedTarget == $(this).parent().siblings('.search-button').get(0))
            return false;
        var $container = $(this).closest('.search-container');
        $container.removeClass('open-search');

    });
*/

    /*------------------------------------- move to top button ------------------------------------*/
    $('.move-top').on('click', function() {
        $('body,html').animate({
            scrollTop: 0
        }, 1500, "linear");
    });

    /* ------------------- next and previous button click registration page ---------- */

    $('.pages-container .button').on('click', function(e) {

        e.preventDefault();
        if ($(this).hasClass('disabled'))
            return;
        var current_index = $('.tab-links > li.active').index();
        var active_index = -1;
        if ($(this).hasClass('next'))
            active_index = current_index + 1;
        else if ($(this).hasClass('prev'))
            active_index = current_index - 1;

        var $active_link = $('.tab-links > li').eq(active_index);
        var $active_page = $('.pages-container .page').eq(active_index);
        $active_page.addClass('active').siblings().removeClass('active');
        $active_link.addClass('active').prevAll().addClass('activated').removeClass('active');
        $active_link.nextAll().removeClass('active activated ');

        if (active_index == $('.tab-links > li').length - 1)
            $('.pages-container .button.next').addClass('disabled').siblings().removeClass('disabled');
        else if (active_index == 0)
            $('.pages-container .button.prev').addClass('disabled').siblings().removeClass('disabled');
        else
            $('.pages-container .button').removeClass('disabled');
    });


    /* ----------------------------------- hamburger menu  -----------------------------------*/
    $('.mobile-menu-btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('html').toggleClass('pushed-left');
        $(".hamburger-menu").focus().css('padding-top', $(this).parent().offset().top + 'px');
    });

    $('.hamburger-menu .top-nav a').on('click', function(e) {
        e.stopPropagation();
        $('.hamburger-menu').focus();
        var $this = $(this);
        var $parent_li = $this.parent();
        var $sublist = $this.siblings('.submenu');
        if ($sublist.length > 0 && !$parent_li.hasClass('active')) {
            $parent_li.addClass('active').siblings().removeClass('active');
        }
    });

    $(document).on('click', '*:not(.hamburger-menu)', function(e) {
        if ($(this).closest('li').length >= 0)
            $('html').removeClass('pushed-left');
    });

    /* ----------------------------------------------- gallery popup  ---------------------------------------------------- */
    $('.gallery-element > a').on('click', function() {

        var $popup = $('.gallery-popup');
        if ($('body .wrapper').find('>.gallery-popup').length <= 0) {
            $popup = $('.gallery-container').next('.gallery-popup');
            $('body .wrapper').append($popup);
        }

        $popup.height($(window).height()).css({
            top: $(window).scrollTop()
        });
        $popup.addClass('active');
        $('body').addClass('gallery-overlay-open');
        var iframe = '';
        if ($(this).data('type') == 'image') {
            iframe = '<img class="popup-image" src="' + $(this).data("src") + '" />';
        } else if ($(this).data('type') == 'video') {
            var videoSrc = $(this).data('src').replace(/\/v\//g, '/embed/');
            if (DT.screen.isMobile())
                iframe = '<iframe width="320" height="240" frameborder="0" scrolling="no" src="' + videoSrc + '"> </iframe>';
            else
                iframe = '<iframe width="640" height="480" frameborder="0" scrolling="no" src="' + videoSrc + '"> </iframe>';
        }
        $popup.find('.gallery-body').html(iframe);
    });

    $('.gallery-popup').not('.gallery-content').on('click', function() {
        var $popup = $('.gallery-popup');
        $popup.removeClass('active');
        $popup.find('iframe').attr('src', '');
        $('body').removeClass('gallery-overlay-open');
    });

    /* ----------------------------------------------- form validation js  ----------------------------------------------- */

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        var re = /^(?:\(?\+?[0-9]{1,3}\)?)?[0-9]{9,10}$/;
        return re.test(phone);
    }
    if ($("form.form-validate").length > 0) {
        $.validator.addMethod("checkbox", function(value, element) {

            return $('.checkbox-one:checked', $(element).closest('.checkBox-container')).length > 0;
        }, 'At least one option must be selected.');

        $.validator.addMethod("select", function(value, element) {
            return $(element).val() && $(element).val().length > 0;
        }, 'Please select an option');

        $.validator.addMethod("email", function(value, element) {
            return validateEmail(value);
        }, 'Please enter a valid email address');

        $.validator.addMethod("tel", function(value, element) {
            return validatePhone(value);
        }, 'Please enter a valid phone address');



        $("form.form-validate").each(function() {
            $(this).on('submit', function(e) {
                if (!$(this).valid())
                    return false;
            });
            $(this).validate({
                errorPlacement: function(error, element) {
                    if (element.is(":radio")) {
                        element.parent().parent().find('label[for="radio"]').after(error.addClass('radio-error'));

                    } else if (element.is(":checkbox")) {

                        element.parent().parent().find('label[for="checkBox-container"]').after(error.addClass('checkbox-error'));
                    } else if (element.is("select")) {
                        element.parent().addClass('selectList-error').after(error.addClass('select-error'));
                    } else {
                        error.insertAfter(element);
                    }
                },
                highlight: function(element, errorClass) {
                    if ($(element).is(":radio")) {
                        $(element).parent().parent().find('.error').addClass('radio-error');

                    } else if ($(element).is(":checkbox")) {
                        $(element).parent().parent().find('.error').addClass('checkbox-error');
                    } else if ($(element).is("select")) {
                        $(element).parent().addClass('selectList-error').find('.error').addClass('select-error');
                    }

                    //  $(element).show();

                },
                success: function(label) {
                    if (label.hasClass('radio-error')) {
                        label.removeClass('radio-error');
                    } else if (label.hasClass('checkbox-error')) {
                        label.removeClass('checkbox-error');
                    } else if (label.hasClass('select-error')) {
                        label.removeClass('select-error').siblings().removeClass('selectList-error');
                    }
                }

            });
        });


    };


    $('.home-tab-controller-nav li a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });

    /* ------------------------------------------------  contact us captcha  -------------------------------------------- */
    if ($('.contact-us').length > 0 || $('.forgot-password-page').length > 0 || $('.discussion-create').length > 0 || $('.flush-cache').length > 0)
        Captcha();
    $('.search-filters .search-btn').on('click', function() {
        submitForm();
    });

    $('.search-filters input:radio').on('change', function() {
        submitForm();
    });

    $('.search-filters select').on('change', function() {
        submitForm();
    });


    var submitForm = function() {
            $('#internal-search-form input.hidden-parameters').val($('.search-filters .input-box,.search-filters input:radio,.search-filters select').serialize());
            $('.search-filters').closest('form').submit();
        }
        /* ----------------------------------- poll result ------------------------------------------ */

    load_poll_result = function() {
        if ($('.result-container .result').length > 0) {
            $('.result-container .result').each(function() {
                var $th = $(this);
                var percent = parseInt($th.siblings('.votes').find('.percent').html());
                $th.width(percent * ($th.closest('.result-container').width() - 170) / 100);
            });
        }
    }

    /* ---------------------------------- poll button click ------------------------------------- */
    var polls_popup = "";
    $('.sidebar-button.poll').on('click', function(e) {
        e.preventDefault();
        var polls_url = $(this).attr('href');
        var OpenInIframe = true;
        if (polls_popup.length <= 0)
            polls_popup = DT.modalPopup.createPopup(polls_url, 'polls-popup', OpenInIframe, loaderPath);
        DT.modalPopup.showPopup(polls_popup);
    });

    /* ------------------------- classified selet form ---------------------------------------- */
    $('.selectFilters .selectList-wrapper select').on('change', function() {
        var $el = $(this);
        $(this).removeClass('not_chosen').addClass('chosen').parent('.selectList-wrapper').nextAll('.selectList-wrapper').find('select').removeClass('chosen').addClass('not_chosen');
        var $parent = $el.closest('.selectList-wrapper');
        if ($parent.data('src') && $parent.data('src').length > 0 && $parent.data('target') && $parent.data('target').length > 0) {
            var $target = $($parent.data('target'), $('.selectFilters')).find('select');
            var reqPara = [];
            var arr = $parent.prevAll('.selectList-wrapper').toArray().reverse();
            arr.push($parent.get(0));
            $.each(arr, function(ind, v) {
                reqPara.push($(v).find('select').val());
            });
            reqPara = reqPara.join("|");
            $.ajax({
                url: $parent.data('src'),
                data: "levels=" + reqPara,
                type: "POST",
                success: function(data) {
                    if (typeof data === 'string')
                        var result = JSON.parse(data);
                    else
                        var result = data;
                    var temp = [];
                    clearSelectList($target);
                    $target.closest('.selectList-wrapper').nextAll('.selectList-wrapper').find('select').each(function() {
                        clearSelectList($(this));
                    });

                    if (result.toString().trim().length > 0) {
                        $.each(result, function(ind, val) {
                            temp = val.split("|");
                            if (temp[0].toString().trim().length > 0 && temp[1].toString().trim().length > 0) {
                                var opt = $("<option/>").attr('value', temp[1]).text(temp[0]);
                                $target.append(opt);
                            }
                        });

                        if ($target.find('option').filter(function() {

                                return !$(this).prop('disabled');
                            }).length > 0) {

                            $target.attr('disabled', false).closest('.selectList-wrapper').addClass('vis');
                        }
                    }
                }
            });
        }
    });

    function clearSelectList($selectList) {
        if ($selectList.find('option[disabled]').length > 0) {
            $selectList.find('option[disabled]').nextAll().remove();
            $selectList.prop('selectedIndex', 0);
        } else {
            $selectList.html("");
        }
        $selectList.attr('disabled', true).closest('.selectList-wrapper').removeClass('vis');
    }

    $('#classified-form,#eventsFilter').on('reset', function() {
        $(this).find('.selectList').removeClass('chosen').addClass('not_chosen').prop('selectedIndex', 0);
        $(this).get(0).reset();
        if ($('.date-picker > input').length > 0) {
            $('.date-picker > input', $(this)).each(function() {

                $(this).datepicker('update', '');
            });
        }
        $(this).submit();
    });
    /* -------------------------- related services button click --------------------------- */
    $('.header-bar .related-button:not(.favourite,.select-user-agent)').on('click', function() {
        var con = $(this).data('link');
        var $con = $(con);
        var $th = $(this);
        if ($th.hasClass('slideDown')) {
            $con.slideToggle(function() {
                $th.removeClass('slideDown').siblings().removeClass('slideDown');
            }).siblings('.accordion-wrapper').hide();
        } else {
            $th.addClass('slideDown').siblings().removeClass('slideDown');
            $con.slideToggle().siblings('.accordion-wrapper').hide();
        }
    });
    $('.warning-close-btn').on('click', function() {
        $(this).closest('.warning-box-wrapper').slideUp();
    })
});
/* --------------------- document.ready end  --------------------------------- */
/* --------------------------------------  read json for load more timeline button  --------------------------------- */

var json_read = false;
var milestones = [];
var steps = 1;
var next_ele_to_fetch = 0;
var $timelineContainer = $('.timeline-container');
/* -------------------------------------- load elements on window load ----------------------------------------------- */
$(window).on('load', function() {
    if ($timelineContainer.length > 0 && !$timelineContainer.hasClass('has-no-more-children')) {
        $timelineContainer.addClass('loader-img');
        var $timelineJsonURL = "../Res/js/timeline.json";
        if (typeof $timelineJson !== 'undefined')
            $timelineJsonURL = $timelineJson;
        $.getJSON($timelineJsonURL).done(function(data) {
            milestones = data.milestones;
            json_read = true;
            add_milestone(milestones, next_ele_to_fetch, 4);
            $timelineContainer.removeClass('loader-img not-loaded');
            next_ele_to_fetch += 4;
        }).fail(function() {
            $('.timeline-container').addClass('noJSONfound');
        });
    }
    $('.load-more').on('click', function(e) {
        e.preventDefault();
        $timelineContainer.addClass('loader-img');
        add_milestone(milestones, next_ele_to_fetch, steps);
        $timelineContainer.removeClass('loader-img');
        next_ele_to_fetch += steps;
    });
});
/* -------------------------------------- end ------------------------------------- */

var add_milestone = function(milestones, start_index, step) {
    for (var $i = start_index; $i < milestones.length && $i < start_index + step; $i++) {
        var wrapperAlignment = $('.milestone-wrapper', '.timeline-container').length % 2 == 0 ? 'align-left' : 'align-right';
        var $milestonewrapper = $('<div class="milestone-wrapper"><div class="milestone">').addClass(wrapperAlignment);
        var $milestone = $milestonewrapper.find('.milestone');
        var $timelineTitle = $('<h3 class="timeline-title text-center"><span>');

        if ('year' in milestones[$i]) {
            $timelineTitle.find('>span').html(milestones[$i].year);
            var $title = '<h6 class="head">' + milestones[$i].year + '</h6>';
            $milestone.html($title);
        }

        if ('list' in milestones[$i]) {
            var $ul = $('<ul class="timeline-list">');
            for (var $listItem = 0; $listItem < milestones[$i].list.length; $listItem++) {
                var $li = $('<li>');
                $li.html(milestones[$i].list[$listItem]);
                $ul.append($li);
            }
            $milestone.append($ul);
        }
        if ('logoName' in milestones[$i]) {
            var $figure = $('<figure class="timeline-logos"><img class="img-responsive" src="">');
            $figure.find('img').attr('src', '../Res/images/dubai-trade-evolution/' + milestones[$i].logoName);
            $milestone.append($figure);
        }

        $timelineTitle.insertBefore(".load-more");
        $milestonewrapper.insertBefore(".load-more");

        if ($i == milestones.length - 1)
            $timelineContainer.addClass('has-no-more-children');
    }
}



var timer;
$(window).on('resize', function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
        reloadsliders();
    }, 250);
});

function reloadsliders() {
    if ($('.thumbnail-slider').length > 0) {
        bx_news_detail.reloadSlider();
        pager_news_detail.reloadSlider();
    } else if (bx_training.length > 1) {
        if (bx_training.length > 0) {
            $.each(bx_training, function(index, value) {
                value.reloadSlider();
            });
        }
    }
}
/* ----------------------------------- faq page left menu ------------------------------------ */
$(document).ready(function() {
    if ($('body').hasClass('training')) {
        var id = $('.selectList-wrapper.category-Wrapper select').val();
        var $el = $('ul#' + id);
        $el.show().siblings('ul').hide();
        $('.selectList-wrapper.category-Wrapper select').on('change', function() {
            var id = $(this).val();
            var $el = $('ul#' + id);
            $el.show().siblings('ul').hide();
        });
    }
    if ($('.left-panel').length > 0) {

        $('.left-panel li a').on('click', function(e) {
            e.preventDefault();
            var $index = $(this).parent().index();
            $(this).parent().addClass('active').siblings('li').removeClass('active');
            $('.right-panel').find('>section').eq($index).addClass('show').siblings('section').removeClass('show');
        });

        var queryString = getParameterByName('faq_section');
        if (queryString)
            var formatedQueryString = queryString.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '');
        var activeSection = 'li.' + formatedQueryString;

        var $ind = $('.left-panel').find(activeSection).length > 0 ? $('.left-panel').find(activeSection).index() : 0;
        var $ele = $('.left-panel').find('li').eq($ind);
        $ele.addClass('active').siblings().removeClass('active');
        $ele.find('>a').trigger('click');

    }
    /* activ links for RHS and top nav */
    /*
    bodyclass = $("body").attr("class").split(" ");
    if ($(".nav-sidebar ul li").length > 0) {

        $(".nav-sidebar ul li").each(function(index, bval) {

            if ($(this).attr("data-pagename") == bodyclass[0]) {

                $(this).addClass("active");
            }
        });
    }
    $(".top-nav >li").each(function(item, valu) {

        if ($(this).attr("data-pagename") != "" && $(this).attr("data-pagename") == bodyclass[1]) {
            $(this).addClass("active");
        }
    });


*/
    /* -------------------------------- eservice page accordian ----------------------------- */
    $(document).on('click', '.accordian-head', function() {
        $(this).toggleClass('slideDown').siblings('.accordian-head').removeClass('slideDown');
        $(this).next('.accordian-content').slideToggle('slow', 'linear').siblings('.accordian-content').slideUp('slow', 'linear');
    });

    $('.accordian-head.slideDown').each(function() {
        var $th = $(this);
        $(this).next('.accordian-content').slideToggle('slow', 'linear').siblings('.accordian-content').slideUp('slow', 'linear');
    });

    /* -------------------------------- date picker --------------------------------------------- */
    $('.date-picker .input-group-addon').on('click', function() {
        $(this).closest('.date-picker').find('input').datepicker('show');
        var currentTime = new Date();
        //  $(this).siblings('input').datepicker('setDate', new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, currentTime.getDate()));
    });

    $('.date-picker > input').each(function() {
        $(this).datepicker({
            rtl: false,
            format: 'dd/mm/yyyy',
            todayHighlight: true,
            endDate: '+0d',
            autoclose: true
        });

    });

    $('.datetimepicker').each(function() {
        $(this).datetimepicker({
            keepOpen: true,
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-desktop',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        });
        $(this).find('input').on("focus", function() {
            console.log($(this).closest('.datetimepicker').data("DateTimePicker").show());
        });
    });
    $('.datetimepicker').on("dp.show", function() {
        console.log($('.datetimepicker').find('.bootstrap-datetimepicker-widget'));
    });

    $('.timepicker').each(function() {
        $(this).datetimepicker({
            keepOpen: true,
            format: 'LT',
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-desktop',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        });
        $(this).find('input').on("focus", function() {
            console.log($(this).closest('.timepicker').data("DateTimePicker").show());
        });
    });


    /* -------------------------------- selectlist not_chosen styling --------------------------- */
    $(document).on('change', '.selectList-wrapper .selectList.not_chosen', function() {
        console.log('select');
        $(this).removeClass('not_chosen');
    });

    /* ----------------------------------- sorting filters --------------------------------------- */

    $('.sorting-filter-wrapper').on('reset', function() {
        $(this).find('.selectList').addClass('not_chosen').removeClass('chosen');
    });


    /* ---------------------------------- back button click ------------------------------------- */

    $('.back-btn.red-text').on('click', function(e) {
        e.preventDefault();
        history.back();
    });
});


/* search button */


$('.dashboard-bar-eservice .dashboard-search-button').on('click', function(e) {
    $(this).closest('.searchBox-container').toggleClass('active');
    $(this).siblings('.inputWrapper').find('input').focus();
});



$('.dashboard-bar-eservice .searchBox-container input').on('input', function(e) {

    var that = $(this);
    var $suggestionWrapper = that.siblings('.suggestionWrapper');
    var search_keyword = that.val();
    if (search_keyword.length >= 3) {
        $.ajax({
            url: '/en/searchService.html?serachKey=' + search_keyword + '&page=service'
                // url: '../Res/js/suggestions.json'
        }).done(function(data) {
            if (data.length == 0) {
                $suggestionWrapper.html('<ul><li><span class="no-result-msg">No Result Found</span></li></ul>');
                return;
            }
            $suggestionWrapper.html('');
            var $list = $("<ul />");
            $.each(data, function(index, operation) {

                var $li = $('<li />');

                var $suggestion = $('<a class="suggestion service" />').attr('href', '/en/' + operation.url).html("<span>" + operation.serviceName + "</span>");

                if (operation.serviceOperations.length > 0) {

                    var $ul = $("<ul class='operationsList' />");
                    $.each(operation.serviceOperations, function(ind, service) {
                        if (service.name != null && service.name.length != 0) {
                            var $innerLi = $('<li />');
                            var $innerSuggestion = $('<a class="suggestion operation" />').attr('href', '/en/' + service.url).html("<span>" + service.name + "</span>");
                            $innerLi.append($innerSuggestion);
                            $ul.append($innerLi);
                        }
                    });
                    if ($ul.find('li').length > 0)
                        $li.append($ul).addClass('hasOperations');
                }
                $li.prepend($suggestion);
                $list.append($li);

            });
            $suggestionWrapper.append($list);
        });
    } else {
        $suggestionWrapper.html('');
    }
});


$(document).on('mouseenter', '.dashboard-bar-eservice .suggestionWrapper  li.hasOperations', function() {
    $(this).addClass('opened').find('.operationsList').slideDown();
    $(this).siblings('.hasOperations').removeClass('opened').find('.operationsList').hide();

});

$(document).on('mouseleave', '.dashboard-bar-eservice .suggestionWrapper', hideOperations);

function hideOperations() {

    $(this).find('.hasOperations').removeClass('opened').find('.operationsList').hide();
}




$(window).on('load resize', function() {
    if ($(".hamburger-menu").length > 0)
        $(".hamburger-menu").css('padding-top', $(".mobile-menu").offset().top - 7 + 'px');
    $ScreenWidth = $(window).width();
    load_poll_result();

    if ($('.gallery-popup').length > 0 && $('.gallery-popup').hasClass('active')) {
        $('.gallery-popup').height($(window).height()).css({
            top: $(window).scrollTop()
        });
    }
    /* ----------------------------------- fix footer at bottom ------------------------------- */
    $('body > .wrapper').css('padding-bottom', $('body > .wrapper').find('.footer').outerHeight(true) + 'px');
});

$(window).on('scroll', function() {
    if ($(window).scrollTop() > $(window).height() / 2) {
        $('.move-top').addClass('active');
    } else {
        $('.move-top').removeClass('active');
    }
});

var DT = DT || {};

DT.screen = {
    getWidth: function() {
        return $(window).width();
    },
    getHeight: function() {
        return $(window).height();
    },
    isMobile: function() {
        return this.getWidth() <= 767;
    },
    isTablet: function() {
        return $this.getWidth() > 767 && this.getWidth() <= 1023;
    },
    isDesktop: function() {
        return $this.getWidth() > 1023;
    }
}

DT.modalPopup = (function() {
    var $pop = "";
    var init = function(pop_id) {
        $pop = $('<div class="full-screen-popup"><div class="full-screen-popup-content"><a class="close-button" href="javascript:void(0)"></a></div></div>').addClass(pop_id);

        $pop.on('click', '.close-button', function() {
            hidePopup($(this).closest('.full-screen-popup'));
            if ($(this).closest('.full-screen-popup').find('form').length > 0)
                $(this).closest('.full-screen-popup').find('form')[0].reset();
        });
    };
    var $getPopContent = function(cont_template, popup_id, OpenInIframe) {
        if (OpenInIframe)
            var ifr = $('<iframe width="100%" scrolling="no"/>').attr("src", cont_template).attr('id', popup_id + '-iframe');
        else
            ifr = cont_template;
        return ifr;
    };

    var createPopup = function(cont_template, popup_id, OpenInIframe, loaderPath) {

        if ($('body').children('.' + popup_id).length <= 0) {
            init(popup_id);
        }
        var $popContent = $pop.find('.full-screen-popup-content');
        if (OpenInIframe) {
            loaderPath = loaderPath || "../Res/images/icons/ajax-loader2.gif";
            var loaderImg = $('<img class="loader"/>').attr("src", loaderPath);
            $popContent.prepend(loaderImg);
        }
        $('body').append($pop);

        var $html = $getPopContent(cont_template, popup_id, OpenInIframe);
        $popContent.append($html);
        $('body').children('.' + popup_id).append($popContent);
        if (popup_id == 'polls-popup')
            checkDOMChange(popup_id);

        // showPopup($('body').children('.' + popup_id));
        return $('body').children('.' + popup_id);
    };
    var showPopup = function(popup) {
        $('html').addClass('popup-open');
        popup.show();
    };
    var hidePopup = function(popup) {
        $('html').removeClass('popup-open');
        popup.hide();
    };
    var getPopupInstance = function(popupId) {
        return $('body').children('.' + popupId);
    }
    var checkDOMChange = function(popup_id) {
        $('#' + popup_id + '-iframe').load(function() {
            $('body').children('.' + popup_id).find('.popup.loader').hide();
            $('body').children('.' + popup_id).find('.close-button').show();
            $('iframe ').iFrameResize({
                log: true,
                autoResize: true,
                sizeWidth: true
            });
        });
    }


    return {
        createPopup: createPopup,
        showPopup: showPopup,
        hidePopup: hidePopup,
        getPopupInstance: getPopupInstance
    }
})();


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function iframeResizer() {
    $('iframe').iFrameResize({
        log: true,
        autoResize: true
    });
}