Meteor.publish('pqubeData', function (pqube, fieldsOpts) {
  return PQubeData.find({_id: pqube}, {fields: fieldsOpts});  
});

Meteor.publish('pqubes', function (orgId) {
  return PQubes.find({status: 'connected', org: orgId},{fields: {'host': 0,'port': 0}});
});

Meteor.publish('pqubesManage', function () {
  var id = this.userId;
  if (id) {
    if (Roles.userIsInRole(id, 'admin', Roles.GLOBAL_GROUP)) {
      return PQubes.find();
    }
    else {
      var groups = Roles.getGroupsForUser(id, 'manage');
      if (groups) {
        return PQubes.find({org: groups[0]});
      }
    }
  }
  return [];
});

Meteor.publish('meters', function () {
  return Meters.find();
});

Meteor.publish('orgs', function () {
  return Orgs.find({},{fields: {'accessCode': 0}});
});
