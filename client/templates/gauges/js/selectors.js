Template.gaugeSelectors.helpers({
  gauges: function () {
    return [
      {
	gaugeNum: 1
      },
      {
	gaugeNum: 2
      },
      {
	gaugeNum: 3
      }
    ];
  },
  dataSource: function (gaugeNum) {
    var array = [];    
    var gauge = Session.get('gauge'+gaugeNum);
    if (gauge) {
      var pqube = gauge.pqubeId;
      var meters = Meters.findOne(pqube);

      if (meters) {
        for (var key in meters.selected) {
          array.push({gaugeName: key});
        }
      }
    }
    return array;
  },
  siteSelected: function (gaugeNum, name) {
    var gauge = Session.get('gauge'+gaugeNum);
    if (gauge) {
      return (gauge.pqubeId == name ? 'selected':'');
    }
    return '';
  },
  gaugeSelected: function (gaugeNum, name) {
    var gauge = Session.get('gauge'+gaugeNum);
    if (gauge) {
      return (gauge.gaugeName == name ? 'selected':'');
    }
    return '';
  }
});


Template.gaugeSelectors.events({
  'change .site-source': function (e) {
    var gaugeNum = e.target.dataset.meter;
    var pqube = e.target.value;
    var meters = Meters.findOne(pqube);
    var firstMeter;
    if (meters && meters.selected) {
      for (var key in meters.selected) {
        firstMeter = key;
        break;
      }
      var gaugeSettings = getGaugeSettings(e.target.value, firstMeter, parseInt(gaugeNum,10));
      Session.set('gauge'+gaugeNum+'Value', null);
      Session.set('gauge'+gaugeNum, gaugeSettings);
      $('#'+e.target.dataset.meter+'-recorder-head').css('left', null);      
    }
  },
  'change .meter-source': function (e) {
    var gaugeNum = e.target.dataset.meter;
    var pqube = Session.get('gauge'+gaugeNum).pqubeId;
    var gaugeSettings = getGaugeSettings(pqube, e.target.value, parseInt(gaugeNum,10));

    Session.set('gauge'+gaugeNum+'Value', null);
    Session.set('gauge'+gaugeNum, gaugeSettings);
  }
});
