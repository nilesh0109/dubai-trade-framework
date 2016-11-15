(function() {
    'use strict';

    angular.module('dtFrameWork')
        .directive('formatHtml', function($httpService) {
            return {
                scope: {
                    codeFileLink: "@"
                },
                template: "<pre>{{code}}</pre>",
                controller: function() {

                },

                link: function($scope) {
                    $httpService.getData($scope.codeFileLink).then(function(data) {
                        $scope.code = data.data;
                    });

                }
            }
        });
})();