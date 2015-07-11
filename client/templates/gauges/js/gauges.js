Template.gauges.helpers({
  gauge1Data: function () {
    return Session.get('gauge1');
  },
  gauge2Data: function () {
    return Session.get('gauge2');
  },
  gauge3Data: function () {
    return Session.get('gauge3');
  }
});
