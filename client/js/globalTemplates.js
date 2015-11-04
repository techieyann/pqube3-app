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
  return [
    {
      id: 'pqube1'
    },
    {
      id: 'pqube2'
    }
  ];
});
