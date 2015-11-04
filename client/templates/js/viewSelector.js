Template.viewSelector.helpers({
  switchSide: function () {
    return (FlowRouter.getRouteName() == 'spectra' ? 'right':'left');
  }
});

Template.viewSelector.events({
  'click #gauge-select': function () {
    FlowRouter.go('/meters');
  },
  'click #spectra-select': function () {
    FlowRouter.go('/spectra');
  },
  'click #selector-switch': function () {
    var route = (FlowRouter.getRouteName() == 'spectra' ? '/meters':'/spectra');
    FlowRouter.go(route);
  }
});
