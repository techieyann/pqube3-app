var net = Meteor.npmRequire('net');
var modbus = Meteor.npmRequire('h5.modbus');
pqubeConnections = {};

observePQubes = function () {
  var pqubes = PQubes.find();
  pqubes.observe({
    added: function (pqube) {
      connectToPQube(pqube);
    },
    changed: function (pqube, oldPQube) {
      if (pqube.ip != oldPQube.ip || pqube.port != oldPQube.port) {
	cancelRequests(oldPQube._id);
	delete pqubeConnections[oldPQube._id];	
	connectToPQube(pqube);
      }
    },
    removed: function (id) {
      cancelRequests(id);
      delete pqubeConnections[id];
      PQubeData.remove(id);
    }
  });
};

var connectToPQube = function (pqube) {  
  var socket = new net.Socket();
  var master = modbus.createMaster({
    transport: {
      type: 'ip',
      connection: {
        type: 'tcp',
        host: pqube.ip,
        port: parseInt(pqube.port),
        socket: socket,
        autoConnect: true,
        autoReconnect: true,
        minConnectTime: 2500,
        maxReconnectTime: 360000
      }
    },
    suppressTransactionErrors: false,
    retryOnException: false,
    maxConcurrentRequests: 25,
    defaultUnit: 0,
    defaultMaxRetries: 3,
    defaultTimeout: 100
  });
  var async = Meteor.wrapAsync(master.on, master);
  var reqs = [];
  master.on('error', function (err) {
    console.log(pqube.name+'(error): '+err.message);
  });
  async('connected', function () {
    console.log('connected to a pqube');
    PQubes.update({_id: pqube._id}, {$set: {status: 'connected'}});
    initRequests(pqube._id);
  });
  async('disconnected', function () {
    if (PQubes.find({_id: pqube._id}).status != 'unverified')
      PQubes.update({_id: pqube._id}, {$set: {status: 'disconnected'}});
    cancelRequests(pqube._id);
  });    
  pqubeConnections[pqube._id] = {
    master: master,
    async: async,
    reqs: []
  };
};

initRequests = function (id) {
  for (var i=0; i<reqRegisters.length; i++) {
    initRequest(reqRegisters[i], id);
  }
};
cancelRequests = function (id) {
  if (pqubeConnections[id]) {
    var reqs = pqubeConnections[id].reqs;
    for (var i=0; i<reqs.length; i++) {
      reqs[i].cancel();
    }
    pqubeConnections[id].reqs = [];
  }
};

var procRegisters = function (registers, reqRegister, pqube) {
  var decoded = decodeRegisters(registers, reqRegister);
  //    console.log(decoded);
  if (decoded) PQubeData.upsert(pqube, {$set: decoded});
};

var initRequest = function (reqRegister, pqube) {
  
  var requestComplete = Meteor.bindEnvironment(
    function (err, response) {
      if(!err && response.values) procRegisters(response.values, reqRegister, pqube);
      if (err) console.log(err);
    }
  );
  var pqubeReq = pqubeConnections[pqube].master.readInputRegisters(reqRegister.start, reqRegister.num, {
    maxRetries: 0,
    timeout: 500,
    interval: 500,
    onComplete: requestComplete
  });
  pqubeReq.on('error', function (err) {
    console.log('pqube '+pqube+': '+reqRegister.type+' timeout');
  });
  pqubeConnections[pqube].reqs.push(pqubeReq);
};
