(function() {
    'use strict';

    angular.module('dtFrameWork')
        .service('$httpService', function($http) {
            this.getData = function(jsonURL) {
                return $http.get(jsonURL);
            }
        });
})();