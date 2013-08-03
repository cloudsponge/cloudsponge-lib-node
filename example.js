browser     = require('openurl'); 
cloudsponge = require('./cloudsponge');

AUTHENTICATION = {domain_key: 'RN2UKFNXLW4RTATJHDVU', domain_password: 'qiz6wNmTde0FjI7'};
cloudsponge.Importer.authorize('gmail', AUTHENTICATION, function(resp){
  console.log('response', resp);
  // browser.open(resp.url);
  // res.beginImport();
});
