Template.registerHelper('browserUnsupported', function () {
  return (BrowserDetect.browser == "Explorer" && BrowserDetect.version < 9);
});

Template.registerHelper('safariDropdownFix', function () {
  return (Session.get('safariDropdownFix') && 'safariDropdownFix');
});

Template.registerHelper('spectraSelected', function () {
  return FlowRouter.getRouteName() == 'spectra';
});

Template.registerHelper('atDisabled', function () {
  return AccountsTemplates.disabled();
});
Template.registerHelper('atClass', function () {
  return (AccountsTemplates.disabled() ? 'disabled':'active');
});

Template.registerHelper('pqube', function () {
  FlowRouter.watchPathChange();
  var search = {};
  var sort = {sort: {order: 1}};
  if (isAdmin()) {
    var paramOrgId = FlowRouter.current().params.orgId;
    if (paramOrgId) {
      search = {org: paramOrgId};
    }
    else {
      search = {org: 'PSL'};
    }
  }
  return PQubes.find(search, sort);
});
Template.registerHelper('pqubes', function () {
  FlowRouter.watchPathChange();
  var pqubes;
  if (isAdmin()) {
    var paramOrgId = FlowRouter.current().params.orgId;
    if (paramOrgId) {
      pqubes = PQubes.find({org: paramOrgId});
    }
    else {
      pqubes = PQubes.find({org: 'PSL'});
    }
  }
  else {
    pqubes = PQubes.find();
  }
  return pqubes.count() > 1;
});

Template.registerHelper('statusIcon', function () {
    if (this.status == 'connected')
      return 'ok-sign text-success';
    if (this.status == 'disconnected')
      return 'remove-sign text-danger';
    if (this.status == 'unknown')
      return 'question-sign text-warning';
    if (this.status == 'unverified')
      return 'ban-circle text-danger';
    return '';
});

Template.registerHelper('pqubeData', function () {
  return PQubes.find({}, {sort: {order:1}}).fetch();
});

Template.registerHelper('pqubeMeterData', function () {
  var pqubes = PQubes.find({}, {sort: {order:1}}).fetch();
  pqubes = pqubes.filter(function (pqube) {
    var meters = Meters.findOne(pqube._id);
    return meters.defaults;
  });
  return pqubes;
});

Template.registerHelper('language', function () {
return Languages;
});

Template.registerHelper('pqubesReady', function () {
  return PQubes.find().count();
});

Template.registerHelper('rootURL', function () {
  return Meteor.settings.public.rootURL;
});

Template.registerHelper('admin', function () {
  if (Meteor.user()) {
    var id = Meteor.user()._id;
    return Roles.userIsInRole(id, 'admin', Roles.GLOBAL_GROUP);
  }
  return false;
});

Template.registerHelper('currentPath', function () {
  FlowRouter.watchPathChange();
  return FlowRouter.current().path;
});

Template.registerHelper('formError', function () {
  return Session.get('formError');
});
