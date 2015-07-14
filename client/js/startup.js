Meteor.startup(function () {
  if (BrowserDetect.browser == 'Safari')
    $('select').css('color', 'black');
  Session.set('scopesSource', 'pqube1');
  Session.set('voltageScopeScale', 100);
  Session.set('currentScopeScale', 10);
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
