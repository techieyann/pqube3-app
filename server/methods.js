
Meteor.methods({
  'grantAccess': function (accessTest) {
    var accessType = 'none';
    var userId = Meteor.userId();
    if (accessTest.orgId == 'admin') {
      if (accessTest.code == process.env.accessCode) {
        Roles.addUsersToRoles(userId, 'admin', Roles.GLOBAL_GROUP);        
        accessGranted = 'admin';
      }
    }
    else {
      var org = Orgs.findOne(accessTest.orgId);
      if (org) {
        if (accessTest.code == org.accessCode) {
          var groups = Roles.getGroupsForUser(userId, 'manage');
          if (groups.length) {
            Roles.addUsersToRoles(userId, 'view', org._id);
            accessType = 'view';            
          }
          else {
            Roles.addUsersToRoles(userId, 'manage', org._id);
            accessType = 'manage';
          }
        }
        else if (org.visibility == 'private') {
          if (accessTest.code == org.viewCode) {
            Roles.addUsersToRoles(userId, 'view', org._id);
            accessType = 'view';
          }
        }
      }
    }
    if (accessType == 'manage' || accessType == 'admin') {
      Meteor.users.update(userId, {$set: {'profile.initialized': true}});
    }
    return accessType;
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
