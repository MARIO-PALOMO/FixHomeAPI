var mysql = require("mysql");
var config = require(".././datos/database.js");


module.exports = {

    buscarCliente: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query(`
        SELECT
        cliente.idCliente,
        cliente.nombre,
        cliente.direccion,
        cliente.telefono,
        cliente.idUsuario
        FROM
        cliente
        WHERE
        cliente.idCliente = ?
        `, [req.query.idCliente], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    buscarClienteReporteResumen: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query(`
        SELECT CONVERT((CONCAT('{"Total":',
                (SELECT
                COUNT(solicitud.estado)
                FROM
                solicitud
                INNER JOIN trabajador ON solicitud.idTrabajador = trabajador.idTrabajador
                INNER JOIN cliente ON solicitud.idCliente = cliente.idCliente
                WHERE
                cliente.idCliente = `+ req.query.idCliente + `)
                ,', "Recibidos":',
                (SELECT
                COUNT(solicitud.estado)
                FROM
                solicitud
                INNER JOIN trabajador ON solicitud.idTrabajador = trabajador.idTrabajador
                INNER JOIN cliente ON solicitud.idCliente = cliente.idCliente
                WHERE
                cliente.idCliente = `+ req.query.idCliente + `
                AND solicitud.estado = 1)
                ,', "Proceso":',
                (SELECT
                COUNT(solicitud.estado)
                FROM
                solicitud
                INNER JOIN trabajador ON solicitud.idTrabajador = trabajador.idTrabajador
                INNER JOIN cliente ON solicitud.idCliente = cliente.idCliente
                WHERE
                cliente.idCliente = `+ req.query.idCliente + `
                AND solicitud.estado = 2)
                ,', "Completadas":',
                (SELECT
                COUNT(solicitud.estado)
                FROM
                solicitud
                INNER JOIN trabajador ON solicitud.idTrabajador = trabajador.idTrabajador
                INNER JOIN cliente ON solicitud.idCliente = cliente.idCliente
                WHERE
                cliente.idCliente = `+ req.query.idCliente + `
                AND solicitud.estado = 3)
                ,'}')), VARCHAR(100000)) AS 'Resultado'`, function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    buscarClienteReporte: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query(`
        SELECT
        solicitud.idSolicitud,
        solicitud.descripcion,
        solicitud.foto1,
        solicitud.foto2,
        solicitud.foto3,
        solicitud.ubicacionCliente,
        solicitud.ubicacionTrabajador,
        solicitud.idTrabajador,
        solicitud.idCliente,
        solicitud.estado,
        solicitud.fecha,
        solicitud.tipo,
        trabajador.nombre AS 'Trabajador'
        FROM
        solicitud
        INNER JOIN cliente ON solicitud.idCliente = cliente.idCliente
        INNER JOIN trabajador ON solicitud.idTrabajador = trabajador.idTrabajador
        WHERE
        cliente.idCliente = ?
        ORDER BY
        solicitud.fecha DESC
        `, [req.query.idCliente], function (err, rows, fields) {
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