var browser     = require('openurl'); 
var cloudsponge = require('./cloudsponge');

var AUTHENTICATION = {domain_key: 'YRMBHYC3DRPEK3LUSCYK', domain_password: 'zgIER11nFCWMAGM'};

/// Using Callbacks
// cloudsponge.Importer.authorize('gmail', AUTHENTICATION, function(response){
//   console.log("open browser at:", response.contacts.consent_url)
//   browser.open(response.contacts.consent_url);
//   response.events.get(function() {
//     response.contacts.get(function(collection){
//       console.log("OK")
//       // for (var key in collection) {
//       //   if (collection.hasOwnProperty(key)) {
//       //     console.log(collection[key])
//       //   }
//       // }
//     });
//   });
// });



/// Using EventEmitter
var importer = cloudsponge.Importer;
importer.import("gmail", AUTHENTICATION);
importer.on('Initialized', function(consent){
  browser.open(consent.url);
  importer.consent.getEvents(consent.import_id, function(contacts){
    console.log("rtn:::", contacts);
  });
});



/// TODO:Using promises
// var promise_importer = cloudsponge.authorize("gmail", AUTHENTICATION);
// promise_importer.done(function(contact_obj){
//   var collection = contact_obj.getContacts();
// });
