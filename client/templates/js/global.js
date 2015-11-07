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
