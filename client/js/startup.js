Meteor.startup(function () {
  Session.set('primaryTitle', 'PSL Service Entrance');
  Session.set('secondaryTitle', 'LBNL Building 90');
  for (var i=0; i<defaultGauges.length; i++) {
    var g = defaultGauges[i];
    var gaugeSettings = getGaugeSettings(g.gaugeName, g.gaugeNum);
    gaugeSettings.pqubeId = 'pqube1';
    Session.set('gauge'+g.gaugeNum, gaugeSettings);
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
