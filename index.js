var xml2js = require('xml2js');
var request = require('request');

module.exports = {

    settings: {
      url: "http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml"
    },

    removeNamespaces: function(obj){
        var r={};
        for(var k in obj){
            r[k.replace(/:/g,'$')] = (typeof obj[k]==='object') ? this.removeNamespaces(obj[k]) : obj[k];
        }
        return r;
    },

    parseXML: function(xml) {
      var that = this;

      var parser = new xml2js.Parser();
      parser.parseString(xml, function(err,result){
        var currencies = result['gesmes:Envelope'].Cube[0].Cube[0].Cube;
        var timestamp = result['gesmes:Envelope'].Cube[0].Cube[0].time;
        that.createCurrenciesMap(currencies);
      });
    },

    createCurrenciesMap: function(currencies) {
      console.log(JSON.stringify(this.removeNamespaces(currencies)));
      var curatedCurrencies = new Array();
        currencies.forEach(function(item) {
          //curatedCurrencies.push({ item.$.currency, item.$.rate });
       });
       console.log(JSON.stringify(curatedCurrencies));
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
