var DecoderRing = Meteor.npmRequire('decoder-ring');
var decoderRing = new DecoderRing();

decodeRegisters = function (registers, reqRegister) {
  var chartDataFlag = reqRegister.chart;
  var chartDataIndex;
  var type = reqRegister.type;
  var buffOpts = {
    bigEndian: true
  };
  if (chartDataFlag) {
    chartDataIndex = reqRegister.index; 
    buffOpts.fields = chartFields(reqRegister.num/2);
  }
  else buffOpts.fields = buffArrays[reqRegister.fields];
  var data = decoderRing.decode(registers, buffOpts);
  if (chartDataFlag) {
    var chartData = {};
    chartData[chartDataIndex] = [];
    for (var key in data) {
      chartData[chartDataIndex].push(data[key]);
    }
    return chartData;
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
