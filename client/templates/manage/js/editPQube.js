Template.editPQube.onCreated(function () {
  var self = this;
  self.pqube = new ReactiveVar();
  self.autorun(function () {
    var id = FlowRouter.current().params.pqubeId;
    var pqube = PQubes.findOne(id);
    self.pqube.set(pqube);
  });
});

Template.editPQube.helpers({
  editPQubeError: function () {
    return Session.get('editPQubeFormError');
  },
  name: function () {
    var pqube = Template.instance().pqube.get();
    if (pqube)
      return pqube.name;
  },
  defaultLangauge: function () {
    var pqube = Template.instance().pqube.get();
    if (pqube)
      return pqube.language;
  },
  ip: function () {
    var pqube = Template.instance().pqube.get();
    if (pqube)
    return pqube.ip;
  },
  port: function () {
    var pqube = Template.instance().pqube.get();
    if (pqube)
    return pqube.port;
  },
  selectedLanguage: function () {
    var pqube = Template.instance().pqube.get();
    if (pqube)
      return (pqube.language == this.acronym ? 'selected':'');
  }
});

Template.editPQube.events({
  'submit #edit-pqube-form, click #edit-pqube': function (e) {
    Session.set('editPQubeFormError', null);
    var id = FlowRouter.current().params.pqubeId;
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
