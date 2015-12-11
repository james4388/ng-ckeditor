# ng-ckeditor
Angular directive support ckeditor

Install ckeditor with bower:
```
  bower install --save ckeditor#full/lates
```

Add `ngCkeditor` dependencies to your module

html
```html
<texarea ckeditor="<your id>"
 ckeditor-option="{<overwrite default option>}"
 ng-model="ctrl.text"></textarea>
```

if you want to control editor instance

```
.controller('MainCtrl', ['CKE', function (CKE) {
  this.text = '<b>Welcome</b>!!!';

  //Get editor instance
  var editor = CKE.getEditor('<your id>');
  //Use CKEditor api...
}]
```
