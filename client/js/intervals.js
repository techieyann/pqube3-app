startDataIntervals = function () {
  Meteor.setInterval(function () {
    Tracker.nonreactive(function () {
      setPresentVals();

    });
  },1500);
};


setPresentVals = function () {
  var data = PQubeData.findOne('pqube1');
  if (data) {
    var now = new Date().getTime();
    if (!Session.equals('lastFreq', data.freq)) {
      blinkStatusLight();      
    }
    Session.set('vL1NGraph', data.vL1NGraph);
    Session.set('vL2NGraph', data.vL2NGraph);
    Session.set('vL3NGraph', data.vL3NGraph);
    Session.set('iL1NGraph', data.iL1NGraph);
    Session.set('iL2NGraph', data.iL2NGraph);
    Session.set('iL3NGraph', data.iL3NGraph);
    var kWh = (data.energy/1000);
    Session.set('odometer1', kWh.toFixed(2));
    var kVAh = (data.VAh/1000);
    Session.set('odometer2', kVAh.toFixed(2));
    var kVARh = Math.sqrt((kVAh*kVAh) - (kWh*kWh));
    Session.set('odometer3', kVARh.toFixed(2));
    Session.set('resetDate', data.yearER+'-'+data.monthER+'-'+data.dayER);
    for (i=1; i<4; i++) {
      var gaugeSettings = Session.get('gauge'+i);
      if (gaugeSettings) {
	var pqubeData = PQubeData.findOne(gaugeSettings.pqubeId);
	if (pqubeData) {
	  var presentVal = (pqubeData[gaugeSettings.dataSource]*gaugeSettings.multiplier);
	  Session.set('gauge'+i+'Value', {time: now, val: presentVal});
	}
      }
    }
    Session.set('lastFreq', data.freq);
  }
};


var blinkStatusLight = function () {
  Session.set('light_on', true);
  Meteor.setTimeout(function () {
    Session.set('light_on', false);
  }, 500);
};
