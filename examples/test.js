var currencyConverter = require('../currencyConverter.js');

var settings = {};
settings.currency = "EUR";
currencyConverter.getCurrencyMetadata(settings, function(data){
  console.log(JSON.stringify(data));
});
