Template.registerHelper('browserSupported', function () {
  if (BrowserDetect.browser == "Explorer" && BrowserDetect.version < 9)
    return false;
  return true;
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
