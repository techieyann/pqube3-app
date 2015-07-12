var DecoderRing = Meteor.npmRequire('decoder-ring');
var decoderRing = new DecoderRing();

decodeRegisters = function (registers, type) {
  var graphDataFlag = false;
  var graphDataIndex;
  var buffOpts = {
    bigEndian: true
  };
  var expectedLength;
  if (type.substring(2) == 'Graph') {
    buffOpts.fields = buffArrays.graphArray;
    expectedLength = 64;
    graphDataFlag = true;
  }
  switch(type) {
  case 'freq':
    buffOpts.fields = buffArrays.freqArray;
    expectedLength = 2;
    break;
  case 'THD':
    buffOpts.fields = buffArrays.THDarray;
    expectedLength = 2;
    break;
  case 'vect':
    buffOpts.fields = buffArrays.vectArray;
    expectedLength = 24;
    break;
  case 'freqVVect':
    buffOpts.fields = buffArrays.freqVectArray;
    expectedLength = 14;
    break;
  case 'iVect':
    buffOpts.fields = buffArrays.iVectArray;
    expectedLength = 12;
    break;
  case 'wPower':
    buffOpts.fields = buffArrays.wPowerArray;
    expectedLength = 54;
    break;
  case 'ambient':
    buffOpts.fields = buffArrays.ambientArray;
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
