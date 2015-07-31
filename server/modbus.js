Meteor.startup(function () {
  var Future = Meteor.npmRequire('fibers/future');
  var net = Meteor.npmRequire('net');
  var modbus = Meteor.npmRequire('h5.modbus');

  // IP and port of the MODBUS slave, default port is 502
  var IP1 = process.env.pqubeIP1;
  var IP2 = process.env.pqubeIP2;

  var pqubeOptions = {
    transport: {
      type: 'ip',
      connection: {
        type: 'tcp',
        port: 502,
        autoConnect: true,
        autoReconnect: true,
        minConnectTime: 2500,
        maxReconnectTime: 5000
      }
    },
    suppressTransactionErrors: false,
    retryOnException: true,
    maxConcurrentRequests: 1,
    defaultUnit: 0,
    defaultMaxRetries: 3,
    defaultTimeout: 100
  };
  var pqubes = [];
  if (IP1) {
    var socket1 = new net.Socket();
    pqubes[1] = modbus.createMaster({
      transport: {
        type: 'ip',
        connection: {
          type: 'tcp',
          host: IP1,
          port: 502,
          socket: socket1,
          autoConnect: true,
          autoReconnect: true,
          minConnectTime: 2500,
          maxReconnectTime: 5000
        }
      },
      suppressTransactionErrors: false,
      retryOnException: true,
      maxConcurrentRequests: 1,
      defaultUnit: 0,
      defaultMaxRetries: 3,
      defaultTimeout: 100
    });
    pqubes[1].on('error', function (err) {
      console.log(err.message);
    });
    var pqube1Sync = Meteor.wrapAsync(pqubes[1].once, pqubes[1]);
    pqube1Sync('connected', function () {
      Meteor.setInterval(function () {
        for (var i=0; i<reqRegisters.length; i++) {
          initRequest(reqRegisters[i], 1);
        }
      }, 500);
    });
  }


  if (IP2) {
    var socket2 = new net.Socket();
    pqubes[2] = modbus.createMaster({
      transport: {
        type: 'ip',
        connection: {
          type: 'tcp',
          host: IP2,
          port: 502,
          socket: socket2,
          autoConnect: true,
          autoReconnect: true,
          minConnectTime: 2500,
          maxReconnectTime: 5000
        }
      },
      suppressTransactionErrors: false,
      retryOnException: true,
      maxConcurrentRequests: 1,
      defaultUnit: 0,
      defaultMaxRetries: 3,
      defaultTimeout: 100
    });
    var pqube2Sync = Meteor.wrapAsync(pqubes[2].once, pqubes[2]);
    pqube2Sync('connected', function () {
      Meteor.setInterval(function () {
        for (var i=0; i<reqRegisters.length; i++) {
          initRequest(reqRegisters[i], 2);
        }
      }, 500);
    });
  }

  var procRegisters = function (registers, type, pqube) {
    var decoded = decodeRegisters(registers, type);
    console.log(decoded);
    if (decoded) PQubeData.upsert({_id: 'pqube'+pqube}, {$set: decoded});
  };
  var initRequest = function (reqRegister, pqube) {
    var reqFuture = new Future();
    var pqubeReq = pqubes[pqube].readInputRegisters(reqRegister.start, reqRegister.num, {
      maxRetries: 0,
      timeout: 1000,
      interval: -1,
      onComplete: function (err, response) {
        if (err) reqFuture.throw(err.message);
        else if(response.values) reqFuture.return(response.values);
      }
    });
    pqubeReq.on('error', function (err) {
      console.log(err.message);
    });
    procRegisters(reqFuture.wait(), reqRegister.type, pqube);
  };
});





