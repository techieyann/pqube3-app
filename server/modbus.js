var bus = Meteor.npmRequire('modbus-stack');  
var RIR = bus.FUNCTION_CODES.READ_INPUT_REGISTERS;

// IP and port of the MODBUS slave, default port is 502
var IP = process.env.pqubeIP;
var client = Meteor.npmRequire('modbus-stack/client').createClient(502, IP);
Meteor.setInterval(function () {
  // 'req' is an instance of the low-level `ModbusRequestStack` class
  var req = client.request(RIR, // Function Code: 4
													 9020,    // Start at address 9020
													 2);  // Read 2 contiguous registers from 9020;

  var reqAsync = Meteor.wrapAsync(req.on, req);

  reqAsync('response', function(registers) {
    var freq = calcFreq(registers);
    Freq.upsert({_id: 'frequency'}, {$set: freq});
  });
}, 501);
