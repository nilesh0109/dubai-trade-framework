(function() {
    'use strict'

    describe('controller populateData', function() {
        var vm, $filter, $window;
        beforeEach(module('dtFrameWork'));

        beforeEach(inject(function($injector) {
            var $controller = $injector.get('$controller');
            var $rootScope = $injector.get('$rootScope');
            var $q = $injector.get('$q');
            var deferred = $q.defer();
            var $httpService = $injector.get('$httpService');

            spyOn($httpService, 'getData').and.callFake(function() {
                return deferred.promise;
            });
            $filter = $injector.get('$filter');
            $window = $injector.get('$window');

            spyOn($window.location, 'reload').and.callFake(function() {
                IntializeController();
            });;
            IntializeController();

            function IntializeController() {
                vm = $controller("PopulateDataController");

                deferred.resolve({
                    'data': [{
                        "category": "Introduction",
                        "title": "Introduction",
                        "desc": "",
                        "htmlFile": "app/code_snippets/introduction.html",
                        "target": "introduction"
                    }, {
                        "category": "Getting Started",
                        "title": "Getting Started",
                        "desc": "",
                        "htmlFile": "app/code_snippets/getting-started.html",
                        "target": "getting-started"
                    }, {
                        "category": "Buttons",
                        "children": [{
                            "title": "Red Button",
                            "desc": "styling for Red Button",
                            "code": "app/code_snippets/buttons/red-btn.html",
                            "target": "red-btn"
                        }, {
                            "title": "back Button",
                            "desc": "styling for back Button",
                            "code": "app/code_snippets/buttons/back-btn.html",
                            "target": "back-btn"
                        }]
                    }]
                });
                $rootScope.$apply();
            }

        }));

        it('should have initial items array with length 2', function() {
            expect(vm.items.length).toBe(3);
        });

        it('should search efficiently', function() {
            vm.searchString = 'back Button';
            vm.search();
            expect(vm.activeSectionIndex).toBe(2);
            expect(vm.activeSubSectionIndex).toBe(1);

            vm.searchString = 'Getting Started';
            vm.search();
            expect(vm.activeSectionIndex).toBe(1);
            expect(vm.activeSubSectionIndex).toBe(0);

            vm.searchString = 'Buttons';
            vm.search();
            expect(vm.activeSectionIndex).toBe(2);
            expect(vm.activeSubSectionIndex).toBe(0);
        });

        it('should take to the section and subsection supplied in querystring', function() {
            $window.location.hash = '#/Buttons--back-btn';
            $window.location.reload();
            expect(vm.activeSectionIndex).toBe(2);
            expect(vm.activeSubSectionIndex).toBe(1);

            $window.location.hash = '#/Getting-Started';
            $window.location.reload();
            expect(vm.activeSectionIndex).toBe(1);
            expect(vm.activeSubSectionIndex).toBe(0);
        });
    });
})();