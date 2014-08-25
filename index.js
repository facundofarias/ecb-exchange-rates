var xml2js = require('xml2js');
var request = require('request');

module.exports = {

    settings: {
      url: "http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml"
    },

    removeNamespaces: function(xml){

      var fixedXML = xml.replace(/(<\/?)(\w+:)/g,'$1');
      return fixedXML.replace(/xmlns(:\w+)?="[^"]*"/g,'');

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
      var currenciesMap = new Array();

      currencies.forEach(function(item) {

        var currency = eval('item.$').currency;
        var rate = eval('item.$').rate;
        console.log(currency, rate);

        currenciesMap.push({ currency: currency, rate: rate });
     });

    },


    getCurrencies: function() {
      var that = this;
      request(this.settings.url, function(error, response, body) {

        if (!error && response.statusCode == 200) {
          that.parseXML(body);
        }

      });
    }

};
