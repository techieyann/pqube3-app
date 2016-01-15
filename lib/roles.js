isAdmin = function () {
  var id = Meteor.userId();
  return Roles.userIsInRole(id, 'admin', Roles.GLOBAL_GROUP);
};
