
Meteor.startup(function () {
  if (BrowserDetect.browser == 'Safari')
    $('select').css('color', 'black');
  Session.set('scopesSource', 'pqube1');
  Session.set('spectraSelected', false);
  Session.set('voltageScopeScale', 100);
  Session.set('currentScopeScale', 10);
  for (var i=0; i<defaultGauges.length; i++) {
    var g = defaultGauges[i];
    var gaugeSettings = getGaugeSettings(g.gaugeName, g.gaugeNum);
    gaugeSettings.pqubeId = 'pqube1';
    Session.set('gauge'+g.gaugeNum, gaugeSettings);
    Session.set(g.gaugeNum+'-gaugeScale', gaugeList[g.gaugeName].scale);
  }
  Session.set('spectraSource', 'L123NvHarmonics');
  setSubscription();
  startDataInterval();
});

var defaultGauges = [
  {
    gaugeNum: 1,
    gaugeName: 'freq'
  },
  {
    gaugeNum: 2,
    gaugeName: 'watts'
  },
  {
    gaugeNum: 3,
    gaugeName: 'l1n'
  }
];

