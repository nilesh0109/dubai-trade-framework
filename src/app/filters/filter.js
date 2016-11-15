(function() {
    'use strict';

    angular.module('dtFrameWork')
        .filter('formatString', function() {
            return function(str) {
                return str.replace(/\s/g, '-');
            }
        });
    /*  angular.module('dtFrameWork')
          .filter('formatHTML', function() {
              return function(str) {
                  return str.replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
              }
          });
      angular.module('dtFrameWork')
          .filter('formatString', function() {
              return function(str) {
                  return str.replace(/&lt;/gm, '<').replace(/&gt;/gm, '>');
              }
          });
    */

})();