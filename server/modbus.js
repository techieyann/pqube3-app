var net = Meteor.npmRequire('net');
var modbus = Meteor.npmRequire('h5.modbus');
pqubeConnections = {};

observePQubes = function () {
  var pqubes = PQubes.find();
  pqubes.observe({
    added: function (pqube) {
      if (pqube.host && pqube.port)
        connectToPQube(pqube);
    },
    changed: function (pqube, oldPQube) {
      if (pqube.host != oldPQube.host || pqube.port != oldPQube.port) {
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
  Meteor.setInterval(function () {
    var now = new Date();
    var dcIds = [];
    for (var id in pqubeConnections) {
      if (now - pqubeConnections[id].lastDataReceivedAt > 10000) {
        var pqube = PQubes.findOne(id);
        if (pqube) {
          if (pqube.status == 'connected') {
            Meteor.setTimeout(function () {
              cancelRequests(id);
	      pqubeConnections[id].master.transport.connection.close();
              PQubes.update({_id: id, status: {$nin: ['unknown','unverified']}}, {$set: {status: 'disconnected'}});
              delete pqubeConnections[id];
              connectToPQube(pqube);      
            }, 0);
          }
        }
        else {
          delete pqubeConnections[id];
        }
      }
    }
  }, 10000);

};

var connectToPQube = function (pqube) {  
  var socket = new net.Socket();
  var master = modbus.createMaster({
    transport: {
      type: 'ip',
      connection: {
        type: 'tcp',
        host: pqube.host,
        port: parseInt(pqube.port),
        socket: socket,
        autoConnect: true,
        autoReconnect: true,
        minConnectTime: 5000,
        maxReconnectTime: 5000
      }
    },
    suppressTransactionErrors: false,
    retryOnException: false,
    maxConcurrentRequests: 25,
    defaultUnit: 0,
    defaultMaxRetries: 0,
    defaultTimeout: 500
  });
  var asyncMaster = Meteor.wrapAsync(master.on, master);
  var reqs = [];
  var intervalId = Meteor.setInterval(function () {
    master.transport.connection.connect();
  }, 30000);
  pqubeConnections[pqube._id] = {
    master: master,
    async: asyncMaster,
    connectInterval: intervalId, 
    reqs: [],
    lastDataReceivedAt: new Date()
  };
  master.on('error', function (err) {
    console.log(pqube.name+'(error): '+err.message);
  });
  asyncMaster('connected', function () {
    console.log('connected to pqube '+pqube.name);
    PQubes.update({_id: pqube._id}, {$set: {status: 'unverified'}});
    verifyPQube(pqube._id);
  });
  asyncMaster('disconnected', function () {
    console.log('diconnected from pqube '+pqube.name);    
    cancelRequests(pqube._id);
    PQubes.update({_id: pqube._id, status: {$nin: ['unverified', 'unknown']}}, {$set: {status: 'disconnected'}});
  }); 
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

  if (decoded) {
    pqubeConnections[pqube].lastDataReceivedAt = new Date();
    PQubeData.upsert(pqube, {$set: decoded});
  }
};

var initRequest = function (reqRegister, pqube) {
  
  var requestComplete = Meteor.bindEnvironment(
    function (err, response) {
      if(!err && response.values) procRegisters(response.values, reqRegister, pqube);
    }
  );
  var pqubeReq = pqubeConnections[pqube].master.readInputRegisters(reqRegister.start, reqRegister.num, {
    maxRetries: 0,
    timeout: 500,
    interval: 500,
    onComplete: requestComplete
  });
  pqubeReq.on('error', function (err) {
//    console.log(pqube+':'+reqRegister.type+' error: '+err);
  });
  pqubeConnections[pqube].reqs.push(pqubeReq);
};

var verifyPQube = function (pqube) {
  var now = new Date();
  var year = now.getFullYear();
  var req = {
    type: 'year',
    start: 13892,
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
	          Meteor.clearInterval(pqubeConnections[pqube].connectInterval);
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
