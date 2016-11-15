'use strict';

describe('The styleGuide', function() {
    var page;
    var activeSubSection = element(by.model('vm.activeSubSectionIndex'));
    var activeSection = element(by.model('vm.activeSectionIndex'));
    var items = element.all(by.repeater('account in vm.items'));
    beforeEach(function() {
        //  browser.get('/#/');
        //  page = require('./main.po');
    });

    it('should not have any elements on load', function() {
        expect(items.length).toBe(0);
        expect(activeSection).toBe(0);
        expect(activeSubSection).toBe(0);
    });
});