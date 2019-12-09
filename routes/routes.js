var express = require('express');
var router = express.Router();
var controladores = require('.././controladores');

var multer = require("multer");
var upload = multer({ dest: "./averias/" });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//USUARIO
router.post('/iniciarSesionCliente', controladores.Usuario.iniciarSesionCliente);
router.post('/actualizarUsuarioCliente', controladores.Usuario.actualizarUsuarioCliente);
router.post('/actualizarUsuarioTrabajador', controladores.Usuario.actualizarUsuarioTrabajador);

//CLIENTE
router.post('/iniciarSesionTrabajador', controladores.Usuario.iniciarSesionTrabajador);

//USARIO CLIENTE
router.post('/agregarUsuarioCliente', controladores.Usuario.agregarUsuarioCliente);

//TRABAJADOR
router.get('/buscarTrabajadoresServicio', controladores.Usuario.seguridad, controladores.Trabajador.buscarTrabajadoresServicio);
router.get('/buscarTrabajadorReporteResumen', controladores.Usuario.seguridad, controladores.Trabajador.buscarTrabajadorReporteResumen);
router.get('/buscarTrabajadorReporte', controladores.Usuario.seguridad, controladores.Trabajador.buscarTrabajadorReporte);

//CLIENTE
router.get('/buscarCliente', controladores.Usuario.seguridad, controladores.Cliente.buscarCliente);
router.get('/buscarClienteReporte', controladores.Usuario.seguridad, controladores.Cliente.buscarClienteReporte);
router.get('/buscarClienteReporteResumen', controladores.Usuario.seguridad, controladores.Cliente.buscarClienteReporteResumen);

//PRE SOLICITUD
router.post('/guardarPreSolicitud', controladores.Usuario.seguridad, controladores.PreSolicitud.guardarPreSolicitud);
router.get('/modificarPreSolicitud', controladores.Usuario.seguridad, controladores.PreSolicitud.modificarPreSolicitud);
router.get('/buscarPreSolicitudes', controladores.Usuario.seguridad, controladores.PreSolicitud.buscarPreSolicitudes);

//SOLICITUD
router.post('/guardarSolicitud', controladores.Usuario.seguridad, controladores.Solicitud.guardarSolicitud);
router.get('/cambiarEstadoSolicitud', controladores.Usuario.seguridad, controladores.Solicitud.cambiarEstadoSolicitud);


//SERVICIOS
router.get('/buscarServicios', controladores.Usuario.seguridad, controladores.Servicio.buscarServicios);

//SUBIR IMAGENES
router.post('/subirImagenes', upload.array('file', 5), controladores.Imagenes.subirImagenes);

/*router.get('/buscarEntradas', controladores.Usuario.seguridad, controllers.Entrada.buscarEntradas);
router.get('/buscarEntradasCombo', controladores.Usuario.seguridad, controllers.Entrada.buscarEntradasCombo);
router.post('/guardarEntrada', controladores.Usuario.seguridad, controllers.Entrada.guardarEntrada);
router.post('/modificarEntrada', controladores.Usuario.seguridad, controllers.Entrada.modificarEntrada);
router.get('/eliminarEntrada', controladores.Usuario.seguridad, controllers.Entrada.eliminarEntrada);*/

module.exports = router;
