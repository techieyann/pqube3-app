Template.newOrg.helpers({
  'newOrgError': function () {
    return Session.get('newOrgFormError');
  }
});

Template.newOrg.events({
  'submit #new-org-form, click #submit-new-org-form': function (e) {
    Session.set('formError', null);
    e.preventDefault();
    var newOrgData = {
      _id: Random.id(),
      name: $('#new-org-name').val(),
      slug: $('#new-org-slug').val().toLowerCase(),
      accessCode: $('#new-org-code').val()
    };
    if (!newOrgData.name) {
      Session.set('formError', TAPi18n.__('errNameRequired'));
      $('#new-org-name').focus();
      return;
    }
    if (!newOrgData.slug) {
      Session.set('formError', TAPi18n.__('errSlugRequired'));
      $('#new-org-slug').focus();
      return;
    }
    if (!newOrgData.accessCode) {
      Session.set('formError', TAPi18n.__('errCodeRequired'));
      $('#new-org-code').focus();
      return;      
    }
    if (newOrgData.accessCode != $('#new-org-code-confirm').val()) {
      Session.set('formError', TAPi18n.__('errCodeMatchRequired'));
      $('#new-org-code, #new-org-code-confirm').val('');
      $('#new-org-code').focus();
      return;      
    }
    Meteor.call('newOrg', newOrgData, function (err, result) {
      if (err) {
	Session.set('formError', err.reason);
	$('#new-org-'+err.error).focus();
	return;
      }
      $('#modal').modal('hide');
      Meteor.setTimeout(function () {
        sAlert.success(TAPi18n.__('succNewOrg'));
      }, 400);
    });

  }
});
