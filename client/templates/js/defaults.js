setDefaults = function () {

  var defaultPQube = PQubes.findOne({defaultPQube: true});
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
  if (defaultPQube) {
    var id = defaultPQube._id;
    Session.set('scopesSource', id);    
    for (var i=0; i<defaultGauges.length; i++) {
      var g = defaultGauges[i];
      var gaugeSettings = getGaugeSettings(g.gaugeName, g.gaugeNum);
      gaugeSettings.pqubeId = id;
      Session.set('gauge'+g.gaugeNum, gaugeSettings);
      Session.set(g.gaugeNum+'-gaugeScale', gaugeList[g.gaugeName].scale);
    }
  }
};
