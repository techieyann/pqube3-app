var pqubes = [];
Meteor.startup(function () {
  var Future = Meteor.npmRequire('fibers/future');
  var net = Meteor.npmRequire('net');
  var modbus = Meteor.npmRequire('h5.modbus');

  // IP and port of the MODBUS slave, default port is 502
  var pqube1Env = process.env.pqubeIP1;
  var pqube2Env = process.env.pqubeIP2;
  
  var pqubeOptions = {
    transport: {
      type: 'ip',
      connection: {
        type: 'tcp',
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

  if (pqube1Env) {
    var socket1 = new net.Socket();
    var pqube1EnvArray = pqube1Env.split(':');
    var IP1 = pqube1EnvArray[0];
    console.log(pqube1EnvArray);
    var pqube1Port = (pqube1EnvArray[1] ? parseInt(pqube1EnvArray[1]) : 502);
    pqubes[1] = {
      master: modbus.createMaster({
        transport: {
          type: 'ip',
          connection: {
            type: 'tcp',
            host: IP1,
            port: pqube1Port,
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
      }),
      reqs: []
    };
    pqubes[1].master.on('error', function (err) {
      console.log('pqube 1 '+err.message);
    });
    var pqube1Sync = Meteor.wrapAsync(pqubes[1].master.once, pqubes[1].master);
    pqube1Sync('connected', function () {
      console.log('connected to pqube1');
      for (var i=0; i<reqRegisters.length; i++) {
          initRequest(reqRegisters[i], 1);
      }
    });
    pqube1Sync('disconnected', function () {
      console.log('disconnected from pqube1');
      for (var i=0; i<pqubes[1].reqs.length; i++) {
        pqubes[1].reqs[i].cancel();
      }
      pqubes[1].reqs = [];
    });
  }


  if (pqube2Env) {
    var socket2 = new net.Socket();
    var pqube2EnvArray = pqube2Env.split(':');
    var IP2 = pqube2EnvArray[0];
    var pqube2Port = (pqube2EnvArray[1] ? parseInt(pqube2EnvArray[1]) : 502);
    console.log(pqube2EnvArray);
    pqubes[2] = {
      master: modbus.createMaster({
        transport: {
          type: 'ip',
          connection: {
            type: 'tcp',
            host: IP2,
            port: pqube2Port,
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
      }),
      reqs: []
    };
    pqubes[2].master.on('error', function (err) {
      console.log('pqube 2 '+err.message);
    });
    var pqube2Sync = Meteor.wrapAsync(pqubes[2].master.once, pqubes[2].master);
    pqube2Sync('connected', function () {
      console.log('connected to pqube2');
      for (var i=0; i<reqRegisters.length; i++) {
        initRequest(reqRegisters[i], 2);
      }
    });
    pqube2Sync('disconnected', function () {
      console.log('disconnected from pqube2');
      for (var i=0; i<pqubes[2].reqs.length; i++) {
        pqubes[2].reqs[i].cancel();
      }
      pqubes[2].reqs = [];
    });
  }

process.on('uncaughtException', function (err) {
console.log(err);
process.exit(1);
});
});


var procRegisters = function (registers, reqRegister, pqube) {
  var decoded = decodeRegisters(registers, reqRegister);
  //    console.log(decoded);
  if (decoded) PQubeData.upsert({_id: 'pqube'+pqube}, {$set: decoded});
};

var initRequest = function (reqRegister, pqube) {
  
  var requestComplete = Meteor.bindEnvironment(
    function (err, response) {
      if(!err && response.values) procRegisters(response.values, reqRegister, pqube);
      if (err) console.log(err);
    }
  );
  var pqubeReq = pqubes[pqube].master.readInputRegisters(reqRegister.start, reqRegister.num, {
    maxRetries: 0,
    timeout: 500,
    interval: 500,
    onComplete: requestComplete
  });
  pqubeReq.on('error', function (err) {
    console.log('pqube'+pqube+': '+reqRegister.type+' timeout');
  });
  pqubes[pqube].reqs.push(pqubeReq);
};
