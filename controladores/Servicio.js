var mysql = require("mysql");
var config = require(".././datos/database.js");


module.exports = {

    buscarServicios: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query(`
        SELECT * FROM servicio`, function (err, rows, fields) {
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