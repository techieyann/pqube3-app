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
  pqube: function () {
    return [
      {
	id: 'pqube1',
	title: Session.get('primaryTitle')
      },
      {
	id: 'pqube2',
	title: Session.get('secondaryTitle')
      }
    ];
  },
  siteSelected: function (gaugeNum, name) {
    var gauge = Session.get('gauge'+gaugeNum);
    if (gauge) {
      return (gauge.pqubeID == name ? 'selected':'');
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
    Session.set('gauge'+e.target.dataset.meter, gaugeSettings);
    $('#'+e.target.dataset.meter+'-recorder-head').css('left', null);
    console.log(gaugeSettings);
  },
  'change .meter-source': function (e) {
    var pqube = Session.get('gauge'+e.target.dataset.meter).pqubeId;
    var gaugeSettings = getGaugeSettings(e.target.value, parseInt(e.target.dataset.meter,10));
    gaugeSettings.pqubeId = pqube;
    Session.set('gauge'+e.target.dataset.meter, gaugeSettings);
  }
});
