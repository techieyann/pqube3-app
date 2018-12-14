Template.newPQube.events({
  'submit #new-pqube-form, click #submit-new-pqube-form': function (e) {
    Session.set('formError', null);
    e.preventDefault();
    var orgId;
    if (isAdmin()) {
      var paramOrgId = FlowRouter.current().params.orgId;
      if (paramOrgId) {
        orgId = paramOrgId;
      }
    }
    else {
      orgId = Roles.getGroupsForUser(Meteor.userId(), 'manage')[0];
    }
    if (!orgId) orgId = 'PSL';
    var defaultFlag = false;
    if (!PQubes.findOne({org:orgId}))
      defaultFlag = true;

    var newPQubeData = {
      _id: Random.id(),
      name: $('#new-pqube-name').val(),
      host: $('#new-pqube-hostname').val(),
      port: $('#new-pqube-port').val(),
      slug: $('#new-pqube-slug').val(),
      metersOnly: $('#new-pqube-meters-only').is(':checked'),
      org: orgId,
      defaultPQube: defaultFlag
    };
    if (!newPQubeData.name) {
      Session.set('formError', TAPi18n.__('errNameRequired'));
      $('#new-pqube-name').focus();
      return;
    }
    if (!newPQubeData.host) {
      Session.set('formError', TAPi18n.__('errHostRequired'));
      $('#new-pqube-hostname').focus();
      return;
    }
    else {
      newPQubeData.host = newPQubeData.host.toLowerCase();
    }
    if (!newPQubeData.port) newPQubeData.port = '502';
    if (newPQubeData.slug) newPQubeData.slug = newPQubeData.slug.toLowerCase();
    Meteor.call('addNewPQube', newPQubeData, function (err, result) {
      if (err) {
	Session.set('formError', err.reason);
	$('#new-pqube-'+err.error).focus();
	return;
      }
      $('#modal').modal('hide');
      Meteor.setTimeout(function () {
        sAlert.success(TAPi18n.__('succNewPQube'));
      }, 400);
    });
  }
});
