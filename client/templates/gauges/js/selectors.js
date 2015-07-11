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
      array.push(gaugeList[key]);
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
    var gaugeSettings = $.extend(true, 
				 {}, 
				 gaugeList[e.target.value], 
				 gaugeDefaults, 
				 {prefix: e.target.dataset.meter, tunguskaGauge: {id: e.target.dataset.meter + '-tunguska-gauge'}});
    Session.set('gauge'+e.target.dataset.meter, gaugeSettings);
  }
});
