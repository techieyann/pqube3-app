var Future = Meteor.npmRequire('fibers/future');
var bus = Meteor.npmRequire('node-modbus');

// IP and port of the MODBUS slave, default port is 502
var IP = process.env.pqubeIP;

var client = bus.tcp.connect({
	port: '502',
	host: IP,
	responseTimeout: 800,
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
	makeRequest('freq', 9020, 2);
	makeRequest('THD', 7194, 2);
	makeRequest('L1N', 7098, 2);
//	makeRequest('vect', 7098, 24);
}, 1000);




