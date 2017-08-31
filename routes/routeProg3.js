/******************************************************************/
/* Nombre:      Ruta de conteo de linea
/* Autor:       Johanna
/* Fecha:       31/08/17
/* Descripción: Ejecuta las funciones necesarios de acuerdo a la ruta requerida
/******************************************************************/

var express = require('express');
var router = express.Router();
var path   = require("path");

// Ruta de inicio
router.get('/', function(req, res) {
  res.sendFile('start.html', {root: 'public/html'});
});

// Exporta todo lo relacionado a la variable router
module.exports = router;
