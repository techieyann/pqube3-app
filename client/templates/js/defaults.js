setDefaults = function () {

  var defaultPQube = PQubes.findOne({},{sort: {order: 1}});
  if (defaultPQube) {
    var id = defaultPQube._id;
    Session.set('scopesSource', id);
    var meters = Meters.findOne(id);
    if (meters) {
      var defaultGauges = meters.defaults;
      for (var i=0; i<defaultGauges.length; i++) {
        var g = defaultGauges[i];
        var gaugeSettings = getGaugeSettings(id, g, i+1);
        Session.set('gauge'+(i+1), gaugeSettings);
      }
    }
  }
};


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
