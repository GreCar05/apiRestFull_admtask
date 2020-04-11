'use strict'

var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var task_routes = require('./routes/task');

//Middlewares

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use('/',task_routes);

module.exports = app;