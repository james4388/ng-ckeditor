'use strict';

var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var multer  = require('multer');
var upload = multer({ dest: 'app/images/' })

/*app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());*/


//Cross origin
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.post('/upload', upload.single('upload'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  console.log(req.body);
  if (req.file){
    res.json({
      'fileName': req.file.filename,
      'uploaded' : 1,
      'url' : req.file.path.replace('app/', '/')
    });
  }
});

app.all('/', function(req, res){
  res.json({'error': 'none'});
});


http.listen(3000, function(){
 console.log('listening on *:3000');
});
