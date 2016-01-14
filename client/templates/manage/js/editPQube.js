Template.editPQube.onCreated(function () {
  var self = this;
  self.pqube = new ReactiveVar();
});

Template.editPQube.onRendered(function () {
  var self = this;
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
  host: function () {
    var pqube = Template.instance().pqube.get();
    if (pqube)
    return pqube.host;
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
      host: $('#edit-pqube-hostname').val().toLowerCase(),
      port: $('#edit-pqube-port').val()
    };
    if (!editPQubeData.name) {
      Session.set('editPQubeFormError', TAPi18n.__('errNameRequired'));
      $('#edit-pqube-name').focus();
      return;
    }
    if (!editPQubeData.host) {
      Session.set('editPQubeFormError', TAPi18n.__('errHostRequired'));
      $('#edit-pqube-hostname').focus();
      return;
    }    
/*    if (!editPQubeData.port) editPQubeData.port = 502;
    var ipRegEx = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegEx.test(editPQubeData.ip)) {
    Session.set('editPQubeFormError', TAPi18n.__('errBadIP'));
    $('#edit-pqube-ip').val('').focus();
    return;
    }*/
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
