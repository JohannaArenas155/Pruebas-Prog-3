/******************************************************************/
/* Nombre:      Ruta de la api de conteo de linea
/* Autor:       Cristian
/* Fecha:       20/08/17
/* Descripción: Ejecuta las funciones necesarios de acuerdo a la ruta
/******************************************************************/

var express = require('express');
var fileManager = require('../LOC/fileManager');
var countingLOC = require('../LOC/calculate');
var router = express.Router();
var math = require('mathjs');

// Se ejecuta siempre que se accede a la ruta /loc/api
// No le importa ni el metodo ni el resto de la url
router.use(function(req, res, next) {
  console.log('Se accedio a la api del LOC\n' +
    'Se dirige a: '+ req.url + '\nMetodo: ' + req.method);
  // Siga con las rutas normalmente
  next();
});

//Mostrar los resultados por ahora
var xValue = [130,650,99,150,128,302,95,945,368,961];
var yValue = [186,699,132,272,291,331,199,1890,788,1601];
var numbersAmount = xValue.length;
console.log(numbersAmount);
console.log(math.pow(numbersAmount,2));
var xSummatory = 0;
var ySummatory = 0;
var xPow = [];
var yPow = [];
var xPowSummatory = 0;
var yPowSummatory = 0;
var bValue = 0;
var aValue = 0;
var xMultiplyY = [];
var xMultiplyYSummatory = 0;
var rValuePow = [];
var rValue = 0;
var xavg = 0;
var yavg = 0;
var yk = 0;

for (var i = 0; i < numbersAmount; i++) {
  xSummatory = xSummatory + xValue[i];
  ySummatory = ySummatory + yValue[i];
  xPow[i] = math.pow(xValue[i],2);
  yPow[i] = math.pow(yValue[i],2);
  xPowSummatory = xPowSummatory + xPow[i];
  yPowSummatory = yPowSummatory + yPow[i];
  xMultiplyY[i] = xValue[i]*yValue[i];
  xMultiplyYSummatory = xMultiplyYSummatory + xMultiplyY[i];
}

xavg = xSummatory/numbersAmount;
yavg = ySummatory/numbersAmount;

bValue = (xMultiplyYSummatory - (xavg*yavg*numbersAmount))/(xPowSummatory - (math.pow(xavg,2)*numbersAmount));

aValue = ((yavg) - (bValue*(xavg)));

rValue = ((numbersAmount*xMultiplyYSummatory)-(xSummatory*ySummatory))/(math.sqrt(((numbersAmount*(xPowSummatory))-math.pow(xSummatory,2))*((numbersAmount*(yPowSummatory))-math.pow(ySummatory,2))));

rValuePow = rValue*rValue;

yk = aValue + bValue*386;

console.log(aValue);
console.log(bValue);
console.log(rValue);
console.log(rValuePow);
console.log(yk);
//Hasta aquí

// Solo se necesita recibir archivos
// Post para subir, con ruta /loc/api/upload
router.post('/upload', function(req, res) {
  fileManager.saveFiles(req, function(err, results) {
    if (err) {
      res.render('ErrorPage', {error: err});
    } else {
      //console.log(results);
      fileManager.extractTextFromFiles(results, function(err, texts){
        if (err) {
          res.render('ErrorPage', {error: err});
        } else {
          //console.log(texts);
          //res.render('LOCresults', { title: 'Hey', message: 'algo' });

          calculate.calculateAll(results, texts, function(err, info) {
            //console.log(info[0].vars);
            if (err) {
              res.render('ErrorPage', {error: err});
            } else {
              res.render('LOCresults', {information: info});
            }
          });
        }
      })
    }
  });
});


// Exporta todo lo relacionado a la variable router
module.exports = router;
