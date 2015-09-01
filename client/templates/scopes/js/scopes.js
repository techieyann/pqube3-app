Template.scopes.helpers({
  voltageScale: function () {
    return Session.get('voltageScopeScale')+'V/div';
  },
  currentScale: function () {
    return Session.get('currentScopeScale')+'A/div';
  },
  odoReset: function () {
    return Session.get('odoReset');
  }
});


Template.scopes.events({

});
