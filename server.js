'use strict';

var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/dist'));