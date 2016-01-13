Template.newOrg.helpers({
  'newOrgError': function () {
    return Session.get('newOrgFormError');
  }
});

Template.newOrg.events({
  'submit #new-org-form, click #submit-new-org-form': function (e) {
    Session.set('newOrgFormError', null);
    e.preventDefault();
    var newOrgData = {
      _id: Random.id(),
      name: $('#new-org-name').val(),
      slug: $('#new-org-slug').val().toLowerCase(),
      accessCode: $('#new-org-code').val()
    };
    if (!newOrgData.name) {
      Session.set('newOrgFormError', TAPi18n.__('errNameRequired'));
      $('#new-org-name').focus();
      return;
    }
    if (!newOrgData.slug) {
      Session.set('newOrgFormError', TAPi18n.__('errSlugRequired'));
      $('#new-org-slug').focus();
      return;
    }
/*    var ipRegEx = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegEx.test(newOrgData.ip)) {
      Session.set('newOrgFormError', TAPi18n.__('errBadIP'));
      $('#new-org-ip').val('').focus();
      return;
      }*/
    if (!newOrgData.accessCode) {
      Session.set('newOrgFormError', TAPi18n.__('errCodeRequired'));
      $('#new-org-code').focus();
      return;      
    }
    if (newOrgData.accessCode != $('#new-org-code-confirm').val()) {
      Session.set('newOrgFormError', TAPi18n.__('errCodeMatchRequired'));
      $('#new-org-code, #new-org-code-confirm').val('');
      $('#new-org-code').focus();
      return;      
    }
    Meteor.call('newOrg', newOrgData, function (err, result) {
      if (err) {
	Session.set('newOrgFormError', err.reason);
	$('#new-org-'+err.error).focus();
	return;
      }
      $('#modal').modal('hide');
    });

  }
});
