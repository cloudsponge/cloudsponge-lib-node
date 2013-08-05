browser     = require('openurl'); 
cloudsponge = require('./cloudsponge');

AUTHENTICATION = {domain_key: 'RN2UKFNXLW4RTATJHDVU', domain_password: 'qiz6wNmTde0FjI7'};
cloudsponge.Importer.authorize('gmail', AUTHENTICATION, function(response){
  browser.open(response.contacts.consent_url);
  response.events.get(function() { console.log("hola") });
});
