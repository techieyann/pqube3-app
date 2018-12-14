setDefaults = function () {

  var defaultPQube = PQubes.findOne({},{sort: {order: 1}});

  var defaultOverride = Session.get('deviceSlug');
  if (defaultOverride) {

    var overridePQube = PQubes.findOne({slug: defaultOverride});
    console.log(overridePQube);
    if (overridePQube) defaultPQube = overridePQube;
  }
  if (defaultPQube) {
    var id = defaultPQube._id;
    Session.set('scopesSource', id);
    var meters = Meters.findOne(id);
    if (meters) {
      var defaultGauges = meters.defaults;
      if (defaultGauges) {
        for (var i=0; i<defaultGauges.length; i++) {
          var g = defaultGauges[i];
          var gaugeSettings = getGaugeSettings(id, g, i+1);
          Session.set('gauge'+(i+1), gaugeSettings);
        }
      }
    }
  }
};
