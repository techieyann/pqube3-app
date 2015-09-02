Template.viewSelector.helpers({
  switchSide: function () {
    return (Session.equals('spectraSelected', true)? 'right':'left');
  }
});

Template.viewSelector.events({
  'click #gauge-select': function () {
    Session.set('spectraSelected', false);
  },
  'click #spectra-select': function () {
    Session.set('spectraSelected', true);
  },
  'click #selector-switch': function () {
    var presentSelection = Session.get('spectraSelected');
    Session.set('spectraSelected', !presentSelection);
  }
});
