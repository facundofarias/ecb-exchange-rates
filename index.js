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
      var that = this;
      var cleanXML = this.removeNamespaces(xml);
      var parser = new xml2js.Parser();

      parser.parseString(cleanXML, function(err,result){
        var currencies = result.Envelope.Cube[0].Cube[0].Cube;
        that.createCurrenciesMap(currencies);
      });

    },

    createCurrenciesMap: function(currencies) {
      var that = this;
      _.each(currencies, function(item) {
         var currency = eval('item.$').currency;
         var rate = eval('item.$').rate;
         that.currenciesMap.push({ currency: currency, rate: rate });
      });

      this.executeCallback();
    },

    getExchangeRates: function() {
      var that = this;
      request(this.settings.url, function(error, response, body) {

        if (!error && response.statusCode == 200) {
          that.parseXML(body);
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

    exchangeToEUR: function(value, callback) {
      this.getExchangeRates();
      this.executeCallback = function() {

          var currency = _.find(this.currenciesMap, function(item) {
             return item.currency === value.currency
          });

          var exchangedValue = {};
          exchangedValue.currency = this.baseCurrency;
          exchangedValue.value = this.roundValues(value.amount / currency.rate, 4);

          callback(exchangedValue);
        };
    }

};
