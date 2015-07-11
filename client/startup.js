Meteor.startup(function () {
  var gauge1Settings = $.extend(true, {}, gaugeList.freq, gaugeDefaults, {prefix: 1, tunguskaGauge: {id: '1-tunguska-gauge'}});
  var gauge2Settings = $.extend(true, {}, gaugeList.thd, gaugeDefaults, {prefix: 2, tunguskaGauge: {id: '2-tunguska-gauge'}});
  var gauge3Settings = $.extend(true, {}, gaugeList.l1n, gaugeDefaults, {prefix: 3, tunguskaGauge: {id: '3-tunguska-gauge'}});
  Session.setDefault('gauge1', gauge1Settings);
  Session.setDefault('gauge2', gauge2Settings);
  Session.setDefault('gauge3', gauge3Settings);
});
