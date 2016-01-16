Template.editOrg.onCreated(function () {
  var self = this;
  self.org = new ReactiveVar();
});

Template.editOrg.onRendered(function () {
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

Template.editOrg.helpers({
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

Template.editOrg.events({
  'submit #edit-org-form, click #submit-edit-org-form': function (e) {
    Session.set('formError', null);
    e.preventDefault();
    var orgId = FlowRouter.current().params.orgId;
    var editOrgData = {
      name: $('#edit-org-name').val(),
      slug: $('#edit-org-slug').val().toLowerCase()
    };
    if (!editOrgData.name) {
      Session.set('formError', TAPi18n.__('errNameRequired'));
      $('#edit-org-name').focus();
      return;
    }
    if (!editOrgData.slug) {
      Session.set('formError', TAPi18n.__('errSlugRequired'));
      $('#edit-org-slug').focus();
      return;
    }
    Meteor.call('editOrg', orgId, editOrgData, function (err, result) {
      if (err) {
	Session.set('formError', err.reason);
	$('#edit-org-'+err.error).focus();
	return;
      }
      $('#modal').modal('hide');
      Meteor.setTimeout(function () {
        sAlert.success(TAPi18n.__('succEditOrg'));
      }, 400);
    });
  }
});
