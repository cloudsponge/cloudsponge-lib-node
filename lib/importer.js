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

  function Contacts(auth, auth_response){
    // this should be private ?
    this.import_id   = auth_response.import_id;
    this.consent_url = auth_response.url;

    this.get = function(){
      // "#{URL_BASE}#{path}#{import_id}?#{authenticated_query}"
      var url = "http://localhost:3000/contacts/"+this.import_id+"?domain_key="+ auth.domain_key + "&domain_password="+ auth.domain_password+"&service=GMAIL" ;
      request.get({url: url}, function(e, r, body){
        console.log(body);
      });
    };
  }

  function Event(auth, auth_response){
    this.import_id   = auth_response.import_id;

    this.get = function(){
      var url = "http://localhost:3000/events/"+this.import_id+"?domain_key="+ auth.domain_key + "&domain_password="+ auth.domain_password+"&service=GMAIL" ;
      request.get({url: url}, function(e, r, body){
        console.log(body);
      });
    }
  }

  function Importer(){
    this.authorize = function                    (service, auth, callback) {
      var url = "http://localhost:3000/begin_import/user_consent?domain_key="+ auth.domain_key + "&domain_password="+ auth.domain_password+"&service=GMAIL" ;
      request.post({url: url}, function(e, r, body){
        contacts = new Contacts(auth, JSON.parse(body))
        events   = new Event(auth, JSON.parse(body))
        callback({contacts: contacts, events: events});
      });
    };

    this.beginImport = function() {
      console.log('begin import')
    };
  }
  
  return new Importer();
})();

