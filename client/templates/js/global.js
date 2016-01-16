Template.registerHelper('browserUnsupported', function () {
  return (BrowserDetect.browser == "Explorer" && BrowserDetect.version < 9);
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
  if (isAdmin()) {
    var paramOrgId = FlowRouter.current().params.orgId;
    if (paramOrgId) {
      return PQubes.find({org: paramOrgId}).fetch();
    }
    else {
      return PQubes.find({org: 'PSL'}).fetch();
    }
  }
  else {
    return PQubes.find().fetch();
  }
});

Template.registerHelper('pqubeData', function () {
  return PQubes.find().fetch();
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
