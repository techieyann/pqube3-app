Template.statusOrg.onCreated(function () {
  var self = this;
  self.org = new ReactiveVar();
});

Template.statusOrg.onRendered(function () {
  var self = this;
  self.autorun(function () {
    FlowRouter.watchPathChange();
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
    else {
      Meteor.setTimeout(function () {
        FlowRouter.go('/manage');
      },400);
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
  private: function () {
    var self = Template.instance();
    var org = self.org.get();
    if (org)
      return org.visibility == 'private';
  },
  viewCode: function () {
    var self = Template.instance();
    var org = self.org.get();
    if (org)
      return org.viewCode;
  },
  id: function () {
    var self = Template.instance();
    var org = self.org.get();
    if (org)
      return org._id;
  },
  org: function () {
    if (!isAdmin()) {
      return '/org/'+Roles.getGroupsForUser(Meteor.userId(), 'manage')[0];
    }
  }
});

