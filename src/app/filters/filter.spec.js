(function() {
    'use strict';

    describe('filter formatString', function() {
        var $filter;
        beforeEach(module('dtFrameWork'));
        beforeEach(inject(function($injector) {
            $filter = $injector.get('$filter');
        }));

        it('should replace spaces with hyphens', function() {
            expect($filter('formatString')('Hello World')).toBe('Hello-World');
            expect($filter('formatString')('Hello World 2')).toBe('Hello-World-2');
            expect($filter('formatString')('HelloWorld 2')).toBe('HelloWorld-2');
            expect($filter('formatString')('HelloWorld')).toBe('HelloWorld');
        });
    });
})();