Template.manageLayout.onCreated(function () {
  self.subscribe('pqubesManage');
});

Template.manageLayout.onRendered(function () {
  $('#modal').on('hidden.bs.modal', function () {
    FlowRouter.go('/manage');
    Session.set('editPQubeFormError', null);
  });
});

Template.manageLayout.events({
  'click #nav-new-pqube': function (e) {
    Meteor.setTimeout(function () {
      $('#new-pqube-name').focus();
    }, 200);
  }
});

Template.dataLayout.onDestroyed(function () {
  stopDataInterval();
});

Template.dataLayout.onCreated(function () {
  var self = this;
  self.autorun(function () {
    var lang = LocalStore.get('language');
    if (lang) {
      TAPi18n.setLanguage(lang)
	.done(function () {
	})
	.fail(function (err) {
          console.log(err);
	});
    }
  });
  self.subscribe('pqubes', function () {
    if (PQubes.find().count()) {
      setDefaults();
      watchDataSubscriptions();
      startDataInterval();
      observePQubes();
    }
  });
});


