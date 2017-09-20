/******************************************************************/
/* Nombre:      Manejador de archivos
/* Autor:       Alejo
/* Fecha:       16/09/17
/* Descripción: Calcula la Regresion Lineal y el Coeficiente de Correlación de acuerdo a los textos recibidos
/******************************************************************/

// Modulos
var async = require('async');
var math = require('mathjs');
const xValueJoined = 386;
var regressionFunction;
var yValueJoined = 0;
var xValue = [130,650,99,150,128,302,95,945,368,961];
var yValue = [186,699,132,272,291,331,199,1890,788,1601];
var numbersAmount = xValue.lenght;
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
var xAvg = 0;
var yAvg = 0;
var aux = [];

// Cuenta las lineas de codigo y todos sus items
function calculateAll(files, texts, information, xValue, yValue) {

  var info = [];

  async.forEachOf(texts, function(value, key, cb){

    var aux = texts[key].split('\n');
    console.log(aux[1]);
    async.forEachOf (aux, function(value1, key1, cb1){
        xValue[key1] = aux[key1].substring(0,aux[key1].indexOf(',')-1);
        yValue[key1] = aux[key1].substring(aux[key1].indexOf(',')+1,aux[key1].lenght());
    });
  });

  console.log(xValue);


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
  xAvg = xSummatory/numbersAmount;
  yAvg = ySummatory/numbersAmount;
  //B sub 1
  bValue = (xMultiplyYSummatory - (xAvg*yAvg*numbersAmount))/(xPowSummatory - (math.pow(xAvg,2)*numbersAmount));
  //B sub 0
  aValue = ((yAvg) - (bValue*(xAvg)));

  rValue = ((numbersAmount*xMultiplyYSummatory)-(xSummatory*ySummatory))/(math.sqrt(((numbersAmount*(xPowSummatory))-math.pow(xSummatory,2))*((numbersAmount*(yPowSummatory))-math.pow(ySummatory,2))));

  rValuePow = rValue*rValue;

  yValueJoined = aValue + bValue*xValueJoined;

  /*console.log(bValue);
  console.log(aValue);
  console.log(rValue);
  console.log(rValuePow);
  console.log(yValueJoined);*/
}

exports.calculateAll = calculateAll;
