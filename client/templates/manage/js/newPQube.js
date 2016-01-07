Template.newPQube.helpers({
  newPQubeError: function () {
    return Session.get('newPQubeFormError');
  }
});

Template.newPQube.events({
  'submit #new-pqube-form, click #submit-new-pqube-form': function (e) {
    Session.set('newPQubeFormError', null);
    e.preventDefault();
    var defaultFlag = false;
    if (!PQubes.findOne())
      defaultFlag = true;
    var newPQubeData = {
      _id: Random.id(),
      name: $('#new-pqube-name').val(),
      ip: $('#new-pqube-ip').val(),
      port: $('#new-pqube-port').val(),
      defaultPQube: defaultFlag
    };
    if (!newPQubeData.name) {
      Session.set('newPQubeFormError', TAPi18n.__('errNameRequired'));
      $('#new-pqube-name').focus();
      return;
    }
    if (!newPQubeData.ip) {
      Session.set('newPQubeFormError', TAPi18n.__('errIPRequired'));
      $('#new-pqube-ip').focus();
      return;
    }    
    if (!newPQubeData.port) newPQubeData.port = 502;
    var ipRegEx = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegEx.test(newPQubeData.ip)) {
      Session.set('newPQubeFormError', TAPi18n.__('errBadIP'));
      $('#new-pqube-ip').val('').focus();
      return;
    }
    Meteor.call('addNewPQube', newPQubeData, function (err, result) {
      if (err) {
	      Session.set('newPQubeFormError', err.reason);
	      $('#new-pqube-'+err.error).focus();
	      return;
      }
      $('#modal').modal('hide');
    });
  }
});
