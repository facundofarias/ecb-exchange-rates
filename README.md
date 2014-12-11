European Central Bank Exchange Rates API client module for NodeJS
==================
This is currency converter for NodeJS - uses the European Central Bank's daily feed for accuracy

# Contents

 * [Installation](#installation)
 * [Usage](#usage)
 * [Supported Currencies](#supporedcurrencies)
 * [Bugs](#bugs)
 * [Licence](#licence)

<a name="installation"/>
# Installation

You can install this module by using npm [NPM](https://npmjs.org/package/ecb-exchange-rates):

    npm install ecb-exchange-rates

<a name="usage"/>
# Usage

The first step is to include the library on you app by doing:

    var currencyConverter = require('ecb-exchange-rates');

If we need to convert a given value, then we create this settings object:

    var settings = {};
    settings.fromCurrency = "GBP";
    settings.toCurrency = "USD";
    settings.amount = 90;
    settings.accuracy = 10;

After that, we can call to the convert function in this way:

    currencyConverter.exchange(settings , function(data){
      console.log(JSON.stringify(data));
    });

The data object that you will receive on the callback, will contain:

* currency
* exchange Rate
* amount

By instance: {"currency":"USD","exchangeRate":1.64686,"amount":148.21739}

Another User Case will be if we only need the exchange rate, then:

    var settings = {};
    settings.fromCurrency = "GBP";
    settings.toCurrency = "USD";
    settings.accuracy = 10;

After that, we can call to the getExchangeRate function in this way:

    currencyConverter.getExchangeRate(settings , function(data){
      console.log(JSON.stringify(data));
    });

The data object that you will receive on the callback, will contain:

* toCurrency
* fromCurrency
* exchangeRate

By instance: {"toCurrency":"USD","fromCurrency":"GBP","exchangeRate":1.64686}

In case we only need all the supported currencies with their exchange rates, we can call:

    currencyConverter.getAllCurrencies(function(data){
      console.log(JSON.stringify(data));
    });

And it will return something like this (with the EUR as base):

    [{"currency":"USD","rate":"1.3151"},{"currency":"JPY","rate":"138.11"},{"currency":"BGN","rate":"1.9558"},{"currency":"CZK","rate":"27.658"},{"currency":"DKK","rate":"7.4476"},{"currency":"GBP","rate":"0.79855"},{"currency":"HUF","rate":"314.02"},{"currency":"LTL","rate":"3.4528"},{"currency":"PLN","rate":"4.1905"},{"currency":"RON","rate":"4.4043"},{"currency":"SEK","rate":"9.1969"},{"currency":"CHF","rate":"1.2078"},{"currency":"NOK","rate":"8.1605"},{"currency":"HRK","rate":"7.6210"},{"currency":"RUB","rate":"48.4385"},{"currency":"TRY","rate":"2.8427"},{"currency":"AUD","rate":"1.4094"},{"currency":"BRL","rate":"2.9397"},{"currency":"CAD","rate":"1.4336"},{"currency":"CNY","rate":"8.0772"},{"currency":"HKD","rate":"10.1923"},{"currency":"IDR","rate":"15472.66"},{"currency":"ILS","rate":"4.7154"},{"currency":"INR","rate":"79.4518"},{"currency":"KRW","rate":"1341.18"},{"currency":"MXN","rate":"17.2022"},{"currency":"MYR","rate":"4.1844"},{"currency":"NZD","rate":"1.5802"},{"currency":"PHP","rate":"57.395"},{"currency":"SGD","rate":"1.6469"},{"currency":"THB","rate":"42.140"},{"currency":"ZAR","rate":"14.0505"}]

Sometimes we need to display amounts accordingly with the currency, in that case we can call:

    currencyConverter.getCurrenciesMetadata(function(data){
      console.log(JSON.stringify(data));
    });

    (You can also filter the result by passing a single currency as parameter)

And it will return all the needed data for visualisation such as:

    [{"Description":"Argentine Peso","Code":"ARS","Symbol":"$","Dec":"36","Hex":"24"},{"Description":"Australian Dollar","Code":"AUD","Symbol":"$","Dec":"36","Hex":"24"},{"Description":"Barbadian Dollar","Code":"BBD","Symbol":"$","Dec":"36","Hex":"24"},{"Description":"Brazilian Real","Code":"BRL","Symbol":"R$","Dec":"82, 36","Hex":"52, 24"},{"Description":"British Pound","Code":"GBP","Symbol":"£","Dec":"163","Hex":"a3"},{"Description":"Canadian Dollar","Code":"CAD","Symbol":"$","Dec":"36","Hex":"24"},{"Description":"Chilean Peso","Code":"CLP","Symbol":"$","Dec":"36","Hex":"24"},{"Description":"Chinese Yuan","Code":"CNY","Symbol":"元","Dec":"20803","Hex":"5143"},{"Description":"Czech Koruna","Code":"CZK","Symbol":"Kč","Dec":"75, 269","Hex":"4b, 10d"},{"Description":"Danish Krone","Code":"DKK","Symbol":"kr","Dec":"107, 114","Hex":"6b, 72"},{"Description":"East Caribbean Dollar","Code":"XCD","Symbol":"$","Dec":"36","Hex":"24"},{"Description":"Egyptian Pound","Code":"EGP","Symbol":"£","Dec":"163","Hex":"a3"},{"Description":"Estonian Kroon","Code":"EEK","Symbol":"kr","Dec":"107, 114","Hex":"6b, 72"},{"Description":"Euro","Code":"EUR","Symbol":"€","Dec":"8364","Hex":"20ac"},{"Description":"Hong Kong Dollar","Code":"HKD","Symbol":"元","Dec":"20803","Hex":"5143"},{"Description":"Hungarian Forint","Code":"HUF","Symbol":"Ft","Dec":"70, 116","Hex":"46, 74"},{"Description":"Icelandic Krona","Code":"ISK","Symbol":"kr","Dec":"107, 114","Hex":"6b, 72"},{"Description":"Indian Rupee","Code":"INR","Symbol":"₹","Dec":"8377","Hex":"x20b9"},{"Description":"Indonesian Rupiah","Code":"IDR","Symbol":"Rp","Dec":"82, 112","Hex":"52, 70"},{"Description":"Israeli Sheqel","Code":"ILS","Symbol":"₪","Dec":"8362","Hex":"20aa"},{"Description":"Jamaican Dollar","Code":"JMD","Symbol":"J$","Dec":"74, 36","Hex":"4a, 24"},{"Description":"Japanese Yen","Code":"JPY","Symbol":"¥","Dec":"165","Hex":"a5"},{"Description":"Latvian Lats","Code":"LVL","Symbol":"Ls","Dec":"76, 115","Hex":"4c, 73"},{"Description":"Lebanese Pound","Code":"LBP","Symbol":"£","Dec":"163","Hex":"a3"},{"Description":"Lithuanian Litas","Code":"LTL","Symbol":"Lt","Dec":"76, 116","Hex":"4c, 74"},{"Description":"Malaysian Ringgit","Code":"MYR","Symbol":"RM","Dec":"82, 77","Hex":"52, 4d"},{"Description":"Mexican Peso","Code":"MXN","Symbol":"$","Dec":"36","Hex":"24"},{"Description":"Namibian Dollar","Code":"NAD","Symbol":"$","Dec":"36","Hex":"24"},{"Description":"Nepalese Rupee","Code":"NPR","Symbol":"₨","Dec":"8360","Hex":"20a8"},{"Description":"New Zealand Dollar","Code":"NZD","Symbol":"$","Dec":"36","Hex":"24"},{"Description":"Norwegian Krone","Code":"NOK","Symbol":"kr","Dec":"107, 114","Hex":"6b, 72"},{"Description":"Omani Rial","Code":"OMR","Symbol":"﷼","Dec":"65020","Hex":"fdfc"},{"Description":"Pakistani Rupee","Code":"PKR","Symbol":"₨","Dec":"8360","Hex":"20a8"},{"Description":"Panamanian Balboa","Code":"PAB","Symbol":"B/.","Dec":"66, 47, 46","Hex":"42, 2f, 2e"},{"Description":"Philippine Peso","Code":"PHP","Symbol":"Ph","Dec":"80, 104, 11","Hex":"50, 68, 70"},{"Description":"Polish Zloty","Code":"PLN","Symbol":"zł","Dec":"122, 322","Hex":"7a, 142"},{"Description":"Qatari Riyal","Code":"QAR","Symbol":"﷼","Dec":"65020","Hex":"fdfc"},{"Description":"Romanian Leu","Code":"RON","Symbol":"le","Dec":"108, 101, 1","Hex":"6c, 65, 69"},{"Description":"Russian Rouble","Code":"RUB","Symbol":"ру,;","Dec":"1088, 1091,","Hex":"440, 443, 4"},{"Description":"Saudi Riyal","Code":"SAR","Symbol":"﷼","Dec":"65020","Hex":"fdfc"},{"Description":"Singapore Dollar","Code":"SGD","Symbol":"$","Dec":"36","Hex":"24"},{"Description":"South African Rand","Code":"ZAR","Symbol":"R","Dec":"82","Hex":"52"},{"Description":"South Korean Won","Code":"KRW","Symbol":"₩","Dec":"8361","Hex":"20a9"},{"Description":"Sri Lankan Rupee","Code":"LKR","Symbol":"₨","Dec":"8360","Hex":"20a8"},{"Description":"Swedish Krona","Code":"SEK","Symbol":"kr","Dec":"107, 114","Hex":"6b, 72"},{"Description":"Swiss Franc","Code":"CHF","Symbol":"CHF","Dec":"67, 72, 70","Hex":"43, 48, 46"},{"Description":"Thai Baht","Code":"THB","Symbol":"฿","Dec":"3647","Hex":"e3f"},{"Description":"Turkish Lira","Code":"TRY","Symbol":"YTL","Dec":"89, 84, 76","Hex":"59, 54, 4c"},{"Description":"US Dollar","Code":"USD","Symbol":"$","Dec":"36","Hex":"24"},{"Description":"Venezuelan bolivar","Code":"VEF","Symbol":"Bs","Dec":"66, 115","Hex":"42, 73"}]

<a name="supporedcurrencies"/>
# Supported Currencies

 * AUD - Australian Dollar
 * BGN - Bulgarian Lev
 * BRL - Brazilian Real
 * CAD - Canadian Dollar
 * CHF - Swiss Franc
 * CNY - Chinese Yuan
 * CZK - Czech Koruna
 * DKK - Danish Krone
 * EUR - Euro
 * GBP - British Pound
 * HKD - Hong Kong Dollar
 * HRK - Croatian Kuna
 * HUF - Hungarian Forint
 * IDR - Indonesian Rupiah
 * ILS - Israeli New Shekel
 * INR - Indian Rupee
 * JPY - Japanese Yen
 * KRW - South Korean Won
 * LTL - Lithuanian Litas
 * LVL - Latvian Lats
 * MXN - Mexian Peso
 * MYR - Malaysian Ringgit
 * NOK - Norwegian Krone
 * NZD - New Zealand Dollar
 * PHP - Phillippine Peso
 * PLN - Polish Zloty
 * RON - Romanian New Leu
 * RUB - Russian Rouble
 * SEK - Swedish Krona
 * SGD - Singapore Dollar
 * THB - Thai Baht
 * TRY - Turkish Lira
 * USD - US Dollar
 * ZAR - South African Rand

<a name="bugs"/>
# Bugs

Please report any bugs on [GitHub](https://github.com/facundofarias/ecb-exchange-rates/issues)

<a name="licence"/>
# License

[MIT License](http: //facundofarias.mit-license.org/) © Facundo Farias
