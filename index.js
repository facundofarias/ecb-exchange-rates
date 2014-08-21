var xml2js = require('xml2js');
var request = require('request');

module.exports = {

    settings: {
      url: "http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml"
    },

    requestCallback: function(error, response, body) {

      if (!error && response.statusCode == 200) {
        console.log(body) // Print the google web page.
      }

    },

    getCurrencies: function() {
      request(this.settings.url, this.requestCallback);
    }

};
