observePQubes = function () {
  PQubes.find().observeChanges({
    added: function (id, fields) {
      sAlert.success(TAPi18n.__('alertConnected')+' '+fields.name);
    },
    removed: function (id) {
      var displayChangeFlag = false;
      if (PQubes.find().count()) {
        var defaultPQube = PQubes.findOne({defaultPQube: true});
        var switchToId = (defaultPQube ? defaultPQube._id : PQubes.findOne()._id);

        var scope = Session.get('scopesSource');
        var gauges = [
          Session.get('gauge1'),
          Session.get('gauge2'),
          Session.get('gauge3')
        ];

        if (id == scope) {
          Session.set('scopesSource', switchToId);
          displayChangeFlag = true;
        }
        var meters = Meters.findOne(switchToId);
        if (meters && meters.defaults) {
          for (var i=0; i<gauges.length; i++) {
            if (id == gauges[i].pqubeId) {
              var g = meters.defaults[i];
              var gaugeSettings = getGaugeSettings(switchToId, g, i+1);
              Session.set('gauge'+(i+1), gaugeSettings);
              displayChangeFlag = true;              
            }
          }
        }
        if (displayChangeFlag)
          sAlert.warning(TAPi18n.__('alertDCViewChange'));
      }
      if (!displayChangeFlag) {
        sAlert.warning(TAPi18n.__('alertDisconnected'));        
      }
    }
  });
};
