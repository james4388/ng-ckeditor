'use strict';

describe('Directive: ckeditor', function () {

  // load the directive's module
  beforeEach(module('ngCkeditorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ckeditor></ckeditor>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ckeditor directive');
  }));
});
