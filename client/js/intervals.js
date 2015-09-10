startDataInterval = function () {
  Meteor.setInterval(function () {
    Tracker.nonreactive(setPresentVals);
  },500);
};
function pad2(number) { return (number < 10 ? '0' : '') + number; }

setPresentVals = function () {
  var dC = {
    now:new Date().getTime()
  };
  for (var i=1; i<3; i++) {
    dC.pqubeId = 'pqube'+i;
    dC.pqubeData = PQubeData.findOne(dC.pqubeId);
    dC.scopesFlag = Session.equals('scopesSource', dC.pqubeId);
    if (dC.pqubeData) {
      if(newVals.call(dC)) {
        if (dC.scopesFlag) {
          blinkNewData.call(dC);
          updateScopes.call(dC);
        }
	      updateGauges.call(dC);
      }
      else {
        clearGauges.call(dC);
      }
    }
  }
};

var newVals = function () {
  var resetStatusFlag = false;
  var pqDate = this.pqubeData.pqYear+'-'+pad2(this.pqubeData.pqMonth)+'-'+pad2(this.pqubeData.pqDay);
  var pqTime = this.pqubeData.pqHour+':'+pad2(this.pqubeData.pqMinute)+':'+pad2(this.pqubeData.pqSecond);
  var pqubeId = this.pqubeData._id;
  var timeStamp = pqDate+' '+pqTime;

  Session.set(this.pqubeId+'Time', timeStamp);
  if (BrowserDetect.browser != "Chrome") {
    timeStamp = pqDate+'T'+pqTime;
  }

  Session.set(this.pqubeId+'Timestamp', timeStamp);
  var pqTimeStamp = new Date (timeStamp);
  var pqubeStatus = Session.get(this.pqubeId+'Status');
  if (pqubeStatus) {
    if (+pqubeStatus.lastNew == +pqTimeStamp) {
      if (pqubeStatus.strikesLeft != 0) {
	pqubeStatus.strikesLeft--;
	Session.set(this.pqubeId+'Status', pqubeStatus);
        return true;
      }
    }
    else resetStatusFlag = true;
  } else resetStatusFlag = true;
  if (resetStatusFlag) {
    pqubeStatus = {
      lastNew: pqTimeStamp,
      strikesLeft: Meteor.settings.public.numStrikes
    };
    Session.set(this.pqubeId+'Status', pqubeStatus);
    return true;
  }
  return false;
};

var updateGauges = function () {
  for (var i=1; i<4; i++) {
    var gaugeSettings = Session.get('gauge'+i);
    if (gaugeSettings) {
      if (gaugeSettings.pqubeId == this.pqubeId) {

        var presentVal = (this.pqubeData[gaugeSettings.dataSource]*gaugeSettings.multiplier);
        Session.set('gauge'+i+'Value', {time: this.now, val: presentVal});
        $('#'+i+'-tunguska-gauge-3').show();
      }
    }
  }
};

var clearGauges = function () {
  for (var i=1; i<4; i++) {
    var gaugeSettings = Session.get('gauge'+i);
    if (gaugeSettings) {
      if (gaugeSettings.pqubeId == this.pqubeId) {
        $('#'+i+'-tunguska-gauge-3').hide();
        var presentVal = (this.pqubeData[gaugeSettings.dataSource]*gaugeSettings.multiplier);
        Session.set('gauge'+i+'Value', {time: this.now, val: ''});

      }
    }
  }
};

var updateScopes = function (pqubeData) {
  Session.set('vL1NGraph', this.pqubeData.vL1NGraph);
  Session.set('vL2NGraph', this.pqubeData.vL2NGraph);
  Session.set('vL3NGraph', this.pqubeData.vL3NGraph);
  Session.set('iL1NGraph', this.pqubeData.iL1NGraph);
  Session.set('iL2NGraph', this.pqubeData.iL2NGraph);
  Session.set('iL3NGraph', this.pqubeData.iL3NGraph);
  var voltVects = {
    l1: {
      magnitude: this.pqubeData.vMagL1N,
      angle: this.pqubeData.vAngL1N
    },
    l2: {
      magnitude: this.pqubeData.vMagL2N,
      angle: this.pqubeData.vAngL2N
    },
    l3: {
      magnitude: this.pqubeData.vMagL3N,
      angle: this.pqubeData.vAngL3N
    }
  };
  Session.set('vVectors', voltVects);
  var currVects = {
    l1: {
      magnitude: this.pqubeData.iMagL1N,
      angle: this.pqubeData.iAngL1N
    },
    l2: {
      magnitude: this.pqubeData.iMagL2N,
      angle: this.pqubeData.iAngL2N
    },
    l3: {
      magnitude: this.pqubeData.iMagL3N,
      angle: this.pqubeData.iAngL3N
    }
  };
  Session.set('iVectors', currVects);


  var kWh = (this.pqubeData.energy/1000);
  Session.set('odometer1', kWh.toFixed(2));
  var kVAh = (this.pqubeData.VAh/1000);
  Session.set('odometer2', kVAh.toFixed(2));
  var kVARh = Math.sqrt((kVAh*kVAh) - (kWh*kWh));
  Session.set('odometer3', kVARh.toFixed(2));
  Session.set('resetDate', this.pqubeData.yearER+'-'+this.pqubeData.monthER+'-'+this.pqubeData.dayER);
};
var clearScopes = function () {
  var emptyGraph = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  Session.set('vL1NGraph', emptyGraph);
  Session.set('vL2NGraph', emptyGraph);
  Session.set('vL3NGraph', emptyGraph);
  Session.set('iL1NGraph', emptyGraph);
  Session.set('iL2NGraph', emptyGraph);
  Session.set('iL3NGraph', emptyGraph);
  Session.set('vVectors', {});
  Session.set('iVectors', {});
};

var blinkNewData = function () {
  Session.set('light_on', true);
  Meteor.setTimeout(function () {
    Session.set('light_on', false);
  }, 250);
};
