const express = require('express'),
        bodyParser = require('body-parser'),
        jwt = require('jsonwebtoken'),
        config = require('../configs/auth'),
        app = express();

        app.set('key',config.key);

        app.use(bodyParser.urlencoded({extended:true}));
        
        app.use(bodyParser.json());

exports.autenticar = async function (req, res) {
    if(req.body.user === "test" && req.body.passwd === "test"){
        const payload = {
            check: true
        };
        const token = jwt.sign(payload, app.get('key'), {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Autenticación Correcta',
            token: token
        });

    } else {
        res.json({mensaje: "Usuario o Contraseña incorrectos"})
    }
}