var mysql = require("mysql");
var config = require(".././datos/database.js");

module.exports = {

    guardarPreSolicitud: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `pre_solicitud`(`idCliente`, `idTrabajador`, `codigo`, `ubicacionCliente`, `descripcion`, `foto1`, `foto2`, `foto3`, `fecha`, `estado`, `tipo`) VALUES (?,?,?,?,?,?,?,?, NOW(),?,?)",
            [
                req.body.idCliente,
                req.body.idTrabajador,
                req.body.codigo,
                req.body.ubicacionCliente,
                req.body.descripcion,
                req.body.foto1,
                req.body.foto2,
                req.body.foto3,
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

    modificarPreSolicitud: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `pre_solicitud` SET `estado` = 0 WHERE `codigo` = ?",
            [
                req.query.codigo
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

    buscarPreSolicitudes: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query(`SELECT
        pre_solicitud.idPreSolicitud,
        (SELECT cliente.nombre FROM cliente WHERE cliente.idCliente = pre_solicitud.idCliente) AS 'nombreCliente',
        pre_solicitud.idCliente,
        pre_solicitud.idTrabajador,
        pre_solicitud.codigo,
        pre_solicitud.ubicacionCliente,
        pre_solicitud.descripcion,
        pre_solicitud.foto1,
        pre_solicitud.foto2,
        pre_solicitud.foto3,
        pre_solicitud.fecha,
        pre_solicitud.estado,
        pre_solicitud.tipo
        FROM
        pre_solicitud
        WHERE
        pre_solicitud.idTrabajador = ? AND
        pre_solicitud.estado = 1`,
            [
                req.query.idTrabajador
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