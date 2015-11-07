var net = Meteor.npmRequire('net');
var modbus = Meteor.npmRequire('h5.modbus');
pqubeConnections = {};

observePQubes = function () {
  var pqubes = PQubes.find();
  pqubes.observe({
    added: function (pqube) {
      if (pqube.ip && pqube.port)
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
        minConnectTime: 5000,
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
    console.log('connected to pqube '+pqube.name);
    if (pqube.status == 'unverified') {
      verifyPQube(pqube._id);
    }
    else {
      PQubes.update({_id: pqube._id}, {$set: {status: 'connected'}});
      initRequests(pqube._id);
    }
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
    if (reqRegisters[i].type != 'verification') 
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

var verifyPQube = function (pqube) {
  var now = new Date();
  var year = now.getFullYear();
  var req = {
    type: 'year',
    start: 11910,
    num: 2,
    fields: 'verification',
    chart: false
  };
  var requestComplete = Meteor.bindEnvironment(
    function (err, response) {
      if(!err && response.values) {
        var decoded = decodeRegisters(response.values, req);
        if (decoded) {
          if (decoded.year == year) {
            PQubes.update(pqube, {$set: {status: 'connected'}});
            initRequests(pqube);
          }
        }
      }
      if (err) console.log(err);
    }
  );
  var pqubeReq = pqubeConnections[pqube].master.readInputRegisters(req.start, req.num, {
    maxRetries: 1,
    timeout: 500,
    interval: -1,
    onComplete: requestComplete
  });
  pqubeReq.on('error', function (err) {
    console.log('pqube verification error: '+err);
  });  


};
