var Future = Meteor.npmRequire('fibers/future');
var bus = Meteor.npmRequire('node-modbus');

// IP and port of the MODBUS slave, default port is 502
var IP = process.env.pqubeIP;

var client = bus.tcp.connect({
	port: '502',
	host: IP,
	responseTimeout: 1000,
	noDelay: true
});
var freqReq, vectReq;

var procRegisters = function (registers, type) {

  var decoded = decodeRegisters(registers, type);
  console.log(decoded);
  if (decoded) PQubeData.upsert({_id: 'pqube3'}, {$set: decoded});
};

var makeRequest = function (type, start, num) {
  var reqFuture = new Future();
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
  procRegisters(reqFuture.wait(), type);
};

Meteor.setInterval(function () {
  for (var i=0; i<requests.length; i++) {
    var j = requests[i];
    try {
      makeRequest(j.type, j.start, j.num);
    }
    catch (err) {
      console.log(err);
    }
  }
}, 1500);

var requests = [
  {
    type: 'THD',
    start: 7194,
    num: 2
  },
  {
    type: 'freqVVect',
    start: 9020,
    num: 14
  },
  {
    type: 'v1Graph',
    start: 9034,
    num: 64
  },
  {
    type: 'v2Graph',
    start: 9098,
    num: 64
  },
  {
    type: 'v3Graph',
    start: 9162,
    num: 64
  },
  {
    type: 'iVect',
    start: 11016,
    num: 12
  },
  {
    type: 'i1Graph',
    start: 11028,
    num: 64
  },
  {
    type: 'i2Graph',
    start: 11092,
    num: 64
  },
  {
    type: 'i3Graph',
    start: 11156,
    num: 64
  },
  {
    type: 'wPower',
    start: 11832,
    num: 54
  },
  {
    type: 'ambient',
    start: 13822,
    num: 6
  }
];



