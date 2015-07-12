startDataIntervals = function () {
  setPresentVals();
  Meteor.setInterval(function () {
    Tracker.nonreactive(function () {
      setPresentVals();

    });
  },1500);
};


var setPresentVals = function () {
  var data = PQubeData.findOne();
  if (data) {
    if (!Session.equals('lastFreq', data.freq)) {
      blinkStatusLight();      
    }
    Session.set('vL1NGraph', data.vL1NGraph);
    Session.set('vL2NGraph', data.vL2NGraph);
    Session.set('vL3NGraph', data.vL3NGraph);
    Session.set('iL1NGraph', data.iL1NGraph);
    Session.set('iL2NGraph', data.iL2NGraph);
    Session.set('iL3NGraph', data.iL3NGraph);
    for (var i=1; i<4; i++) {
      var gaugeSettings = Session.get('gauge'+i);
      if (gaugeSettings) {
	var presentVal = data[gaugeSettings.dataSource].toFixed(gaugeSettings.sigFigs);
	Session.set('gauge'+i+'Value', presentVal);
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
