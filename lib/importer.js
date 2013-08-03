var request = require('request'),
qs          = require('querystring');

module.exports = (function() {
  var URL_BASE  = "https://api.cloudsponge.com/",
  BEGIN_PATH    = "begin_import/",
  CONSENT_PATH  = "user_consent/",
  IMPORT_PATH   = "import/",
  APPLET_PATH   = "desktop_applet/",
  EVENTS_PATH   = "events/",
  CONTACTS_PATH = "contacts/",
  SERVICES = {
    'gmail': { auth: 'user_consent' },
    'yahoo': { auth: 'user_consent' },
    'windowslive': { auth: 'user_consent' }
  };

  function Contacts(auth_response){
    // maybe this shuld be private
    this.import_id = auth_response.import_id;
    this.url       = auth_response.url;

    this.get = function(){
      console.log(this.import_id)
    }
  }

  function Importer(){
    this.authorize = function                    (service, auth, callback) {
      var url = "http://localhost:3000/begin_import/user_consent?domain_key="+ auth.domain_key + "&domain_password="+ auth.domain_password+"&service=GMAIL" ;
      request.post({url: url}, function(e, r, body){
        contacts = new Contacts(JSON.parse(body))
        callback(contacts);
      });
    };

    this.beginImport = function() {
      console.log('begin import')
    };
  }
  
  return new Importer();
})();

