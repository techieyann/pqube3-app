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
  metersOnly: function () {
    var pqube = Template.instance().pqube.get();
    if (pqube)
    return pqube.metersOnly ? 'checked':'';
  },
  slug: function () {
    var pqube = Template.instance().pqube.get();
    if (pqube)
    return pqube.slug;
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
      host: $('#edit-pqube-hostname').val(),
      port: $('#edit-pqube-port').val(),
      slug: $('#edit-pqube-slug').val(),
      metersOnly: $('#edit-pqube-meters-only').is(':checked')      
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
    if (editPQubeData.slug) editPQubeData.slug = editPQubeData.slug.toLowerCase();
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
