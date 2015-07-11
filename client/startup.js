Meteor.startup(function () {
  var gauge1Settings = $.extend(true, {}, gaugeDefaults, gaugeList.freq, {prefix: 1, tunguskaGauge: {id: '1-tunguska-gauge'}});
  var gauge2Settings = $.extend(true, {}, gaugeDefaults, gaugeList.thd, {prefix: 2, tunguskaGauge: {id: '2-tunguska-gauge'}});
  var gauge3Settings = $.extend(true, {}, gaugeDefaults, gaugeList.l1n, {prefix: 3, tunguskaGauge: {id: '3-tunguska-gauge'}});
  Session.setDefault('gauge1', gauge1Settings);
  Session.setDefault('gauge2', gauge2Settings);
  Session.setDefault('gauge3', gauge3Settings);
  startDataIntervals();
});
