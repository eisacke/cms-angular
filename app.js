var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/qi-angular'
mongoose.connect(databaseURL);

app.set('views', './public');
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));
app.listen(process.env.PORT || 3000);