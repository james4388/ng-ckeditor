'use strict';

/**
 * @ngdoc service
 * @name ngCkeditorApp.CKE
 * @description
 * # CKE
 * Provider in the ngCkeditorApp.
 */
angular.module('ngCkeditorApp')
  .value('CKEDITOR', window.CKEDITOR)
  .provider('CKE', function CKEProvider() {

    // Private variables
    var ckeditorConfig = {
      extraPlugins : 'autogrow,uploadimage',
      height:100,   //Default height

      //Auto grow config
      autoGrow_minHeight : 100,
      autoGrow_maxHeight : 400,
      autoGrow_bottomSpace : 10,
      resize_maxHeight: 400,

      //Upload Image config
      imageUploadUrl: '/upload/',

      //Toolbar config
      toolbarCanCollapse : true,
      toolbar : [
    		{ name: 'clipboard', items: [ 'Undo', 'Redo' ] },
    		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', '-',
          'RemoveFormat'] },
    		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-',
          'Outdent', 'Indent', '-', 'Blockquote', '-',
          'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
    		{ name: 'links', items: [ 'Link', 'Image' ] }
    	],
    };

    var editors = {};   //Cache editors

    // Private constructor
    function CKE($rootScope, CKEDITOR) {
      var self = this;

      CKEDITOR.disableAutoInline = true;

      /*
        Get a copy of default config
      */
      self.getConfig = function(){
        var config = angular.extend({}, ckeditorConfig);
        return config;
      };


      /*
        Create and register editor from element
      */
      self.createEditor = function(id, element, options){
        options = options || {};
        var editor = CKEDITOR.replace(element.get(0), options);
        if (id){
          editors[id] = editor;
        }else{
          editors[editor.id] = editor;
        }
        return editor;
      };

      /*
        Return editor from id
      */
      self.getEditor = function(id){
        if(editors[id]){
          return editors[id];
        }
        return null;
      };

      /*
        Destroy editor instance
      */
      self.destroyEditor = function(id){
        if (editors[id]){
          editors[id].destroy();
          delete editors[id];
        }
      };

    }

    /*
      Public method to set config
    */
    this.setConfig = function (config) {
      if (config){
        angular.extend(ckeditorConfig, config);
      }
    };

    // Method for instantiating
    this.$get = ['$rootScope', 'CKEDITOR', function ($rootScope, CKEDITOR) {
      return new CKE($rootScope, CKEDITOR);
    }];
  });
