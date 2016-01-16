Template.metersPQube.onCreated(function () {
  var self = this;
  self.pqube = new ReactiveVar();
  self.meters = new ReactiveVar();
  self.autorun(function () {
    var id = FlowRouter.current().params.pqubeId;
    var pqube = PQubes.findOne(id);
    self.pqube.set(pqube);
    var meters = Meters.findOne(id);
    self.meters.set(meters);
  });
});

Template.metersPQube.helpers({
  name: function () {
    var pqube = Template.instance().pqube.get();
    if (pqube)
      return pqube.name;
  },
  frequencyChecked: function (freq) {
    var meters = Template.instance().meters.get();
    if (meters) {
      if (meters.frequency)
        return (meters.frequency == freq ? 'checked' : '');
    }
    return (freq == 60 ? 'checked':'');
  }
});

Template.metersPQube.events({
  'submit #manage-meters-pqube-form, click #meters-pqube': function (e) {
    e.preventDefault();
    Session.set('formError', null);
    var id = FlowRouter.current().params.pqubeId;
    var meterOpts = {
      frequency: parseInt($('input[name="freqRadios"]:checked').val())
    };
    Meteor.call('editMetersPQube', id, meterOpts, function (err, result) {
      if (err) {
	      Session.set('formError', err.reason);
	      return;
      }
      $('#modal').modal('hide');
      Meteor.setTimeout(function () {
        sAlert.success(TAPi18n.__('succEditMetersPQube'));
      }, 400);
    });
  }
});

                         
