Template.accessCode.events({
  'submit #edit-code-org-form, click #submit-edit-code-org-form': function (e) {
    Session.set('formError', null);
    e.preventDefault();
    var orgId = FlowRouter.current().params.orgId;
    var codeData = {
      orginal: $('#org-code-original').val(),
      updated: $('#org-code-new').val()
    };
    if (!isAdmin()) {
      if (!codeData.orginal) {
        Session.set('formError', TAPi18n.__('errCodeRequired'));
        $('#org-code-orginal').focus();
        return;
      }
    }
    if (!codeData.updated) {
      Session.set('formError', TAPi18n.__('errNewCodeRequired'));
      $('#org-code-new').focus();
      return;
    }
    if (codeData.updated != $('#org-code-confirm').val()) {
      Session.set('formError', TAPi18n.__('errCodeMatchRequired'));
      $('#org-code-new, #org-code-confirm').val('');
      $('#org-code-new').focus();
      return;
    }
    Meteor.call('changeOrgCode', orgId, codeData, function (err, result) {
      if (err) {
	Session.set('formError', err.reason);
	$('#org-code-'+err.error).focus();
	return;
      }
      $('#modal').modal('hide');
      Meteor.setTimeout(function () {
        sAlert.success(TAPi18n.__('succEditCodeOrg'));
      }, 400);
    });
  }
});
