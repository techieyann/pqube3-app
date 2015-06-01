Freq = new Meteor.Collection('freq');

if (Meteor.isClient) {
	Meteor.subscribe('freq');
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
		frequency: function () {
			var data = Freq.findOne();
			if (data) {
				var freq = Math.round(data.freq*10000)/10000;
				return freq;
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
