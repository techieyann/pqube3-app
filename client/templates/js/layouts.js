Template.manageLayout.onCreated(function () {
  this.subscribe('pqubesManage');
  this.subscribe('meters');
});

Template.manageLayout.onRendered(function () {
  $('#modal').on('hidden.bs.modal', function () {
    FlowRouter.go('/manage');
    Session.set('editPQubeFormError', null);
  });
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
  self.subscribe('meters', function () {
    self.subscribe('pqubes', function () {
      if (PQubes.find().count()) {
        setDefaults();
        watchDataSubscriptions();
        startDataInterval();
        observePQubes();
      }
    });
  });
});


