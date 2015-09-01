startDataIntervals = function () {
  Meteor.setInterval(function () {
    Tracker.nonreactive(function () {
      setPresentVals();

    });
  },500);
};
function pad2(number) { return (number < 10 ? '0' : '') + number; }

setPresentVals = function () {
  var now = new Date().getTime();
  for (i=1; i<3; i++) {
    var pqubeId = 'pqube'+i;
      var pqubeData = PQubeData.findOne(pqubeId);
    if (pqubeData) {
      var pqDate = pqubeData.pqYear+'-'+pad2(pqubeData.pqMonth)+'-'+pad2(pqubeData.pqDay);
      var pqTime = pqubeData.pqHour+':'+pad2(pqubeData.pqMinute)+':'+pad2(pqubeData.pqSecond);
      Session.set(pqubeId+'Time', pqDate+' '+pqTime);
      if (BrowserDetect.browser == "Chrome")
	Session.set(pqubeId+'Timestamp', pqDate+' '+pqTime);
      else 
	Session.set(pqubeId+'Timestamp', pqDate+'T'+pqTime);
    }
  }
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
  var data = PQubeData.findOne(Session.get('scopesSource'));
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
    var voltVects = {
      l1: {
	magnitude: data.vMagL1N,
	angle: data.vAngL1N
      },
      l2: {
	magnitude: data.vMagL2N,
	angle: data.vAngL2N
      },
      l3: {
	magnitude: data.vMagL3N,
	angle: data.vAngL3N
      }
    };
    Session.set('vVectors', voltVects);
    var currVects = {
      l1: {
	magnitude: data.iMagL1N,
	angle: data.iAngL1N
      },
      l2: {
	magnitude: data.iMagL2N,
	angle: data.iAngL2N
      },
      l3: {
	magnitude: data.iMagL3N,
	angle: data.iAngL3N
      }
    };
    Session.set('iVectors', currVects);


    var kWh = (data.energy/1000);
    Session.set('odometer1', kWh.toFixed(2));
    var kVAh = (data.VAh/1000);
    Session.set('odometer2', kVAh.toFixed(2));
    var kVARh = Math.sqrt((kVAh*kVAh) - (kWh*kWh));
    Session.set('odometer3', kVARh.toFixed(2));
    Session.set('resetDate', data.yearER+'-'+data.monthER+'-'+data.dayER);

    Session.set('lastFreq', data.freq);
  }
};


var blinkStatusLight = function () {
  Session.set('light_on', true);
  Meteor.setTimeout(function () {
    Session.set('light_on', false);
  }, 250);
};
