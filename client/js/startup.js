Meteor.startup(function () {
  for (var i=0; i<defaultGauges.length; i++) {
    var g = defaultGauges[i];
    Session.set('gauge'+g.gaugeNum, getGaugeSettings(g.gaugeName, g.gaugeNum));
  }
  startDataIntervals();
});

var defaultGauges = [
  {
    gaugeNum: 1,
    gaugeName: 'freq'
  },
  {
    gaugeNum: 2,
    gaugeName: 'thd'
  },
  {
    gaugeNum: 3,
    gaugeName: 'l1n'
  }
];
