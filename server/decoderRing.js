var DecoderRing = Meteor.npmRequire('decoder-ring');



var freqArray = [
	{name: 'freq', start:0, type:'float'}
];
var vectArray = [
	{name: 'vMagL1-N', start:0, type:'float'},
	{name: 'vAngL1-N', start:4, type:'float'},
	{name: 'vMagL2-N', start:8, type:'float'},
	{name: 'vAngL2-N', start:12, type:'float'},
	{name: 'vMagL3-N', start:16, type:'float'},
	{name: 'vAngL3-N', start:20, type:'float'},
	{name: 'iMagL1', start:24, type:'float'},
	{name: 'iAngL1', start:28, type:'float'},
	{name: 'iMagL2', start:32, type:'float'},
	{name: 'iAngL2', start:36, type:'float'},
	{name: 'iMagL3', start:40, type:'float'},
	{name: 'iAngL3', start:44, type:'float'},
];

decodeRegisters = function (registers, type) {
	var buffOpts = {
		bigEndian: true
	};
	var expectedLength;
	switch(type) {
		case 'freq':
		buffOpts.fields = freqArray;
		expectedLength = 2;
		break;
		case 'vect':
		buffOpts.fields = vectArray;
		expectedLength = 24;
		break;
		default:
		return;
	}	

	if (registers.length != expectedLength) {
		console.log('error, unexpected num registers');
		console.log(expectedLength);
		console.log(registers);
		return '';
	}

	var octets = registersToOctets(registers);
	var buff = new Buffer(octets);
	var decoderRing = new DecoderRing();
	var data = decoderRing.decode(buff, buffOpts);
	return data;
};



var registersToOctets = function (registers) {
//	delete registers.byteLength;
//	delete registers.functionCode;
  var octets = [];
  for (var i=0;i<registers.length;i++) {
    octets.push(registers[i]>>8);
    octets.push(registers[i]>>0 & 0xff);
  }
  return octets;
};
