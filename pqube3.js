Freq = new Meteor.Collection('freq');

if (Meteor.isClient) {
  Meteor.startup(function () {
		$('#freq-display').sevenSeg({
			digits: 6,
			colorOff: "#003200", 
      colorOn: "Lime",
			slant: 10
		});
  });

	Meteor.subscribe('freq');
  // counter starts at 0
  Session.setDefault('counter', 0);
	var freqGauge;
	
	Template.gauge.rendered = function () {
		console.log('rendered');
		var self = this;
		self.gauge = new TunguskaGauge({
			id: 'freq-gauge',
			theme: 'basic',
			range: {
				min: 59.9,
				max: 60.1,
				sweep: 240,
				startAngle: -120
			},
			background: {
				image: 'meter_face.jpg',
				left: -98,
				top: -98
			},
			digital: {
				font: '0px',
				color: '#fff'
			},
			tick: {
				major: {
					startAt: 1,
					endAt: 1,
					first: 59.9,
					last: 60.1,
					interval: .1,
					
					legend: {
						color: 'black',
						font: '12px sans serif',
						radius: .65
					}
				}
			}
		});
		self.gauge.theme.pointer.dynamics = {
			easing: 'easeOutQuint',
			duration: 250
		};
		self.gauge.set(60);
		freqGauge = self.gauge;
	};
  Template.hello.helpers({
		frequency: function () {
			var data = Freq.findOne();
			if (data) {
				var freq = data.freq.toFixed(4);
				$('#freq-display').sevenSeg({value: freq});
				freqGauge.set(freq);
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
	var spec = {
		bigEndian: true,
		fields: [
			{name: 'freq', start:0, type:'float'}
		]
	};

var calcFreq = function(registers) {
	var octets = registersToOctets(registers);
	var buff = new Buffer(octets);
	return decoderRing.decode(buff, spec);
};

var registersToOctets = function (registers) {
	registers.splice(2,2);
	var octets = [];
	for (var i=0;i<2;i++) {
		octets.push(registers[i]>>8);
		octets.push(registers[i]>>0 & 0xff);
	}
	return octets;
}


  Meteor.startup(function () {
    // code to run on server at startup
  });
}
