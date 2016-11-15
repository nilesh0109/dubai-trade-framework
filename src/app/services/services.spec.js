(function() {
    'use strict';

    describe('Service $httpService', function() {
        var $httpService, $httpBackend;
        beforeEach(module('dtFrameWork'));
        /*      beforeEach(function() {
                  module(function($provide) {
                      $provide.service('$http', function() {
                          this.alert = jasmine.createSpy('alert');
                      });
                  });
              });  */


        beforeEach(inject(function($injector) {
            var $q = $injector.get('$q');
            var deferred = $q.defer();
            $httpBackend = $injector.get('$httpBackend');
            $httpService = $injector.get('$httpService');
            $httpBackend.when('GET', "/").respond(deferred.promise);
        }));

        it('should have a getData method', function() {
            expect($httpService.getData).toBeDefined();
        });
        it('should have return a promise', function() {
            expect($httpService.getData().success).not.toBe(null);
            expect($httpService.getData().error).not.toBe(null);
        });
    });
})();