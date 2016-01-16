Template.confirmDeleteOrg.onCreated(function () {
  var self = this;
  self.org = new ReactiveVar();
});

Template.confirmDeleteOrg.onRendered(function () {
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

Template.confirmDeleteOrg.helpers({
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
  }
});

Template.confirmDeleteOrg.events({
  'click #delete-org': function (e) {
    e.preventDefault();
    var id = FlowRouter.current().params.orgId;
    if (id) {
      Meteor.call('removeOrg', id, function (err, result) {
        if (err) console.log(err);
        else {
	  $('#modal').modal('hide');
          Meteor.setTimeout(function () {
            sAlert.success(TAPi18n.__('succDelOrg'));
          }, 400);
        }
      });
    }
  }
});
