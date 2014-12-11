var xml2js = require('xml2js');
var request = require('request');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

module.exports = {

    settings: {
      url: "http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml"
    },

    baseCurrency: "EUR",

    currenciesMap: [],

    currenciesMetadata: [],

    executeCallback: null,

    readJson: function() {
      var data = fs.readFileSync(path.resolve(__dirname, 'Currencies.json'), 'utf8');
      return JSON.parse(data);
    },

    removeNamespaces: function(xml){
      var fixedXML = xml.replace(/(<\/?)(\w+:)/g,'$1');
      return (fixedXML.replace(/xmlns(:\w+)?="[^"]*"/g,'')).trim();
    },

    parseXML: function(xml) {
      var self = this;
      var cleanXML = this.removeNamespaces(xml);
      var parser = new xml2js.Parser();

      parser.parseString(cleanXML, function(err,result){
        var currencies = result.Envelope.Cube[0].Cube[0].Cube;
        self.createCurrenciesMap(currencies);
      });

    },

    createCurrenciesMap: function(currencies) {
      var self = this;
      _.each(currencies, function(item) {
         var currency = eval('item.$').currency;
         var rate = eval('item.$').rate;
         self.currenciesMap.push({ currency: currency, rate: rate });
      });
      self.currenciesMap.push({ currency: 'EUR', rate: 1 });
      self.executeCallback();
    },

    getExchangeRates: function() {
      var self = this;
      request(self.settings.url, function(error, response, body) {

        if (!error && response.statusCode == 200) {
          self.parseXML(body);
        }

      });
    },

    roundValues: function (value, places) {
        var multiplier = Math.pow(10, places);
        return (Math.round(value * multiplier) / multiplier);
    },

    fetchRates: function(settings) {
      var self = this;
      var getCurrency = function(currency) {
        return _.find(self.currenciesMap, function(item) {
           return item.currency === currency
        });
      };

      var rates = {};
      rates.fromCurrency = getCurrency(settings.fromCurrency);
      rates.toCurrency = getCurrency(settings.toCurrency);
      rates.exchangeRate = (1 / rates.fromCurrency.rate) * rates.toCurrency.rate;
      return rates;
    },

    getAllCurrencies: function(callback) {
      this.getExchangeRates();
      this.executeCallback = function() {
          callback(this.currenciesMap);
        };
    },

    getBaseCurrency: function(callback) {
      this.executeCallback = function() {
          callback({currency:"EUR"});
        }();
    },

    convert: function(settings, callback) {
      this.getExchangeRates();
      this.executeCallback = function() {
          var exchangedValue = {};

          var rates = this.fetchRates(settings);
          exchangedValue.currency = rates.toCurrency.currency;
          exchangedValue.exchangeRate = this.roundValues(rates.exchangeRate, settings.accuracy | 4);
          exchangedValue.amount = this.roundValues(settings.amount * rates.exchangeRate, settings.accuracy | 4);

          callback(exchangedValue);
        };
    },

    getExchangeRate: function(settings, callback) {
      this.getExchangeRates();
      this.executeCallback = function() {
          var exchangedValue = {};

          var rates = this.fetchRates(settings);
          exchangedValue.toCurrency = rates.toCurrency.currency;
          exchangedValue.fromCurrency = rates.fromCurrency.currency;
          exchangedValue.exchangeRate = this.roundValues(rates.exchangeRate, settings.accuracy | 4);

          callback(exchangedValue);
        };
    },

    getCurrenciesMetadata: function(callback) {
      this.currenciesMetadata = this.readJson();
      callback(this.currenciesMetadata);
    },

    getCurrencyMetadata: function(settings, callback) {
      this.currenciesMetadata = this.readJson();

      var self = this;
      var getCurrency = function(currency) {
        return _.find(self.currenciesMetadata, function(item) {
           return item.Code === currency
        });
      };

      callback(getCurrency(settings.currency));
    }

};
