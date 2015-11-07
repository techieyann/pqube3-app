Meteor.startup(function () {
  if (BrowserDetect.browser == 'Safari')
    $('select').css('color', 'black');

  Session.set('initialized', false);

  Session.set('voltageScopeScale', 100);
  Session.set('currentScopeScale', 10);
  Session.set('newPQubeFormError', null);
  Session.set('editPQubeFormError', null);

  Session.set('spectraSource', 'L123NvHarmonics');

  sAlert.config({
    effect: 'stackslide',
    position: 'bottom-right',
    timeout: 3000,
    html: false,
    onRouteClose: true,
    stack: true,
    offset: 0, // in px
    beep: false
  });
});


