(function() {
    'use strict';

    describe('directive formatHtml', function() {
        var compile, scope, directiveElem, $httpService;

        beforeEach(module('dtFrameWork'));

        beforeEach(inject(function($injector) {
            var $q = $injector.get('$q');
            var deferred = $q.defer();

            $httpService = $injector.get('$httpService');
            spyOn($httpService, 'getData').and.callFake(function() {
                return deferred.promise;
            });
            deferred.resolve({
                'data': '<a href="javascript:void(0)" class="back-btn">back</a>'
            });
        }));

        beforeEach(function() {
            inject(function($compile, $rootScope) {
                compile = $compile;
                scope = $rootScope.$new();
            });
            directiveElem = getCompiledElement();
        });

        function getCompiledElement() {
            var compiledDirective = compile(angular.element('<div format-html code-file-link="http://localhost:82/back-btn.html"></div>'))(scope);
            scope.$digest();
            return compiledDirective;
        }
        it('should return data with an anchor tag', function() {
            expect(directiveElem.isolateScope().code).toBe('<a href="javascript:void(0)" class="back-btn">back</a>');
        });
        it('should return a pre tag with the html code inside', function() {
            expect(directiveElem.find('pre')).toBeDefined();
        });
        it('should return data with an anchor tag', function() {
            expect(directiveElem.isolateScope().code).toBe('<a href="javascript:void(0)" class="back-btn">back</a>');
        });
    });
})();