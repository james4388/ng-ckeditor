'use strict';

describe('Service: CKE', function () {

  // instantiate service
  var CKE,
    init = function () {
      inject(function (_CKE_) {
        CKE = _CKE_;
      });
    };

  // load the service's module
  beforeEach(module('ngCkeditorApp'));

  it('should do something', function () {
    init();

    expect(!!CKE).toBe(true);
  });

  it('should be configurable', function () {
    module(function (CKEProvider) {
      CKEProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(CKE.greet()).toEqual('Lorem ipsum');
  });

});
