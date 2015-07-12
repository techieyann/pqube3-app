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
  gaugeSelected: function (gaugeNum, name) {
    var gauge = Session.get('gauge'+gaugeNum);
    if (gauge) {
      return (gauge.gaugeName == name ? 'selected':'');
    }
    return '';
  }
});


Template.gaugeSelectors.events({
  'change .meter-source': function (e) {
    var gaugeSettings = getGaugeSettings(e.target.value, e.target.dataset.meter);
    Session.set('gauge'+e.target.dataset.meter, gaugeSettings);
  }
});
