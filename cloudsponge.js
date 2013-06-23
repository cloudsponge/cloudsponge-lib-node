// Cloudsponge = require('cloudsponge')
// AUTHENTICATION = {key: '23SL5FSJX2ZTZ6JP54VQ', pass: '4U4TbdUWoZnoA6YJ'}
// Cloudsponge.Importer('yahoo', AUTHENTICATION, function(error, data){
//   if(error){
//     // service unknow, failed authentication, etc
//     throw error
//   } else{
//     data.get_contacts(function(error, contacts){
//       // contacts                     
//     });
//   }
// });
exports.Importer = require("./lib/importer");


// cloudsponge = require('./cloudsponge'); AUTHENTICATION = {domain_key: 'RN2UKFNXLW4RTATJHDVU', domain_password: 'qiz6wNmTde0FjI7'}; cloudsponge.Importer('gmail', AUTHENTICATION,function(request){console.log('Callback', request)})
