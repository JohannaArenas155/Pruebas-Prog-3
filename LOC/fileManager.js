/******************************************************************/
/* Nombre:      Manejador de archivos
/* Autor:       Cristian
/* Fecha:       20/08/17
/* Descripción: Ejecuta las funciones requeridas para obtener los archivos y leerlos
/******************************************************************/


// Modulos
var formidable = require('formidable');
var path = require('path');
var textract = require('textract');
var async = require('async');

// Recibe los archivos del post y los guarda temporalmente
function saveFiles(req, results) {
  var fileArray = [];
  var form = new formidable.IncomingForm();

  form.encoding = 'utf-8';
  form.uploadDir = './LOC/temp';
  form.multiples = true;
  form.keepExtensions = true;

  // Convierte los datos de la peticion post a un formato que formidable use
  form.parse(req);

  // Cada que encuentre un archivo lo guarda en el array
  form.on('file', function(name, file) {
    if (file.type == 'application/octet-stream' ||
        file.type == 'image/png' ||
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg') {
      results('Extension del archivo ' + file.name + ' no es valido', null);
      return;
    } else {
      fileArray.push(file);
    }
  });
  // Si hay un error
  form.on('error', function(err) {
    console.log('Error en saveFiles: ' + err);
    results('Error al intentar guardar uno de los archivos, quizas sea demasiado grande', null);
  });
  // Cuando guarde todos los archivos active la funcion callback
  form.on('end', function() {
    results(null, fileArray);
  });
}

// Recibe un array de informacion de archivos (Los que trae formidable)
// Results es el callback, el cual devuelve error o un array con los textos
function extractTextFromFiles(files, results) {
  var textArray = [];

  // Itera asincronamente
  async.each(files, function(file, callback){
    // Ruta del archivo guardado
    var filePath = path.resolve('./' + file.path);

    // Convierte el contenido del archivo en un string
    textract.fromFileWithPath(filePath, function(err, text) {
      if (err) {
        //console.log('Error extrayendo texto: ' + err);
        results('El archivo ' + file.name + ' está vacio o no se puede leer', null);
      } else {
        // Guarda el texto actual
        textArray.push(text);
        // Asi continua iterando
        callback();
      }
    });
  // Funcion que se ejecuta cuando todas las iteraciones terminan
  }, function(err) {
    if (err) {
      results('No se ha podido obtener texto de uno de los archivos ingresados');
      console.log('Error extrayendo texto: ' + err);
    } else {
      results(null, textArray);
    }
  });
}

exports.saveFiles = saveFiles;
exports.extractTextFromFiles = extractTextFromFiles;
