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

    var currencyConverter = require('currencyConverter');

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
