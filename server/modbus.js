var Future = Meteor.npmRequire('fibers/future');
var bus = Meteor.npmRequire('node-modbus');

// IP and port of the MODBUS slave, default port is 502
var IP = process.env.pqubeIP;

var client = bus.tcp.connect({
	port: '502',
	host: IP,
	responseTimeout: 500,
	noDelay: true
});
var freqReq, vectReq;

var procRegisters = function (registers, type) {
	var decoded = decodeRegisters(registers, type);
	console.log(decoded);
	switch (type) {
		case 'freq':
		if (decoded) {
			Freq.upsert({_id: 'frequency'}, {$set: decoded});
		}
		break;
		case 'vect':

		break;
		default:
		console.log('unknown register type');
	}
};


var makeFreqRequest = function () {
	var freqFuture = new Future();
  var freqReq = client.request({
		unit: 1,
		func: bus.Functions.READ_INPUT_REGISTERS,
		address: 9020,
		count: 2,
		response: function (err, res) {
			if (err) {
				if (err instanceof bus.Errors.TimeoutError) return;
				freqFuture.throw(err);
			}
			else {
				freqFuture.return(res);
			}
		}
	});
	procRegisters(freqFuture.wait(), 'freq');
};

var makeVectRequest = function () {
	var vectFuture = new Future();
  var vectReq = client.request({
		unit: 1,
		func: bus.Functions.READ_INPUT_REGISTERS,
		address: 7098,
		count: 24,
		response: function (err, res) {
			if (err) vectFuture.throw(err);
			else {
				vectFuture.return(res);
			}
		}
	});
	procRegisters(vectFuture.wait(), 'vect');
};

Meteor.setInterval(function () {
	makeFreqRequest();
	makeVectRequest();
}, 501);




