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
    Session.set('formError', null);
    var id = FlowRouter.current().params.pqubeId;
    e.preventDefault();
    var editPQubeData = {
      name: $('#edit-pqube-name').val(),
      host: $('#edit-pqube-hostname').val().toLowerCase(),
      port: $('#edit-pqube-port').val()
    };
    if (!editPQubeData.name) {
      Session.set('formError', TAPi18n.__('errNameRequired'));
      $('#edit-pqube-name').focus();
      return;
    }
    if (!editPQubeData.host) {
      Session.set('formError', TAPi18n.__('errHostRequired'));
      $('#edit-pqube-hostname').focus();
      return;
    }    
    Meteor.call('editPQube', id, editPQubeData, function (err, result) {
      if (err) {
	Session.set('formError', err.reason);
	$('#edit-pqube-'+err.error).focus();
	return;
      }
      $('#modal').modal('hide');
      Meteor.setTimeout(function () {
      sAlert.success(TAPi18n.__('succEditPQube'));
      }, 400);
    });
  }  
});
