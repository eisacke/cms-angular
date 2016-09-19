var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/qi-angular'
mongoose.connect(databaseURL);

app.set('views', './public');
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});

app.use(require('./controllers'));
app.listen(process.env.PORT || 3000);