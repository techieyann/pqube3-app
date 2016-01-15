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
