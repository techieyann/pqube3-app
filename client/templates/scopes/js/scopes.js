Template.scopes.helpers({
  siteSelected: function (id) {
    return (Session.equals('scopesSource', id) ? 'selected':'');
  },
  voltageScale: function () {
    return Session.get('voltageScopeScale')+'V/div';
  },
  currentScale: function () {
    return Session.get('currentScopeScale')+'A/div';
  }
});


Template.scopes.events({
  'change #scopes-site-source': function (e) {
    Session.set('scopesSource', e.target.value);
  }
});
