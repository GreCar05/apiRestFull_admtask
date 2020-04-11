'use strict'

var db = require("../configs/sqlitedb");


//Delete User

exports.deleteTask = async function(req, res, next) {
    db.run(
        'DELETE FROM task WHERE idtask = ?',
        req.params.idtask,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
}


//Update Task
exports.updateTask = async function(req, res){

    

    var task = {
        name: req.body.name,
        area: req.body.area,
        description: req.body.description,
        time: req.body.time,
        date: req.body.date,
        completed: req.body.completed,
        status: req.body.status
    };
   
    db.run(`UPDATE task set
        name = COALESCE(?,name),
        area = COALESCE(?,area),
        description = COALESCE(?,description),
        time = COALESCE(?,time),
        date = COALESCE(?,date),
        completed = COALESCE(?,completed),
        status = COALESCE(?,status) 
        WHERE idtask = ?
        `,[task.name,task.area,task.description,task.time,task.date,
            task.completed,task.status,req.params.idtask],
        function (err, result) {
            if(err) {
                res.status(400).json({"error": res.message});
                return;
            }
            res.json({
                    message: "success",
                    data: task,
                    changes: this.changes
            })
        }
        );
}


exports.getTaskId = async function (req, res) {
    var sql = "select * from task where idtask = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });

}

exports.getTasks = async function (req, res) {
    
    var sql = "select * from task";
   
    var params = [];
    
    db.all(sql, params, (err, rows ) => {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "Success",
            "data": rows
        })

    });
}

exports.addTask = async function (req, res, next) {
    var errors=[]
    if (!req.body.name){
        errors.push("NoT Name specified");
    }
    if(!req.body.area){
        errors.push("NoT Area specified");
    }
    if (!req.body.description){
        errors.push("No description specified");
    }
    if (!req.body.time){
        errors.push("No time specified");
    }
    if (!req.body.date){
        errors.push("No date specified");
    }
    if (!req.body.completed){
        errors.push("No completed specified");
    }
    if (!req.body.status){
        errors.push("No status specified");
    }


    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var task = {
        name: req.body.name,
        area: req.body.area,
        description: req.body.description,
        time: req.body.time,
        date: req.body.date,
        completed: req.body.completed,
        status: req.body.status
    }

    var sql ='INSERT INTO task(name,area,description,time,date,completed,status) VALUES(?,?,?,?,?,?,?)';
    var params =[task.name,task.area,task.description,task.time,task.date,task.completed,task.status]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": task,
            "id" : this.lastID
        })

    });

}


