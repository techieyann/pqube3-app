Template.manageLayout.onCreated(function () {
  this.subscribe('pqubesManage');
  this.subscribe('meters');
});

Template.manageLayout.onRendered(function () {
  $('#modal').on('hidden.bs.modal', function () {
    window.history.back();
    Session.set('newOrgFormError', null);
    Session.set('editOrgFormError', null);
    Session.set('newPQubeFormError', null);
    Session.set('editPQubeFormError', null);
    Session.set('metersPQubeFormError', null);
  });
  this.autorun(function () {
    var user = Meteor.user();
    FlowRouter.watchPathChange();
    if (user) {
      if (!user.profile.initialized) {
        FlowRouter.go('/initialize');
      }
      if (user.profile.initialized && FlowRouter.getRouteName() == 'userInit') {
        FlowRouter.go('/manage');
      }
    }
  });
});

Template.manageLayout.helpers({
  'orgURL': function () {
    var userId = Meteor.userId();
    if (Meteor.user()) {
      if (Meteor.user().profile.initialized) {
        if (Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)) {
          return '';
        }
        else {
          var groups = Roles.getGroupsForUser(userId, 'manage');
          if (groups[0]) {
            var org = Orgs.findOne(groups[0]);
            if (org) {
              return org.slug;
            }
          }
        }
      }
      else {
        return '';
      }
    }
  },
  'orgName': function () {
    var userId = Meteor.userId();
    if (Meteor.user()) {
    if (Meteor.user().profile.initialized) {
      if (Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)) {
        return 'PSL';
      }
      else {
        var groups = Roles.getGroupsForUser(userId, 'manage');
        if (groups[0]) {
          var org = Orgs.findOne(groups[0]);
          if (org) {
            return org.name;
          }
        }
      }
    }
    else {
      return 'init';
    }
   }
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


