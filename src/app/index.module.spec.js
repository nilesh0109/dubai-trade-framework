(function() {
    'use strict';
    describe('module dtFrameWork', function() {

        it('should exit', function() {
            var mod = module('dtFrameWork');
            expect(mod).not.toEqual(null);
        });
    });
})();