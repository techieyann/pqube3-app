var DecoderRing = Meteor.npmRequire('decoder-ring');
var decoderRing = new DecoderRing();

decodeRegisters = function (registers, reqRegister) {
  var chartDataFlag = reqRegister.chart;
  var chartDataIndex;
  var buffOpts = {
    bigEndian: true
  };
  if (chartDataFlag) {
    chartDataIndex = reqRegister.index; 
    buffOpts.fields = chartFields(reqRegister.num/2);
  }
  else if (reqRegister.type == 'meter') {
    buffOpts.fields = [{name: reqRegister.field, start:0, type:'float'}];
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
