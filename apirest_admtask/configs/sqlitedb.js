'use strict'

var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "./db/db.sqlite";

let db = new sqlite3.Database(DBSOURCE,(err) => {
    if(err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to DB');

        db.run(`CREATE TABLE task(
                    idtask INTEGER PRIMARY KEY AUTOINCREMENT,
                    name text,
                    area text,
                    description text,
                    time text,
                    date text,
                    completed INTEGER,
                    status INTEGER )`,
                    (err) => {
                        if (err) {
                           // Tabla ya Creada
                        } else {
                            var insert = 'INSERT INTO task(name,area,description,time,date,completed,status) VALUES(?,?,?,?,?,?,?)';
                            db.run(insert,["test","test","test","00:15:00","08/04/2020",0,0]);
                            db.run(insert,["test","test","test","00:15:00","08/04/2020",0,0]);
                        }

                    });
    }
})

module.exports = db;