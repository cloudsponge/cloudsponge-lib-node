cloudsponge-lib-node
====================

cloudsponge-lib-node

Attention: This is a work in progress.
====================

AUTHENTICATION values and mail source (ie. 'gmail') are now hardcoded. You will need to put your correct values on lib/emit_importer.js
```
var cloudsponge    = require('./cloudsponge');
var AUTHENTICATION = {domain_key: 'YRMBHYC3DRPEK3LUSCYK', domain_password: 'zgIER11nFCWMAGM'};
var importer       = cloudsponge.Importer;

importer.import("gmail", AUTHENTICATION);
importer.on('Initialized', function(consent){
  console.log('open browser at:', consent.url);
  importer.consent.getEvents(consent.import_id, function(contacts){
    console.log("rtn:::", contacts);
  });
});

```
