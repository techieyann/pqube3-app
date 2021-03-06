

Template.manageLayout.onCreated(function () {
  var self = this;
  self.autorun(function () {
    if (Meteor.user()) {
      if (Meteor.user().profile.initialized) {
        self.subscribe('pqubesManage');
      }
    }
  });

  self.subscribe('meters');
});

Template.manageLayout.onRendered(function () {
  Meteor.subscribe('orgsManage');
  Meteor.subscribe('orgs', function () {
    Session.set('orgsReady', true);
  });
  $('#modal').on('hidden.bs.modal', function () {
    window.history.back();
    Session.set('formError', null);
  });
  this.autorun(function () {
    var user = Meteor.user();
    var orgs = Orgs.find();
    var routeName = FlowRouter.getRouteName();
    if (user) {
      if (!user.profile.initialized) {
        if (routeName != 'orgAccess')
          FlowRouter.go('/initialize');
      }
      if (user.profile.initialized && routeName == 'userInit') {
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
    FlowRouter.watchPathChange();
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
        if (FlowRouter.current().route.name == 'orgAccess') {
          return TAPi18n.__('access');
        }
        else
          return TAPi18n.__('init');
      }
    }
    if (FlowRouter.current().route.name == 'orgAccess') {
      return TAPi18n.__('access');
    }
    return TAPi18n.__('loading');
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
});

Template.dataLayout.onRendered(function () {
  var self = this;
  Meteor.subscribe('orgs', function (){
    self.autorun(function () {
    FlowRouter.watchPathChange();
    var orgSlug = FlowRouter.current().params.orgSlug;

    var user = Meteor.user();
    var orgId;
    if (orgSlug) {
      var org = Orgs.findOne({slug: orgSlug});
      if (org) {
        if (org.visibility == 'public') {
          orgId = org._id;
        }
        else if (org.visibility == 'private') {
          if (user) {
            if (hasViewPermission(org._id)) {
              orgId = org._id;
            }
            else {
              Meteor.setTimeout(function () {
                FlowRouter.go('/'+orgSlug+'/access');
              }, 200);
            }
          }
          else {
            if (Session.get('view'+org._id)) {
              orgId = org._id;
            }
            else {
              Meteor.setTimeout(function () {
                FlowRouter.go('/'+orgSlug+'/access');
              }, 200);
            }
          }
        }
      }
      else {
        FlowRouter.go('/');
        sAlert.warning(TAPi18n.__('err404'));
      }
    }
    else if (!orgSlug) {
      orgId = 'PSL';
    }
    if (orgId) {
      self.subscribe('meters', function () {
        self.subscribe('pqubes', orgId, function () {
          if (PQubes.find().count()) {
            setDefaults();
            watchDataSubscriptions();
            startDataInterval();
            observePQubes();
          }
        });
      });
    }
  });

  });

});

Template.dataLayout.helpers({
  anyPQubes: function () {
    var pqubes = PQubes.find({}, {sort: {order:1}}).fetch();

    if (pqubes.length) {

      var pqube = pqubes[0];

      var meters = Meters.findOne(pqube._id);

      return (meters && meters.defaults && meters.defaults.length);
    }
    return false;
  },
  metersSelected: function () {
    return Session.get('metersSelected');
  }
});
