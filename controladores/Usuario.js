var mysql = require("mysql");
var config = require(".././datos/database.js");
var jwt = require("jsonwebtoken");


module.exports = {
  iniciarSesionCliente: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      `SELECT
      usuario.idUsuario,
      usuario.email,
      usuario.contrasena,
      usuario.rol,
      cliente.idCliente,
      cliente.nombre,
      cliente.direccion,
      cliente.telefono
      FROM
      usuario
      INNER JOIN cliente ON cliente.idUsuario = usuario.idUsuario
      WHERE
      usuario.email = ? AND
      usuario.contrasena = ?`,
      [req.body.email, req.body.contrasena],
      function (err, data, fields) {
        if (err) {
          console.log(err);
          db.end();
        } else {

          var datos = JSON.stringify(data[0]);

          if (datos == undefined) {
            res.send(false);
          } else {
            var usuario = JSON.parse(datos);
            var token = jwt.sign(usuario, "fixhometoken", {
              expiresIn: 60 * 60 * 24
            });

            res.send({ usuario: usuario, token: token });

          }
        }
      }
    );
  },

  iniciarSesionTrabajador: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      `SELECT
      usuario.idUsuario,
      usuario.email,
      usuario.contrasena,
      usuario.rol,
      trabajador.idTrabajador,
      trabajador.nombre,
      trabajador.direccion,
      trabajador.telefono
      FROM
      usuario
      INNER JOIN trabajador ON trabajador.idUsuario = usuario.idUsuario
      WHERE
      usuario.email = ? AND
      usuario.contrasena = ?`,
      [req.body.email, req.body.contrasena],
      function (err, data, fields) {
        if (err) {
          console.log(err);
          db.end();
        } else {
          var datos = JSON.stringify(data[0]);

          if (datos == undefined) {
            res.send(false);
          } else {
            var usuario = JSON.parse(datos);
            var token = jwt.sign(usuario, "fixhometoken", {
              expiresIn: 60 * 60 * 24
            });

            res.send({ usuario: usuario, token: token });

          }
        }
      }
    );
  },

  agregarUsuarioCliente: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("INSERT INTO `usuario`(`email`, `contrasena`, `rol`) VALUES (?,?,?)",
      [req.body.email, req.body.contrasena, req.body.rol], function (err, data, fields) {
        if (err) {
          console.log(err);
          db.end();
        } else {
          db.end();

          var datos = JSON.stringify(data);
          var usuario = JSON.parse(datos);
          var idUsuario = usuario.insertId;

          var db2 = mysql.createConnection(config);
          db2.connect();

          db2.query("INSERT INTO cliente (`nombre`, `direccion`, `telefono`, `idUsuario`) VALUES (?,?,?,?)",
            [req.body.nombre, req.body.direccion, req.body.telefono, idUsuario], function (err, rows, fields) {
              if (err) {
                console.log(err);
                db2.end();
              } else {
                db2.end();
                res.send(rows);
              }
            });

        }
      });
  },

  actualizarUsuarioCliente: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("UPDATE `usuario` SET `email` = ?, `contrasena` = ? WHERE `idUsuario` = ?",
      [
        req.body.email,
        req.body.contrasena,
        req.body.idUsuario,
      ], function (err, rows, fields) {
        if (err) {
          console.log(err);
          db.end();
        } else {
          db.end();

          var db2 = mysql.createConnection(config);
          db2.connect();

          db2.query("UPDATE `cliente` SET `nombre` = ?, `direccion` = ?, `telefono` = ? WHERE `idCliente` = ?",
            [
              req.body.nombre,
              req.body.direccion,
              req.body.telefono,
              req.body.idCliente,
            ], function (err, rows, fields) {
              if (err) {
                console.log(err);
                db2.end();
              } else {
                db2.end();
                res.send(rows);
              }
            });

        }
      });
  },

  actualizarUsuarioTrabajador: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("UPDATE `usuario` SET `email` = ?, `contrasena` = ? WHERE `idUsuario` = ?",
      [
        req.body.email,
        req.body.contrasena,
        req.body.idUsuario,
      ], function (err, rows, fields) {
        if (err) {
          console.log(err);
          db.end();
        } else {
          db.end();

          var db2 = mysql.createConnection(config);
          db2.connect();

          db2.query("UPDATE `trabajador` SET `nombre` = ?, `direccion` = ?, `telefono` = ? WHERE `idTrabajador` = ?",
            [
              req.body.nombre,
              req.body.direccion,
              req.body.telefono,
              req.body.idTrabajador,
            ], function (err, rows, fields) {
              if (err) {
                console.log(err);
                db2.end();
              } else {
                db2.end();
                res.send(rows);
              }
            });
        }
      });
  },

  seguridad: function (req, res, next) {
    var token = req.headers["authorization"];
    if (!token) {
      res.send(false);
      return;
    }

    token = token.replace("Bearer ", "");

    jwt.verify(token, "fixhometoken", function (err, user) {
      if (err) {
        res.send(false);
      } else {
        return next();
      }
    });
  }
};
