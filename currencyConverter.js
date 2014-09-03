var xml2js = require('xml2js');
var request = require('request');
var _ = require('underscore');

module.exports = {

    settings: {
      url: "http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml"
    },

    baseCurrency: "EUR",

    currenciesMap: [],

    executeCallback: null,

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

          var self = this;
          var getCurrency = function(currency) {
            return _.find(self.currenciesMap, function(item) {
               return item.currency === currency
            });
          };

          var fromCurrency = getCurrency(settings.fromCurrency);
          var toCurrency = getCurrency(settings.toCurrency);
          var exchangeRate = (1 / fromCurrency.rate) * toCurrency.rate;

          var exchangedValue = {};
          exchangedValue.currency = toCurrency.currency;
          exchangedValue.exchangeRate = this.roundValues(exchangeRate, settings.accuracy | 4);
          exchangedValue.amount = this.roundValues(settings.amount * exchangeRate, settings.accuracy | 4);

          callback(exchangedValue);
        };
    }

};
