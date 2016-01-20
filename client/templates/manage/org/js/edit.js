Template.editOrg.onCreated(function () {
  var self = this;
  self.org = new ReactiveVar();
});

Template.editOrg.onRendered(function () {
  var self = this;
  $('#view-code-group').hide();
  self.autorun(function () {
    var orgId = FlowRouter.current().params.orgId;
    var org = Orgs.findOne(orgId);
    if (org) {
      self.org.set(org);
      self.data = org;
      if (org.visibility == 'private') {
        $('#view-code-group').slideDown();
      }
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
  },
  'visibility': function (type) {
    var self = Template.instance();
    var org = self.org.get();
    if (org) {
      if (org.visibility == type)
        return 'checked';
    }
  },
  'viewCode': function () {
    var self = Template.instance();
    var org = self.org.get();
    if (org)
      return org.viewCode;
  }
});

Template.editOrg.events({
  'change input:radio[name=visibility]': function (e) {
    var visibility = e.target.value;
    if (visibility == 'private') {
      $('#view-code-group').slideDown();
    }
    else if (visibility == 'public') {
      $('#view-code-group').slideUp();
    }
  },
  'submit #edit-org-form, click #submit-edit-org-form': function (e) {
    Session.set('formError', null);
    e.preventDefault();
    var orgId = FlowRouter.current().params.orgId;
    var editOrgData = {
      name: $('#edit-org-name').val(),
      slug: $('#edit-org-slug').val().toLowerCase(),
      visibility: $('input:radio[name=visibility]:checked').val()
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
    if (editOrgData.visibility == 'private') {
      editOrgData.viewCode = $('#edit-org-view-code').val();
      if (!editOrgData.viewCode) {
        Session.set('formError', TAPi18n.__('errViewCodeRequired'));
        $('#edit-org-view-code').focus();
        return;
      }
    }
    else {
      editOrgData.viewCode = '';
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
