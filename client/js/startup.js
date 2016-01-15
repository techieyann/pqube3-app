Meteor.startup(function () {
  BlazeLayout.setRoot('body');

  if (BrowserDetect.browser == 'Safari')
    $('select').css('color', 'black');
  Session.set('voltageScopeScale', 100);
  Session.set('currentScopeScale', 10);
  Session.set('newOrgFormError', null);
  Session.set('editOrgFormError', null);
  Session.set('newPQubeFormError', null);
  Session.set('editPQubeFormError', null);
  Session.set('initUserFormError', null);

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

  Meteor.subscribe('orgs');
});


