Meteor.methods({
  'checkAccess': function (accessCode) {
    return (accessCode != process.env.accessCode);
  },
  'disconnectPQube': function (id) {
    var pqube = PQubes.findOne(id);
    if (pqube && Meteor.user()) {
      cancelRequests(id);
      pqubeConnections[id].master.transport.connection.close();
    }
  },
  'reconnectPQube': function (id) {
    var pqube = PQubes.findOne(id);
    if (pqube && Meteor.user()) {
      pqubeConnections[id].master.transport.connection.connect();
    }
  }
});
