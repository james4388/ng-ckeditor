'use strict';

/**
 * @ngdoc function
 * @name ngCkeditorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngCkeditorApp
 */
angular.module('ngCkeditorApp')
  .controller('MainCtrl', ['CKE', function (CKE) {
    this.text = '<b>Welcome</b> James';

    this.testClick = function(){
      var editor = CKE.getEditor('txtBody');
      editor.setData('<h1>Hallo</h1>');
    };

  }]);
