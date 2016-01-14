Template.statusOrg.onCreated(function () {
  var self = this;
  self.org = new ReactiveVar();
});

Template.statusOrg.onRendered(function () {
  var self = this;
  self.autorun(function () {
    var orgId = FlowRouter.current().params.orgId;
    var org = Orgs.findOne(orgId);
    if (org) {
      self.org.set(org);
      self.data = org;
    }
  });
});

Template.statusOrg.helpers({
  'admin': function () {
    return true;
  },
  'name': function () {
    var self = Template.instance();
    var org = self.org.get();
    if (org)
      return org.name;
  },
  'slug': function () {
    var self = Template.instance();
    var org = self.org.get();
    if (org)
      return org.slug;
  },
  'id': function () {
    var self = Template.instance();
    var org = self.org.get();
    if (org)
      return org._id;
  }
});

