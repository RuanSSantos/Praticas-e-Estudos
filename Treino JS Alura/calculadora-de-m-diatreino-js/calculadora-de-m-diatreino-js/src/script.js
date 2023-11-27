var valorParaConverter = 30;
var cotaçãoDolar = 4.91;
var anosLuzEmMetros = 9460536207068016;
var anosLuzes = 34;
var valorBitcoin = 178874.02;

var totalAnosLuzMetro = anosLuzEmMetros * anosLuzes;
var TotalAnosLuzKilometro = totalAnosLuzMetro / 1000;

alert(
  "Total de anos luz em metros: " +
    totalAnosLuzMetro +
    "\nEm Kilometros: " +
    TotalAnosLuzKilometro
);

var valorConvertido = cotaçãoDolar * valorParaConverter;

valorConvertido = Math.round(valorConvertido);

alert("Olá Rafaela o valor em real é : R$" + valorConvertido);

var valorConvertidoBitcoin = valorBitcoin * valorParaConverter;

alert("Olá Rafaela o valor em real do Bitcoin é : R$" + valorConvertidoBitcoin);
