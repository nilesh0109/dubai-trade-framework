    $(document).on('click', '.content .top-bar .tabs', function() {
        var $that = $(this);
        if ($(this).find('.menu-overlay').length <= 0) {
            $('body').addClass('show-overlay');
            var jqxhr = $.ajax(JsonUrl).done(function(data) {
                var response = data;
                for ($i = 0; $i < response.length; $i++) {
                    var $json = response[$i];
                    var $tabcontainer = $('.content .top-bar .tabs[data-category="' + response[$i].name + '"]');

                    if ($json.children.length > 0) {
                        var $container = $("<div class='menu-overlay text-left Level1'><div class='visible-xs overlay-header'><a href='javacsript:void(0)' class='close-button'></a><a href='javacsript:void(0)' class='back-button'></a></div></div>");
                        var $multilevelList = $('<ul class="multilevel-list" />').addClass($json.level);
                        createList($json, $multilevelList);
                        $container.append($multilevelList);
                    }
                    $tabcontainer.append($container);
                }
                showtabs.call($that);
            }).fail(function(data) {
                $('body').removeClass('show-overlay');

            }).always(function(data) {
                console.log("always");
            });
        } else {
            showtabs.call($that);
        }
    });


    var createList = function($json, $multilevelList) {

        for (var j = 0; j < $json.children.length; j++) {
            var $anchor = $('<a href="javascript:void(0)" />').html($json.children[j].englishName);
            var $li = $("<li />").append($anchor);
            resetTrackNodeFlag();
            if (!trackNode($json.children[j]))
                continue;
            var $sublist;

            if ($json.children[j].services && $json.children[j].services.length > 0) {
                $sublist = $('<ul class="multilevel-list sublist" />').addClass($json.children[j].level);
                for (var k = 0; k < $json.children[j].services.length; k++) {
                    var lang = $('body').hasClass('ar') ? 'ar' : 'en';
                    var $service_anchor = $('<a href="/' + lang + '/' + $json.children[j].services[k].pageURL + '.html" />').html($json.children[j].services[k].name);
                    var $service_li = $("<li />").append($service_anchor);
                    $sublist.append($service_li);
                }
                $li.append($sublist).addClass('has-children');
            }

            if ($json.children[j].children.length > 0) {

                if ($li.find('>.multilevel-list').length <= 0) {
                    $sublist = $('<ul class="multilevel-list sublist" />').addClass($json.children[j].level);
                }
                createList($json.children[j], $sublist);
                $li.append($sublist).addClass('has-children');
            }
            $multilevelList.append($li);
        }
    }
    var trackNodeFlag;
    var resetTrackNodeFlag = function() {
        trackNodeFlag = false;
    }
    var trackNode = function($list) {
        if (!trackNodeFlag) {
            if ($list.services && $list.services.length > 0) {
                return true;
            } else if ($list.children.length > 0) {
                for (var j = 0; j < $list.children.length; j++) {
                    if ($list.children[j].services && $list.children[j].services.length > 0) {
                        return true;
                    } else if ($list.children[j].children.length > 0) {
                        trackNodeFlag = trackNode($list.children[j]) || trackNodeFlag;
                    }
                }
            }
        }
        return trackNodeFlag;
    }

    function showtabs() {

        $('body').removeClass('show-overlay').addClass('overlay-open');
        $(this).siblings().find('.menu-overlay').hide().find('.active').removeClass('active');
        $(this).find('.menu-overlay .active').removeClass('active');
        $(this).addClass('active').siblings().removeClass('active');
        $(this).find('.menu-overlay').removeClass().addClass('menu-overlay Level1').show();
        if ($(this).find('.menu-overlay li').length <= 0) {
            $(this).find('.menu-overlay').addClass('empty');
        } else {
            $(this).find('.menu-overlay').removeClass('empty');
        }
        avoidPageBreak();
        /*   var width;
        var tabHeights = $('.tabs').map(function() {
            return $(this).height();
        }).get();
        var marginTop = Math.max.apply(null, tabHeights);

        $(this).addClass('active').siblings('.tabs').removeClass('active');
        if (DT.screen.isMobile()) {
            width = $(window).width();
        } else {
            width = $(window).width() / 4;
        }
        $(this).siblings().find('.menu-overlay').hide();
        $('body').removeClass('show-overlay').addClass('overlay-open');
        if ($('body').hasClass('ar')) {
            $(this).find('.menu-overlay').removeClass().addClass('menu-overlay text-left Level1 item-99999').width(width).css({
                'right': '0px',
                'margin-top': marginTop + 'px'
            }).show().find('ul.multilevel-list').width(width);
        } else {
            $(this).find('.menu-overlay').removeClass().addClass('menu-overlay text-left Level1 item-99999').width(width).css({
                'left': '0px',
                'margin-top': marginTop + 'px'
            }).show().find('ul.multilevel-list').width(width);;
        }
   */
    }




    /*------------------------------------------------- menu overlay ---------------------------------------------------*/
    /*  $(document).on({
        click: function(e) {
            e.stopPropagation();

            if ($(this).find('>ul').length > 0) {
                var $menuOverlay = $(this).closest('.menu-overlay');
                var newLevel = getFilteredClassName($(this).find('>ul.multilevel-list'), 'Level');
                var currentLevel = getFilteredClassName($menuOverlay, 'Level');
                var CurrentItemNo = getFilteredClassName($menuOverlay, 'item-');
                var newItemNo = 'item-' + $(this).index();
                var windowWidth = $(window).width();
                console.log(currentLevel + '  ' + newLevel);
                console.log(CurrentItemNo + '  ' + newItemNo);
                if (currentLevel != newLevel || CurrentItemNo != newItemNo) {
                    $menuOverlay.removeClass(currentLevel + ' ' + CurrentItemNo).addClass(newLevel + ' ' + newItemNo);
                    $(this).find('>ul.multilevel-list').addClass('active');
                    $(this).siblings().find('ul.multilevel-list').removeClass('active');

                    if (!DT.screen.isMobile()) {
                        var $listWidth = $(this).find('>ul.multilevel-list').width();
                        var newLevelNumber = parseInt(newLevel.replace('Level', ''));
                        console.log(newLevelNumber);
                        $menuOverlay.width($listWidth * newLevelNumber);
                        if (!$('body').hasClass('ar')) {
                            var currentLeft = $menuOverlay.css('left');
                            var newLeft = 0;
                            console.log($menuOverlay.offset().left + $menuOverlay.width() <= windowWidth);
                            if ($menuOverlay.offset().left + $menuOverlay.width() <= windowWidth) {
                                newLeft = parseInt(currentLeft);
                            } else {
                                newLeft = parseInt(currentLeft) - Math.min($menuOverlay.offset().left, $listWidth);
                            }

                            $menuOverlay.css('left', newLeft + 'px');
                        } else {
                            var currentRight = $menuOverlay.css('right');
                            var rightOffset = $menuOverlay.offset().left + $menuOverlay.width();
                            var newRight = 0;
                            console.log("$menuOverlay.offset().left " + $menuOverlay.offset().left);
                            if ($menuOverlay.offset().left >= 0) {
                                newRight = parseInt(currentRight);
                            } else {
                                newRight = parseInt(currentRight) - Math.min(windowWidth - rightOffset, $listWidth);
                            }

                            $menuOverlay.css('right', newRight + 'px');
                        }
                    }
                }
            }
        },
    }, '.menu-overlay li');
*/

    function avoidPageBreak() {
        $('.menu-overlay').find('li').each(function(i) {
            var $th = $(this);

            if ($th.height() <= 150) {
                $th.addClass('avoid-page-break');
            } else {
                $th.removeClass('avoid-page-break');
            }
        });
    }
    $(document).on({
        click: function(e) {
            e.stopPropagation();
            if ($(this).find('>ul').length > 0) {
                var $th = $(this);
                var $menuOverlay = $th.closest('.menu-overlay');
                var newLevel = getFilteredClassName($th.closest('ul.multilevel-list'), 'Level');
                if (!DT.screen.isMobile()) {
                    if (newLevel.match(/\d+/)[0] % 2 == 1) {
                        return false;
                    }
                    if ($th.hasClass('active')) {
                        newLevel = 'Level' + (newLevel.match(/\d+/)[0] - 1);

                        var prevlevel = newLevel.match(/\d+/)[0] - 1;
                        if ($('body').hasClass('ar')) {
                            var translateBy = (prevlevel) / 2 * 100;
                        } else {
                            var translateBy = (-1) * (prevlevel) / 2 * 100;
                        }
                        $menuOverlay.find('>.multilevel-list').css({
                            transform: 'translateX(' + translateBy + '%)'
                        });
                        setTimeout(function() {
                            requestAnimFrame(function() {
                                $menuOverlay.removeClass('translateLeft');
                                $menuOverlay.find('>.multilevel-list').removeAttr('style');
                                $th.removeClass('active').find('.active').removeClass('active');
                                $th.closest('li.active').removeClass('active');
                                $menuOverlay.removeClassStartsWith('Level').addClass(newLevel);
                                avoidPageBreak();
                            });

                        }, 400);
                    } else {
                        newLevel = getFilteredClassName($th.find('>ul.multilevel-list'), 'Level');
                        //  $menuOverlay.addClass('translateLeft');
                        //  setTimeout(function() {
                        //     $menuOverlay.removeClass('translateLeft');
                        $th.addClass('active').siblings().removeClass('active');
                        $th.parentsUntil($menuOverlay, 'li').addClass('active');
                        $menuOverlay.removeClassStartsWith('Level').addClass(newLevel);
                        avoidPageBreak();
                        //   }, 400);
                    }

                } else {
                    newLevel = getFilteredClassName($th.find('>ul.multilevel-list'), 'Level');
                    $menuOverlay.removeClassStartsWith('Level').addClass(newLevel);
                    $th.addClass('active').siblings().removeClass('active');
                }
            }
        }
    }, '.menu-overlay li');

    /*   
    $(document).on({
        mouseleave: function() {

            $(this).hide().find('.multilevel-list').removeClass('active');
            $('body').removeClass('overlay-open');
            $('.dashboard-bar .tabs').removeClass('active');
        }
    }, '.menu-overlay');

*/
    $(document).on('click', ':not(.tabs)', function(e) {
        if ($(e.target).closest('.tabs').length <= 0) {
            $('.menu-overlay').hide().find('.active').removeClass('active');
            $('body').removeClass('overlay-open');
            $('.dashboard-bar .tabs').removeClass('active');
        }
    });

    var getFilteredClassName = function(ele, filter) {
        var classNames = ele.attr('class').split(" ");
        var listLevel = 0;
        for (var i in classNames) {
            if (classNames[i].indexOf(filter) == 0) {
                listLevel = classNames[i];
                break;
            }
        }
        return listLevel;
    }

    $('.tabs').on('click', '.overlay-header .close-button', function(e) {

        e.stopPropagation();
        e.preventDefault();
        $(this).closest('.menu-overlay').hide().find('.multilevel-list').removeClass('active');
        $('body').removeClass('overlay-open');
    });

    $('.tabs').on('click', '.overlay-header .back-button', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var $menuOverlay = $(this).closest('.menu-overlay');
        var currentLevel = getFilteredClassName($menuOverlay, 'Level');
        if (currentLevel != 'Level1') {
            var prevLevel = 'Level' + (currentLevel.match(/\d+/)[0] - 1);
            $menuOverlay.removeClass(currentLevel).addClass(prevLevel);
            $menuOverlay.find('.' + prevLevel).find('.active').removeClass('active');
        }

    });

    $('.dashboard-bar .searchBox-container input').on('input', function(e) {

        var that = $(this);
        var $suggestionWrapper = that.siblings('.suggestionWrapper');
        var search_keyword = that.val();
        if (search_keyword.length >= 3) {
            $.ajax({
                url: '/en/searchService.html?serachKey=' + search_keyword
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
                        $li.addClass('hasOperations');
                        var $ul = $("<ul class='operationsList' />");
                        $.each(operation.serviceOperations, function(ind, service) {
                            console.log(service);
                            var $innerLi = $('<li />');
                            var $innerSuggestion = $('<a class="suggestion operation" />').attr('href', '/en/' + service.url).html("<span>" + service.name + "</span>");
                            $innerLi.append($innerSuggestion);
                            $ul.append($innerLi);
                        });
                        $li.append($ul);
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



    $(document).on('mouseenter', '.suggestionWrapper  li.hasOperations', function() {
        $(this).addClass('opened').find('.operationsList').slideDown();
        $(this).siblings('.hasOperations').removeClass('opened').find('.operationsList').hide();

    });

    $(document).on('mouseleave', '.suggestionWrapper', hideOperations);

    function hideOperations() {

        $(this).find('.hasOperations').removeClass('opened').find('.operationsList').hide();
    }
    /* ----------------------------------- dashboard search icon  ----------------------------------- */
    $('.dashboard-bar .dashboard-search-button').on('click', function(e) {

        $(this).closest('.searchBox-container').toggleClass('active');
        $(this).siblings('.inputWrapper').find('input').focus();
    });

    $(document).on("click", "*:not(.searchBox-container,.searchBox-container *)", function(e) {

        if ($(this).closest('.searchBox-container').length <= 0 && $(".searchBox-container input:focus").length <= 0) {
            $('.searchBox-container').removeClass('active');
            $('.searchBox-container input').val('');
            $('.suggestionWrapper').html('');

        }
    });



    $(document).on('click', '.edit-button', function() {
        $(this).closest('.favorite-services').addClass('show-edit');
    });


    $(".favorite-services").on('change', 'input[type="checkbox"]', function() {
        $('.favorite-alert-box .remove-favorite-form').removeClass('removed');
        if (this.checked) {
            $('.favorite-alert-box').find('.service-name').html($(this).closest('.delete').siblings('.service-text').clone(true));
            var alertBoxPop = $('.favorite-alert-box');
            var dontOpenInIframe = false;

            console.log($('.favorite-alert-box').find('.service-name').html());
            var edit_favorites_popup = DT.modalPopup.createPopup(alertBoxPop, 'favorite-alert', dontOpenInIframe);
            DT.modalPopup.showPopup(edit_favorites_popup);
        }
    });
    $(document).on('submit', '.remove-favorite-form', function() {

        var id = $('.service-text', $(this)).data('id');
        console.log(id);
        var data = 'id=' + encodeURIComponent(id);
        $.ajax({
            url: $(".remove-favorite-form").attr("action"),
            data: data,
            type: "GET",

            success: function(response) {
                if (response == "isFavourite") {
                    $('.remove-favorite-form').addClass('not-removed');
                } else if (response == "isNotFavourite") {
                    $('.remove-favorite-form').addClass('removed');
                    console.log($('.service-text[data-id=' + id + ']').closest('li'));
                    $('.service-text[data-id=' + id + ']').closest('li').remove();
                }

            },
            error: function(xhr, status, error) {
                alert(xhr.responseText);
            }
        });
        return false;
    });

    $(document).on('reset', '.remove-favorite-form', function() {
        $(this).closest('.full-screen-popup').find('.close-button').trigger('click');
        $('.favorite-services').removeClass('show-edit').find('input[type="checkbox"]').attr('checked', false);
    });

    $(window).on('resize', function() {
        //   var listWidth = DT.screen.isMobile() ? $(window).width() : $(window).width() / 4;
        //   $('.tabs.active').find('.menu-overlay').width(listWidth).find('.multilevel-list').width(listWidth);
    });

    $(document).on('click', '.load-more-services', function() {

        $(this).parent().siblings('.services-list').addClass('loaded');
        $(this).parent().hide();
    });

    $.fn.removeClassStartsWith = function(className) {
        return $(this).removeClass(function(i, classes) {
            var removeClasses = [];
            var regex = new RegExp('(' + className + '\\S*)', 'g');
            while ((myArray = regex.exec(classes)) !== null) {
                removeClasses.push(myArray[0]);
            }
            return removeClasses.join(' ');
        });
    }

    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();