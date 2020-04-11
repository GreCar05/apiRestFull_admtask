'use strict'

var express = require('express');
var md_auth = require('../middlewares/auth');


var TaskController = require('../controllers/task');
var AUTH = require('../controllers/auth');
var api = express.Router();

api.post('/autenticar',AUTH.autenticar);
// Proteger Rurtas con md_auth.ensureAuth
api.get('/tasks', TaskController.getTasks);
api.post('/addtask', TaskController.addTask);
api.get('/task/:id',TaskController.getTaskId);
api.patch('/updatetask/:idtask', TaskController.updateTask);
api.delete('/deletetask/:idtask',TaskController.deleteTask);


module.exports = api;

