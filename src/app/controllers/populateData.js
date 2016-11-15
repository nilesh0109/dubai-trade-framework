(function() {
    'use strict';

    angular.module('dtFrameWork')
        .controller('PopulateDataController', populateData);

    function populateData($httpService, $timeout, $filter, $window) {
        var hash = $window.location.hash.substr(2);
        var section = hash ? hash.split('--') : '';
        var vm = this;
        var autoComepleteArray = [];
        vm.searchString = "";
        vm.noElementFound = '';
        vm.activeSectionIndex = 0;
        vm.activeSubSectionIndex = 0;
        vm.items = [];
        vm.autoCompleteOptions = {
            "options": {
                "source": autoComepleteArray,
                "minLength": 0
            }
        }
        $.ui.autocomplete.prototype._renderItemData = function(ul, item) {
            return this._renderItem(ul, item).data("ui-autocomplete-item", item);
        }
        $.ui.autocomplete.prototype._renderItem = function(ul, item) {
            var re = new RegExp('(' + this.term + ')', 'i');
            var t = item.label.replace(re, replaceFn);
            return angular.element("<li></li>")
                .data("item.autocomplete", item)
                .append("<a>" + t + "</a>")
                .appendTo(ul);
        };


        function replaceFn(match, grp) {
            return "<span style='font-weight:bold;background:yellow;color:blue;'>" + grp + "</span>";
        }

        $httpService.getData('app/content.json').then(function(data) {
            vm.items = data.data;
            vm.items = angular.forEach(vm.items, function(el, index) {
                if ($filter('formatString')(el.category) == section[0]) {
                    vm.activeSectionIndex = index;
                    vm.activeSubSectionIndex = 0;
                    angular.forEach(el.children, function(subele, index) {
                        if (subele.target == section[1])
                            vm.activeSubSectionIndex = index;
                    });
                }
            });
            vm.slideToEle();
            vm.items.forEach(function(val) {
                autoComepleteArray.push(val.category);
                if (val.children && val.children.length > 1) {
                    val.children.forEach(function(val) {
                        autoComepleteArray.push(val.title);
                    });
                }
            });
        });
        $timeout(function() {
            $.getScript('Res/js/global.js');
        }, 1000);

        vm.search = function() {
            vm.noElementFound = '';
            if (autoComepleteArray.indexOf(vm.searchString) >= 0) {
                angular.forEach(vm.items, function(item, ind) {

                    if (item.category == vm.searchString) {
                        vm.activeSectionIndex = ind;
                        vm.activeSubSectionIndex = 0;
                    }
                    if (item.children)
                        angular.forEach(item.children, function(subitem, index) {
                            if (subitem.title == vm.searchString) {
                                vm.activeSectionIndex = ind;
                                vm.activeSubSectionIndex = index;
                            }
                        });
                });
                vm.slideToEle();
            } else {
                vm.noElementFound = 'No Result Found';
            }
            return false;
        }

        vm.slideToEle = function() {
            $timeout(function() {
                if (angular.element('.section .slide-to').length > 0)
                    angular.element('html,body').animate({
                        scrollTop: angular.element('.section .slide-to').offset().top
                    }, 300);
                else
                    angular.element('html,body').animate({
                        scrollTop: 0
                    }, 300);
            }, 0);
        }
    }
})();