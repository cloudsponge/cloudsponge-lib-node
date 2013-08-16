browser     = require('openurl'); 
cloudsponge = require('./cloudsponge');

AUTHENTICATION = {domain_key: 'YRMBHYC3DRPEK3LUSCYK', domain_password: 'zgIER11nFCWMAGM'};

cloudsponge.Importer.authorize('gmail', AUTHENTICATION, function(response){
  console.log("open browser at:", response.contacts.consent_url)

  browser.open(response.contacts.consent_url);
  response.events.get(function() {
    response.contacts.get(function(collection){
      for (var key in collection) {
        if (collection.hasOwnProperty(key)) {
          console.log(collection[key])
        }
      }
    });
  });
});
