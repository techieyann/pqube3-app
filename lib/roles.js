isAdmin = function () {
  return Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP);
};

hasPermission = function (orgId) {
  if (isAdmin()) return true;
  return Roles.userIsInRole(Meteor.userId(), 'manage', orgId);
};
