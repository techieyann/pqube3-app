var DecoderRing = Meteor.npmRequire('decoder-ring');
var decoderRing = new DecoderRing();

calcFreq = function(registers) {
  var octets = registersToOctets(registers);
  var buff = new Buffer(octets);
	var buffOpts = {
		bigEndian: true,
		fields: [
			{name: 'freq', start:0, type:'float'}
		]
	};
	var freq = decoderRing.decode(buff, buffOpts);
  return freq;
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
