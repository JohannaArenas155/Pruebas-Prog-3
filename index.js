/******************************************************************/
/* Nombre:      Index
/* Autor:       Johanna
/* Fecha:       31/08/17
/* Descripción: Es el modulo de inicio, contiene las rutas de la aplicacion
/*              ademas el inicio del servidor
/******************************************************************/

// Constantes
const PORT = 8888;

// Modulos requeridos
var express = require('express');
var routeProg3 = require('./routes/routeProg3');

// Variables
var app = express();

// Esta es la ruta por defecto, modificar cuando haya algun menu
app.use('/', routeProg3);

// Ruta para cargar archivos estaticos
app.use('/static', express.static(__dirname + '/public'));

// Inicio del servidor
app.listen(PORT, function () {
  console.log('Listening on localhost:' + PORT);
});
