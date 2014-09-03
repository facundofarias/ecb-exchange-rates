var currencyConverter = require('./currencyConverter.js');

// index.getAllCurrencies(function(data){
//   console.log(JSON.stringify(data));
// });

// index.getBaseCurrency(function(data){
//   console.log(JSON.stringify(data));
// });

var settings = {};
settings.fromCurrency = "GBP";
settings.toCurrency = "USD";
settings.amount = 90;
settings.accuracy = 5;

currencyConverter.convert(settings , function(data){
  console.log(JSON.stringify(data));
});
