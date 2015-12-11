'use strict';

/**
 * @ngdoc directive
 * @name ngCkeditorApp.directive:ckeditor
 * @description
 * # ckeditor
 */
angular.module('ngCkeditorApp')
  .directive('ckeditor', ['$rootScope', '$sce', 'CKE', function ($rootScope, $sce, CKE) {
    return {
      require: ['ngModel', '^?form'],
      controller: ['$scope', function($scope){

      }],
      controllerAs : 'editor',
      scope : {

      },
      bindToController: true,
      restrict: 'A',
      link: function postLink(scope, element, attrs, ctrls) {
        var ngModel = ctrls[0],
            form = ctrls[1] || null;
        var id = attrs.ckeditor || null,
            options = angular.extend(CKE.getConfig(), attrs.ckeditorOption);

        var editor = CKE.createEditor(id, element, options);
        if (!id){
          id = editor.id;
        }

        var updateView = function(evt) {
          var content = editor.getData();
          content = $sce.trustAsHtml(content);

          ngModel.$setViewValue(content);
          if (!$rootScope.$$phase) {
            scope.$apply();
          }
        };

        editor.on('instanceReady', function(){
          ngModel.$render();
          ngModel.$setPristine();
          if (form) {
            form.$setPristine();
          }
        });

        var undoCheckTM = null;
        editor.on('afterUndoImage', function(){
          clearTimeout(undoCheckTM);
          undoCheckTM = setTimeout(updateView, 100);
        });

        editor.on('change', updateView);

        ngModel.$formatters.unshift(function(modelValue) {
          return modelValue ? $sce.trustAsHtml(modelValue) : '';
        });

        ngModel.$parsers.unshift(function(viewValue) {
          return viewValue ? $sce.getTrustedHtml(viewValue) : '';
        });

        ngModel.$render = function() {
          var viewValue = ngModel.$viewValue ?
            $sce.getTrustedHtml(ngModel.$viewValue) : '';
            editor.setData(viewValue);
        };

        scope.$on('$destroy', function(){
          editor.removeAllListeners();
          CKE.destroy(id);
        });
      }
    };
  }]);
