
Template.editPQube.helpers({
  editPQubeError: function () {
    return Session.get('editPQubeFormError');
  },
  name: function () {
    return Session.get('editPQube').name;
  },
  defaultLangauge: function () {
    return Session.get('editPQube').language;
  },
  ip: function () {
    return Session.get('editPQube').ip;
  },
  port: function () {
    return Session.get('editPQube').port;
  },
  selectedLanguage: function () {
    return (Session.get('editPQube').language == this.acronym ? 'selected':'');
  }
});

Template.editPQube.events({
  'submit #edit-pqube-form, click #edit-pqube': function (e) {
    Session.set('editPQubeFormError', null);
    var id = Session.get('editPQube')._id;
    e.preventDefault();
    var editPQubeData = {
      name: $('#edit-pqube-name').val(),
      language: $('#edit-pqube-language').val(),
      ip: $('#edit-pqube-ip').val(),
      port: $('#edit-pqube-port').val()
    };
    if (!editPQubeData.name) {
      Session.set('editPQubeFormError', 'Name is a required field');
      $('#edit-pqube-name').focus();
      return;
    }
    if (!editPQubeData.ip) {
      Session.set('editPQubeFormError', 'IP is a required field');
      $('#edit-pqube-ip').focus();
      return;
    }    
    if (!editPQubeData.port) editPQubeData.port = 502;
    var ipRegEx = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegEx.test(editPQubeData.ip)) {
      Session.set('editPQubeFormError', 'Bad IP address formatting');
      $('#edit-pqube-ip').val('').focus();
      return;
    }
    Meteor.call('editPQube', id, editPQubeData, function (err, result) {
      if (err) {
	Session.set('editPQubeFormError', err.reason);
	$('#edit-pqube-'+err.error).focus();
	return;
      }
      $('#modal').modal('hide');
    });
  }  
});
