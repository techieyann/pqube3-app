Template.confirmDeletePQube.onCreated(function () {
  var self = this;
  self.pqube = new ReactiveVar();
  self.autorun(function () {
    var id = FlowRouter.current().params.pqubeId;
    var pqube = PQubes.findOne(id);
    self.pqube.set(pqube);
  });
});

Template.confirmDeletePQube.helpers({
  name: function () {
    var pqube = Template.instance().pqube.get();
    if (pqube)
      return pqube.name;
  },
  host: function () {
    var pqube = Template.instance().pqube.get();
    if (pqube)
      return pqube.host+':'+pqube.port;
  }
});

Template.confirmDeletePQube.events({
  'click #delete-pqube': function (e) {
    e.preventDefault();
    var id = FlowRouter.current().params.pqubeId;
    Meteor.call('removePQube', id, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }

      $('#modal').modal('hide');
      Meteor.setTimeout(function () {
        sAlert.success(TAPi18n.__('succDelPQube'));
      }, 400);
    });
  }
});
