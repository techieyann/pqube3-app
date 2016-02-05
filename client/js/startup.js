Meteor.startup(function () {
  BlazeLayout.setRoot('body');

  if (BrowserDetect.browser == 'Safari' && BrowserDetect.OS == 'iPhone/iPod')
    Session.set('safariDropdownFix', true);
  Session.set('voltageScopeScale', 100);
  Session.set('currentScopeScale', 10);
  Session.set('formError', null);
  Session.set('orgsReady', false);
  Session.set('metersSelected', true);
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


