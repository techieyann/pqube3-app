Template.statusOrg.onCreated(function () {
  var self = this;
  self.org = new ReactiveVar();
});

Template.statusOrg.onRendered(function () {
  var self = this;
  self.autorun(function () {
    var orgId;
    var userId = Meteor.userId();
    if (Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)) {
      orgId = FlowRouter.current().params.orgId;
    }
    else {
      orgId = Roles.getGroupsForUser(userId, 'manage')[0]; 
    }
    var org = Orgs.findOne(orgId);
    if (org) {
      self.org.set(org);
      self.data = org;
    }
  });
});

Template.statusOrg.helpers({
  name: function () {
    var self = Template.instance();
    var org = self.org.get();
    if (org)
      return org.name;
  },
  slug: function () {
    var self = Template.instance();
    var org = self.org.get();
    if (org)
      return org.slug;
  },
  id: function () {
    var self = Template.instance();
    var org = self.org.get();
    if (org)
      return org._id;
  },
  org: function () {
    if (!isAdmin()) {
      return '/org/'+Roles.getGroupsForUser(Meteor.userId())[0];
    }
  }
});

