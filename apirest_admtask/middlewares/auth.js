'use strict'

const express = require('express'),
            bodyParser = require('body-parser'),
            jwt = require('jsonwebtoken'),
            config = require('../configs/auth'),

            app = express();

app.set('key',config.key);

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

exports.ensureAuth = function( req, res, next) {
    const token = req.headers['access-token'];

    if(token) {
        jwt.verify(token, app.get('key'), (err, decoded) => {
            if(err){
                return res.json({mensaje: 'Token Invalido'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no Asignado'
        });
    }

}