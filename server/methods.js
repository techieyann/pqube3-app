Meteor.methods({
  'checkAccess': function (accessTest) {
    if (accessTest.orgId == 'admin')
      return (accessTest.code != process.env.accessCode);
    else {
      var org = Orgs.findOne(accessTest.orgId);
      if (org) {
        return accessTest.code != org.accessCode;
      }
      return true;
    }
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
