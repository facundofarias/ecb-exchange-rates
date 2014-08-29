var index = require('./index.js');

// index.getAllCurrencies(function(data){
//   console.log(JSON.stringify(data));
// });

// index.getBaseCurrency(function(data){
//   console.log(JSON.stringify(data));
// });

index.exchangeToEUR({currency:"USD", amount: 90}, function(data){
  console.log(JSON.stringify(data));
});
