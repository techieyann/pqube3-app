
Meteor.methods({
  'grantAccess': function (accessTest) {
    var accessGranted = false;
    var userId = Meteor.userId();
    if (accessTest.orgId == 'admin') {
      if (accessTest.code == process.env.accessCode) {
        Roles.addUsersToRoles(userId, 'admin', Roles.GLOBAL_GROUP);        
        accessGranted = true;
      }
    }
    else {
      var org = Orgs.findOne(accessTest.orgId);
      if (org) {
        if (accessTest.code == org.accessCode) {
          Roles.addUsersToRoles(userId, 'manage', org._id);
          accessGranted = true;
        }
      }
    }
    if (accessGranted) {
      Meteor.users.update(userId, {$set: {'profile.initialized': true}});
    }
    return accessGranted;
  },
  'disconnectPQube': function (id) {
    var pqube = PQubes.findOne(id);
    if (pqube) {
      if (hasPermission(pqube.org)) {
        cancelRequests(id);
        pqubeConnections[id].master.transport.connection.close();
      }
    }
  },
  'reconnectPQube': function (id) {
    var pqube = PQubes.findOne(id);
    if (pqube) {
      if (hasPermission(pqube.org)) 
        pqubeConnections[id].master.transport.connection.connect();
    }
  }
});
