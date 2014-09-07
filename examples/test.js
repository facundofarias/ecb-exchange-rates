var currencyConverter = require('../currencyConverter.js');

// currencyConverter.getAllCurrencies(function(data){
//   console.log(JSON.stringify(data));
// });

// currencyConverter.getBaseCurrency(function(data){
//   console.log(JSON.stringify(data));
// });

// var settings = {};
// settings.fromCurrency = "GBP";
// settings.toCurrency = "USD";
// settings.amount = 90;
// settings.accuracy = 5;
//
// currencyConverter.convert(settings , function(data){
//   console.log(JSON.stringify(data));
// });

// var settings = {};
// settings.fromCurrency = "GBP";
// settings.toCurrency = "USD";
// settings.accuracy = 5;
//
// currencyConverter.getExchangeRate(settings , function(data){
//   console.log(JSON.stringify(data));
// });

// currencyConverter.getCurrenciesMetadata(function(data){
//   console.log(JSON.stringify(data));
// });

var settings = {};
settings.currency = "EUR";
currencyConverter.getCurrencyMetadata(settings, function(data){
  console.log(JSON.stringify(data));
});
