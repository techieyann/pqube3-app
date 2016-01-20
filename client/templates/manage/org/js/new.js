Template.newOrg.onRendered(function () {
  $('#view-code-group').hide();
});
Template.newOrg.helpers({
  'newOrgError': function () {
    return Session.get('newOrgFormError');
  }
});

Template.newOrg.events({
  'change input:radio[name=visibility]': function (e) {
    var visibility = e.target.value;
    if (visibility == 'private') {
      $('#view-code-group').slideDown();
    }
    else if (visibility == 'public') {
      $('#view-code-group').slideUp();
    }
  },
  'submit #new-org-form, click #submit-new-org-form': function (e) {
    Session.set('formError', null);
    e.preventDefault();
    var newOrgData = {
      _id: Random.id(),
      name: $('#new-org-name').val(),
      slug: $('#new-org-slug').val().toLowerCase(),
      visibility: $('input:radio[name=visibility]:checked').val(),
      accessCode: $('#new-org-manage-code').val()
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
    if (newOrgData.visibility == 'private') {
      newOrgData.viewCode = $('#new-org-view-code').val();
      if (!newOrgData.viewCode) {
        Session.set('formError', TAPi18n.__('errViewCodeRequired'));
        $('#new-org-view-code').focus();
        return;
      }
      if (newOrgData.viewCode == newOrgData.accessCode) {
        Session.set('formError', TAPi18n.__('errSameCodes'));
        $('#new-org-view-code').val('').focus();
        return;
      }
    }
    if (!newOrgData.accessCode) {
      Session.set('formError', TAPi18n.__('errCodeRequired'));
      $('#new-org-manage-code').focus();
      return;
    }
    if (newOrgData.accessCode != $('#new-org-manage-code-confirm').val()) {
      Session.set('formError', TAPi18n.__('errCodeMatchRequired'));
      $('#new-org-manage-code, #new-org-manage-code-confirm').val('');
      $('#new-org-manage-code').focus();
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
