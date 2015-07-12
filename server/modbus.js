var Future = Meteor.npmRequire('fibers/future');
var bus = Meteor.npmRequire('node-modbus');

// IP and port of the MODBUS slave, default port is 502
var IP1 = process.env.pqubeIP1;
var IP2 = process.env.pqubeIP2;

var client1 = bus.tcp.connect({
	port: '502',
	host: IP1,
	responseTimeout: 1000,
	noDelay: true
});
if (IP2) {
  var client2 = bus.tcp.connect({
    port: '502',
    host: IP2,
    responseTimeout: 1000,
    noDelay: true
  });
}
var freqReq, vectReq;

var procRegisters = function (registers, type, pqube) {
  var decoded = decodeRegisters(registers, type);
  console.log(decoded);
  if (decoded) PQubeData.upsert({_id: 'pqube'+pqube}, {$set: decoded});
};

var makeRequest = function (type, start, num, pqube) {
  var reqFuture = new Future();
  var client = (pqube == 1 ? client1: client2);
  var req = client.request({
    unit: 1,
    func: bus.Functions.READ_INPUT_REGISTERS,
    address: start,
    count: num,
    response: function (err, res) {
      if (err) reqFuture.throw(err);
      else {
	reqFuture.return(res);
      }
    }
  });
  procRegisters(reqFuture.wait(), type, pqube);
};

Meteor.setInterval(function () {
  for (var i=0; i<reqRegisters.length; i++) {
    var j = reqRegisters[i];
    try {
      makeRequest(j.type, j.start, j.num, 1);
      if (IP2)
	makeRequest(j.type, j.start, j.num, 2);
    }
    catch (err) {
      console.log(err);
    }
  }
}, 1500);





