var mysql = require("mysql");
var config = require(".././datos/database.js");


module.exports = {

    buscarTrabajadoresServicio: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query(`
        SELECT
        trabajador.idTrabajador,
        trabajador.nombre AS nombreTrabajador,
        trabajador.direccion,
        trabajador.telefono,
        trabajador.idUsuario,
        servicio_trabajador.idServicioTrabajador,
        servicio.idServicio,
        servicio.nombre AS nombreServicio,
        servicio.descripcion,
        IFNULL(solicitud.estado, 0) as estado
        FROM
        trabajador
        INNER JOIN servicio_trabajador ON servicio_trabajador.idTrabajador = trabajador.idTrabajador
        INNER JOIN servicio ON servicio_trabajador.idServicio = servicio.idServicio
        LEFT JOIN solicitud ON solicitud.idTrabajador = trabajador.idTrabajador
        WHERE
        servicio.idServicio = ?
        `, [req.query.idServicio], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    buscarTrabajadorReporteResumen: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query(`
        SELECT CONVERT(
            (CONCAT('{"Total":',
            (SELECT
            COUNT(solicitud.estado)
            FROM
            solicitud
            INNER JOIN trabajador ON solicitud.idTrabajador = trabajador.idTrabajador
            INNER JOIN cliente ON solicitud.idCliente = cliente.idCliente
            WHERE
            trabajador.idTrabajador = `+ req.query.idTrabajador + `)
            ,', "Recibidos":',
            (SELECT
            COUNT(solicitud.estado)
            FROM
            solicitud
            INNER JOIN trabajador ON solicitud.idTrabajador = trabajador.idTrabajador
            INNER JOIN cliente ON solicitud.idCliente = cliente.idCliente
            WHERE
            trabajador.idTrabajador = `+ req.query.idTrabajador + `
            AND solicitud.estado = 1)
            ,', "Proceso":',
            (SELECT
            COUNT(solicitud.estado)
            FROM
            solicitud
            INNER JOIN trabajador ON solicitud.idTrabajador = trabajador.idTrabajador
            INNER JOIN cliente ON solicitud.idCliente = cliente.idCliente
            WHERE
            trabajador.idTrabajador = `+ req.query.idTrabajador + `
            AND solicitud.estado = 2)
            ,', "Completadas":',
            (SELECT
            COUNT(solicitud.estado)
            FROM
            solicitud
            INNER JOIN trabajador ON solicitud.idTrabajador = trabajador.idTrabajador
            INNER JOIN cliente ON solicitud.idCliente = cliente.idCliente
            WHERE
            trabajador.idTrabajador = `+ req.query.idTrabajador + `
            AND solicitud.estado = 3)
            ,'}'))
            ,VARCHAR(100000))  AS 'Resultado'`, function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    buscarTrabajadorReporte: function (req, res, next) {
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
        cliente.nombre AS 'Cliente'
        FROM
        solicitud
        INNER JOIN cliente ON solicitud.idCliente = cliente.idCliente
        INNER JOIN trabajador ON solicitud.idTrabajador = trabajador.idTrabajador
        WHERE
        trabajador.idTrabajador = ?
        ORDER BY
        solicitud.fecha DESC
        `, [req.query.idTrabajador], function (err, rows, fields) {
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