var dataInterval;
startDataInterval = function () {
  dataInterval = Meteor.setInterval(function () {
    Tracker.nonreactive(setPresentVals);
  },500);
};

stopDataInterval = function () {
  if (dataInterval) {
    Meteor.stopInterval(dataInterval);
    dataInterval = null;
  }
};
function pad2(number) { return (number < 10 ? '0' : '') + number; }

var strikeFlag;

var setPresentVals = function () {
  var dC = {
    now:new Date().getTime()
  };
  var pqubeData = PQubeData.find();
  pqubeData.forEach(function (pqube) {
    dC.pqubeId = pqube._id;
    dC.pqubeData = pqube;
    dC.scopesFlag = Session.equals('scopesSource', dC.pqubeId);
    strikeFlag = false;
    if(newVals.call(dC)) {
      if (dC.scopesFlag) {
        blinkNewData.call(dC);
        updateScopes.call(dC);
        if (Session.get('spectraSelected'))
          updateSpectra.call(dC);
      }
      updateGauges.call(dC);
    }
    else {
      clearGauges.call(dC);
    }
    Tracker.flush();
});



};

var newVals = function () {
  var pqube = PQubes.findOne(this.pqubeId);
  if (pqube) {
    if (pqube.status == 'connected') {
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
      var numStrikes = Meteor.settings.public.numStrikes;
      if (pqubeStatus) {
	if (+pqubeStatus.lastNew == +pqTimeStamp) {
	  if (pqubeStatus.strikesLeft != 0) {
            if (pqubeStatus.strikesLeft-- < numStrikes - 2)
              strikeFlag = true;
            Session.set(this.pqubeId+'Status', pqubeStatus);
            return true;
	  }
	}
	else resetStatusFlag = true;
      } else resetStatusFlag = true;
      if (resetStatusFlag) {
	pqubeStatus = {
	  lastNew: pqTimeStamp,
	  strikesLeft: numStrikes
	};
	Session.set(this.pqubeId+'Status', pqubeStatus);
	return true;
      }
    }
  }
  return false;
};

var updateGauges = function () {
  for (var i=1; i<4; i++) {
    var gaugeSettings = Session.get('gauge'+i);
    if (gaugeSettings) {
      if (gaugeSettings.pqubeId == this.pqubeId) {
        var presentVal = (this.pqubeData[gaugeSettings.dataSource]*gaugeSettings.multiplier);
        if (isNaN(presentVal)) presentVal = '';
        var gaugeValue = {
          time: this.now, 
          val: presentVal,
          strike: strikeFlag
        };
        Session.set('gauge'+i+'Value', gaugeValue);
      }
    }
  }
};

var clearGauges = function () {
  for (var i=1; i<4; i++) {
    var gaugeSettings = Session.get('gauge'+i);
    if (gaugeSettings) {
      if (gaugeSettings.pqubeId == this.pqubeId) {
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
  if (this.pqubeData.vL1NGraph) {
    var vArrays = this.pqubeData.vL1NGraph.concat(this.pqubeData.vL2NGraph, this.pqubeData.vL3NGraph);
    var vMax = Math.max.apply(null, vArrays);
    var vMin = Math.min.apply(null, vArrays);
    var vAbsMax = Math.max(Math.abs(vMax), Math.abs(vMin));
    scopeRescale('voltageScopeScale', vAbsMax);
  }
  if (this.pqubeData.iL1NGraph) {
    var iArrays = this.pqubeData.iL1NGraph.concat(this.pqubeData.iL2NGraph, this.pqubeData.iL3NGraph);
    var iMax = Math.max.apply(null, iArrays);
    var iMin = Math.min.apply(null, iArrays);
    var iAbsMax = Math.max(Math.abs(iMax), Math.abs(iMin));
    scopeRescale('currentScopeScale', iAbsMax);
  }
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

var updateSpectra = function () {
  var spectraSource = Session.get('spectraSource');
  var spectraSelectors = spectraList[spectraSource].dataSources;
  var spectraArray = [];
  var max = 0;
  var type = spectraList[spectraSource].type;
  for (var i=0; i<spectraSelectors.length; i++) {
    var maxArray;
    if (type == 'harmonic')
      maxArray = this.pqubeData[spectraSelectors[i]].slice(1);
    else
      maxArray = this.pqubeData[spectraSelectors[i]];
    var thisMax = Math.max.apply(null, maxArray);
    max = Math.max(max, thisMax);
    if (type == 'harmonic') 
      spectraArray.push([].concat.apply([],[[0],this.pqubeData[spectraSelectors[i]]]));
    else
      spectraArray.push(this.pqubeData[spectraSelectors[i]]);
  }
  
//  console.log(up125(max));
  var spectraData = {
    dataSet: spectraArray,
    type: spectraList[spectraSource].type,
    scale: up125(max)
  };
  if (type == 'harmonic') {
    spectraData.fund1 = spectraArray[0][1].toFixed(3);
    spectraData.fund2 = spectraArray[1][1].toFixed(3);
    spectraData.fund3 = spectraArray[2][1].toFixed(3);
  }
  Session.set('spectraData', spectraData);
};

var blinkNewData = function () {
  Session.set('light_on', true);
  Meteor.setTimeout(function () {
    Session.set('light_on', false);
  }, 250);
};
