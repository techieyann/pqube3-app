Template.registerHelper('browserSupported', function () {
  if (BrowserDetect.browser == "Explorer" && BrowserDetect.version < 9)
    return false;
  return true;
});

Template.registerHelper('spectraSelected', function () {
  return Session.get('spectraSelected');
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
