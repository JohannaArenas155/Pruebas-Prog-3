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
var regressionFunction; //no esta siendo utilizada

var xValue = [];
var yValue = [];
var aValue = [];
var bValue = [];
var rValue = [];
var rValuePow = [];
var yValueJoined = [];

//var aux = [];

// Cuenta las lineas de codigo y todos sus items
function calculateAll(files, texts, information) {

  var info = [];

  async.forEachOf(texts, function(value, key, cb){

    var numbersAmount = 0;
    var xSummatory = 0;
    var ySummatory = 0;
    var xPow = [];
    var yPow = [];
    var xPowSummatory = 0;
    var yPowSummatory = 0;
    var xMultiplyY = [];
    var xMultiplyYSummatory = 0;
    var xAvg = 0;
    var yAvg = 0;

    console.log(value);

    var aux = texts[key].split('\s'); //convierte el texto que viene en un string 
    console.log(aux);
    aux = aux[0].trim(); //elimina los espacios, del array de una posición
    //console.log(aux[0].length);
    //console.log(aux[0]);
    console.log(key);
    var numbersAmount = ((aux.match(/,/g)).length);
    //console.log(numbersAmount);

    var semaphore = 0;
    var startVector = 0;
    var endVector = aux.indexOf(',');


    var xValuePosition = 0;
    var yValuePosition = 0;
    //console.log(endVector);
    //Separa por comas teniendo en cuenta los espacios en el string aux y llena los vectores xValue y yValue.
    for (var i = 0; i < numbersAmount ; i++) {
      if (semaphore == 0){
        xValue[xValuePosition] = parseFloat((aux.substring(startVector,endVector)).trim()); 
        semaphore = 1;
        xValuePosition++;
        startVector = endVector;
        endVector = aux.indexOf(',',aux.indexOf(',') + endVector);
      }
      else {
        yValue[yValuePosition] = parseFloat((aux.substring(startVector+1,endVector)).trim());
        semaphore = 0;
        yValuePosition++;
        startVector = endVector + 1; //Para saltar el espacio en blanco dentro del string aux
        endVector = aux.indexOf(',',aux.indexOf(',') + endVector);
      }
    }

    numbersAmount = numbersAmount/2;

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
    bValue[key] = (xMultiplyYSummatory - (xAvg*yAvg*numbersAmount))/(xPowSummatory - (math.pow(xAvg,2)*numbersAmount));
    //B sub 0
    aValue[key] = ((yAvg) - (bValue[key]*(xAvg)));

    rValue[key] = ((numbersAmount*xMultiplyYSummatory)-(xSummatory*ySummatory))/(math.sqrt(((numbersAmount*(xPowSummatory))-math.pow(xSummatory,2))*((numbersAmount*(yPowSummatory))-math.pow(ySummatory,2))));

    rValuePow[key] = rValue[key]*rValue[key];

    yValueJoined[key] = aValue[key] + bValue[key]*xValueJoined;

    console.log( "El vector xValue es: " + xValue);
    console.log( "El vector yValue es: " + yValue);

    console.log(aValue[key]);
    console.log(bValue[key]);
    console.log(rValue[key]);
    console.log(rValuePow[key]);
    console.log(yValueJoined[key]);

    var tableInfo = {
        _aValue : aValue,
        _bValue : bValue,
        _rValue : rValue,
        _rValuePow : rValuePow,
        _yValueJoined : yValueJoined,
     };

    info.push(tableInfo);
    cb();
  }, function(err){
      information(null, info);
  });

    /*console.log("xValue en la posición 0: " + xValue[0]);
    console.log("xValue en la posición 1: " + xValue[1]);
    console.log("xValue en la posición 2: " + xValue[2]);
    console.log("yValue en la posición 0: " + yValue[0]);
    console.log("yValue en la posición 1: " + yValue[1]);
    console.log("xValue en la posición 2: " + yValue[2]);
    var xMasYEnCero = xValue[0] + yValue[0];
    console.log("z es igual a: " + xMasYEnCero);*/
  
}

exports.calculateAll = calculateAll;
