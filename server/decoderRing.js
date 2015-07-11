var DecoderRing = Meteor.npmRequire('decoder-ring');
var decoderRing = new DecoderRing();


var freqArray = [
	{name: 'freq', start:0, type:'float'}
];

var vectArray = [
	{name: 'vMagL1N', start:0, type:'float'},
	{name: 'vAngL1N', start:4, type:'float'},
	{name: 'vMagL2N', start:8, type:'float'},
	{name: 'vAngL2N', start:12, type:'float'},
	{name: 'vMagL3N', start:16, type:'float'},
	{name: 'vAngL3N', start:20, type:'float'},
	{name: 'iMagL1', start:24, type:'float'},
	{name: 'iAngL1', start:28, type:'float'},
	{name: 'iMagL2', start:32, type:'float'},
	{name: 'iAngL2', start:36, type:'float'},
	{name: 'iMagL3', start:40, type:'float'},
	{name: 'iAngL3', start:44, type:'float'},
];

var THDarray = [
	{name: 'THDL1', start:0, type:'float'}
];

var LNarray = [
	{name: 'vMagL1N', start:0, type:'float'}
];

var freqVectArray = [
  {name: 'freq', start:0, type:'float'},
  {name: 'vMagL1N', start:4, type:'float'},
  {name: 'vAngL1N', start:8, type:'float'},
  {name: 'vMagL2N', start:12, type:'float'},
  {name: 'vAngL2N', start:16, type:'float'},
  {name: 'vMagL3N', start:20, type:'float'},
  {name: 'vAngL3N', start:24, type:'float'}
];

var iVectArray = [
  {name: 'iMagL1N', start:0, type:'float'},
  {name: 'iAngL1N', start:4, type:'float'},
  {name: 'iMagL2N', start:8, type:'float'},
  {name: 'iAngL2N', start:12, type:'float'},
  {name: 'iMagL3N', start:16, type:'float'},
  {name: 'iAngL3N', start:20, type:'float'}
];

var wPowerArray = [
  {name: 'uANeg', start:0, type:'float'},
  {name: 'watts', start:8, type:'float'},
  {name: 'VAR', start:24, type:'float'},
  {name: 'VARh', start:64, type:'float'},
  {name: 'energy', start:88, type:'float'},
  {name: 'VAh', start:104, type:'float'}
];

var ambientArray = [
  {name: 'temp', start:0, type:'float'},
  {name: 'humidity', start:4, type:'float'},
  {name: 'pressure', start:8, type:'float'}
];

var graphArray = [
  {name: 'p0', start:0, type:'float'},
  {name: 'p1', start:4, type:'float'},
  {name: 'p2', start:8, type:'float'},
  {name: 'p3', start:12, type:'float'},
  {name: 'p4', start:16, type:'float'},
  {name: 'p5', start:20, type:'float'},
  {name: 'p6', start:24, type:'float'},
  {name: 'p7', start:28, type:'float'},
  {name: 'p8', start:32, type:'float'},
  {name: 'p9', start:36, type:'float'},
  {name: 'p10', start:40, type:'float'},
  {name: 'p11', start:44, type:'float'},
  {name: 'p12', start:48, type:'float'},
  {name: 'p13', start:52, type:'float'},
  {name: 'p14', start:56, type:'float'},
  {name: 'p15', start:60, type:'float'},
  {name: 'p16', start:64, type:'float'},
  {name: 'p17', start:68, type:'float'},
  {name: 'p18', start:72, type:'float'},
  {name: 'p19', start:76, type:'float'},
  {name: 'p20', start:80, type:'float'},
  {name: 'p21', start:84, type:'float'},
  {name: 'p22', start:88, type:'float'},
  {name: 'p23', start:92, type:'float'},
  {name: 'p24', start:96, type:'float'},
  {name: 'p25', start:100, type:'float'},
  {name: 'p26', start:104, type:'float'},
  {name: 'p27', start:108, type:'float'},
  {name: 'p28', start:112, type:'float'},
  {name: 'p29', start:116, type:'float'},
  {name: 'p30', start:120, type:'float'},
  {name: 'p31', start:124, type:'float'},
];

decodeRegisters = function (registers, type) {
  var graphDataFlag = false;
  var graphDataIndex;
  var buffOpts = {
    bigEndian: true
  };
  var expectedLength;
  if (type.substring(2) == 'Graph') {
    buffOpts.fields = graphArray;
    expectedLength = 64;
    graphDataFlag = true;
  }
  switch(type) {
  case 'freq':
    buffOpts.fields = freqArray;
    expectedLength = 2;
    break;
  case 'THD':
    buffOpts.fields = THDarray;
    expectedLength = 2;
    break;
  case 'vect':
    buffOpts.fields = vectArray;
    expectedLength = 24;
    break;
  case 'freqVVect':
    buffOpts.fields = freqVectArray;
    expectedLength = 14;
    break;
  case 'iVect':
    buffOpts.fields = iVectArray;
    expectedLength = 12;
    break;
  case 'wPower':
    buffOpts.fields = wPowerArray;
    expectedLength = 54;
    break;
  case 'ambient':
    buffOpts.fields = ambientArray;
    expectedLength = 6;
    break;
  case 'v1Graph':
    graphDataIndex = 'vL1NGraph';
    break;
  case 'v2Graph':
    graphDataIndex = 'vL2NGraph';
    break;
  case 'v3Graph':
    graphDataIndex = 'vL3NGraph';
    break;
  case 'i1Graph':
    graphDataIndex = 'iL1NGraph';
    break;
  case 'i2Graph':
    graphDataIndex = 'iL2NGraph';
    break;
  case 'i3Graph':
    graphDataIndex = 'iL3NGraph';
    break;
  default:
    return;
  }

  
  if (registers.length != expectedLength) {
    console.log('error, unexpected num registers');
    console.log(expectedLength);
    console.log(registers);
    return;
  }

  var octets = registersToOctets(registers);
  var buff = new Buffer(octets);
  var data = decoderRing.decode(buff, buffOpts);
  if (graphDataFlag) {
    var graphData = {};
    graphData[graphDataIndex] = [];
    for (var key in data) {
      graphData[graphDataIndex].push(data[key]);
    }
    return graphData;
  }
  return data;
};



var registersToOctets = function (registers) {
  var octets = [];
  for (var i=0;i<registers.length;i++) {
    octets.push(registers[i]>>8);
    octets.push(registers[i]>>0 & 0xff);
  }
  return octets;
};
