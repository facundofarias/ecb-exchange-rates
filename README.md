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

Then, we create the settings object with some parameters such as:

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

* Currency
* Exchange Rate
* Amount

By instance: {"currency":"USD","exchangeRate":1.6469,"amount":148.2174}

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
