var mysql = require("mysql");
var config = require(".././datos/database.js");

module.exports = {

    guardarSolicitud: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `solicitud`(`descripcion`, `foto1`, `foto2`, `foto3`, `ubicacionCliente`, `ubicacionTrabajador`, `idTrabajador`, `idCliente`, `estado`, `fecha`, `tipo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)",
            [
                req.body.descripcion,
                req.body.foto1,
                req.body.foto2,
                req.body.foto3,
                req.body.ubicacionCliente,
                req.body.ubicacionTrabajador,
                req.body.idTrabajador,
                req.body.idCliente,
                1,
                req.body.tipo
            ], function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    db.end();
                } else {
                    db.end();
                    res.send(rows);
                }
            });
    },

    cambiarEstadoSolicitud: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `solicitud` SET `estado` = ? WHERE `idSolicitud` = ?",
            [
                req.query.estado,
                req.query.idSolicitud
            ], function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    db.end();
                } else {
                    db.end();
                    res.send(rows);
                }
            });
    },
}