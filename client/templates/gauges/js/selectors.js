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
  dataSource: function () {
    var array = [];
    for (var key in gaugeList) {
      array.push($.extend({gaugeName: key},gaugeList[key]));
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
    var gaugeSettings = Session.get('gauge'+e.target.dataset.meter);
    gaugeSettings.pqubeId = e.target.value;
    var prefix = e.target.dataset.meter;
    Session.set('gauge'+prefix+'Value', null);
    Session.set('gauge'+prefix, gaugeSettings);
    $('#'+e.target.dataset.meter+'-recorder-head').css('left', null);
  },
  'change .meter-source': function (e) {
    var gaugeNum = e.target.dataset.meter;
    var pqube = Session.get('gauge'+gaugeNum).pqubeId;
    var gaugeSettings = getGaugeSettings(e.target.value, parseInt(e.target.dataset.meter,10));
    gaugeSettings.pqubeId = pqube;

    Session.set('gauge'+gaugeNum+'Value', null);
    Session.set('gauge'+gaugeNum, gaugeSettings);
  }
});
