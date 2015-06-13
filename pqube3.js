Freq = new Meteor.Collection('freq');

if (Meteor.isClient) {
  Meteor.subscribe('freq');
  var freqGauge;

  Template.meta.events({
    'click #open-setup': function (e) {
      e.preventDefault();
      $('#setup-modal').removeClass('hidden');
    }
  });
  Template.meta.helpers({
    lightStatus: function () {
      return (Session.equals('light_on', true) ? 'on':'off');
    }
  });

  Template.setup.events({
    'click #close-setup': function (e) {
      e.preventDefault();
      $('#setup-modal').addClass('hidden');
    }
  });

  Template.language.events({
    'change #language-select': function (e) {
      var lang = $(e.target).val();
      TAPi18n.setLanguage(lang)
        .done(function () {
        })
        .fail(function (err) {
          console.log(err);
        });
    }
  });
  Template.language.helpers({
    currentLanguage: function (lang) {
      return (lang == TAPi18n.getLanguage() ? 'selected' : '');
    }
  });
  
  Template.gauge.rendered = function () {
    $('#freq-display').sevenSeg({
      digits: 6,
      colorOff: "#004200", 
      colorOn: "#00aa00",
      colorBackground: "#013500",
      slant: 3
    });

    var self = this;

    self.gauge = new TunguskaGauge({
      id: 'tunguska-gauge',
      range: {
	min: 59.9,
	lowStop: 59.89,
	max: 60.1,
	highStop: 60.11,
	sweep: 240,
	startAngle: -120
      },
      foreground: {
	image: 'meter_front.png',
	left: -99,
	top: -96
      },
      digital: {
	font: '18px sans serif',
	color: '#333',
        top:57,
        left:0,
        callback: function (pV) {
          return 'Hz';
        }
      },
      tick: {
	minor: {
	  alpha: 0
	},
	major: {
	  lineWidth: 0,
	  startAt: 1,
	  endAt: 1,
	  interval: .02,
	  legend: {
	    color: '#555',
	    callback: function (n) {
	      return  n.toFixed(2);
	    },
	    font: '7px sans serif',
	    radius: .7

	  },
	  first: 59.9,
	  last: 60.101
	}
      }
    });
    self.gauge.theme.pointer.dynamics = {
      easing: 'easeOutQuint',
      duration: 500
    };
    self.gauge.set(59.89);
    freqGauge = self.gauge;
  };
  Template.gauge.helpers({
    frequency: function () {
      var data = Freq.findOne();
      if (data) {
	var freq = data.freq.toFixed(4);
	$('#freq-display').sevenSeg({value: freq});
	freqGauge.set(freq);
        Session.set('light_on', true);
        Meteor.setTimeout(function () {
          Session.set('light_on', false);
        }, 200);
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('freq', function () {
    return Freq.find();
  });
  var bus = Meteor.npmRequire('modbus-stack');
  var DecoderRing = Meteor.npmRequire('decoder-ring');
  var decoderRing = new DecoderRing();
  
  var RIR = bus.FUNCTION_CODES.READ_INPUT_REGISTERS;

  // IP and port of the MODBUS slave, default port is 502
  var IP = process.env.pqubeIP;
  var client = Meteor.npmRequire('modbus-stack/client').createClient(502, IP);
  Meteor.setInterval(function () {
    // 'req' is an instance of the low-level `ModbusRequestStack` class
    var req = client.request(RIR, // Function Code: 4
			     9020,    // Start at address 9020
			     2);  // Read 2 contiguous registers from 9020;

    var reqAsync = Meteor.wrapAsync(req.on, req);

    reqAsync('response', function(registers) {
      var freq = calcFreq(registers);
      Freq.upsert({_id: 'frequency'}, {$set: freq});
    });
  }, 501);



  var calcFreq = function(registers) {
    var octets = registersToOctets(registers);
    var buff = new Buffer(octets);
    return decoderRing.decode(buff, 
			      {
				bigEndian: true,
				fields: [
				  {name: 'freq', start:0, type:'float'}
				]
			      });
  };

  var registersToOctets = function (registers) {
    registers.splice(2,2);
    var octets = [];
    for (var i=0;i<2;i++) {
      octets.push(registers[i]>>8);
      octets.push(registers[i]>>0 & 0xff);
    }
    return octets;
  };


  Meteor.startup(function () {
    // code to run on server at startup
  });
}
