Template.viewSelector.helpers({
  switchSide: function () {
    return (Session.get('metersSelected') ? 'left':'right');
  }
});

Template.viewSelector.events({
  'click #gauge-select': function () {
    Session.set('metersSelected', true);
  },
  'click #spectra-select': function () {
    Session.set('metersSelected', false);
  },
  'click #selector-switch': function () {
    var toggle = Session.get('metersSelected');
    Session.set('metersSelected', !toggle);
  }
});
