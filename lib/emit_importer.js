var request = require('request');
var qs      = require('querystring');
var util    = require('util');
var events  = require('events');

// module.exports = (function(){
// });

var Importer = function(){
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
      
    events.EventEmitter.call(this);

    
    var self    = this;
    this.import = function                    (service, auth) {
      var newImport = {service:service, auth: auth};
      this.auth     = auth;
      this.consent  = new Consent(newImport);
      this.emit('BeginImport', newImport);
    };

    var _authorize = function                    (importer) {
      var auth = importer.auth;
      var url = "http://localhost:3000/begin_import/user_consent?domain_key="+ auth.domain_key + "&domain_password="+ auth.domain_password+"&service=GMAIL" ;
      request.post({url: url}, function(e, r, body){
        var consent = JSON.parse(body);
        self.emit('Initialized', consent);
      });
    };

    this.on('BeginImport', _authorize);
};

var Consent = function(importer){
    events.EventEmitter.call(this);

    this.auth = importer.auth;

    var _get = function(){
      this.url = "http://localhost:3000/events/"+this.import_id+"?domain_key="+ this.auth.domain_key + "&domain_password="+ this.auth.domain_password+"&service=GMAIL" ;

      var self = this;
      request.get({url: this.url}, function(e, r, body){
        var response = JSON.parse(body);
        console.log("get()", response);

          
        if(response && response.events.length == 1 ) {
          this.status     = response.events[0].status;
          this.event_type = response.events[0].event_type;
        }

        if(response && response.events.length == 2 ) {
          this.status     = response.events[1].status;
          this.event_type = response.events[1].event_type;
        }

        if(this.status && (this.status == 'COMPLETED' && this.event_type == 'COMPLETE' )){
          console.log("\nemit Completed\n", self);
          self.emit('Completed');
        } else {
          // Call it til is completed
          self.emit('Completing');
        }
      });
    };

  var _omg = function() {
    console.log("dentro de OMG");
    return "un pingo"  
  };

  this.getEvents = function(import_id){
    this.import_id = import_id;
    console.log("dentro de getEvents");
    this.emit('Completing');
  };
  
  this.on('Completing', _get);
  this.on('Completed',  _omg);
};
  
util.inherits(Importer, events.EventEmitter);
util.inherits(Consent, events.EventEmitter);
module.exports = new Importer();
