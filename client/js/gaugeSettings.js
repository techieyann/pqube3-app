getGaugeSettings = function (name, meterNum) {
  var gauge = gaugeList[name];
  if (gauge) {
    var range = gauge.max-gauge.min;
    var extendSettings = {
      gaugeName: name,
      prefix: meterNum,
      dataSource: gauge.dataSource,
      sigFigs: gauge.sigFigs,
      units: gauge.units,
      legendSigFigs: gauge.legendSigFigs,
      multiplier: gauge.multiplier,
      sevenSegment: {
        pattern: getPattern(gauge.displayDigits, gauge.sigFigs)
      },
      tunguskaGauge: {
	id: meterNum+'-tunguska-gauge',
	range: {
	  min: gauge.min,
	  lowStop: gauge.min-(range/20),
	  max: gauge.max,
	  highStop: gauge.max+(range/20)
	},
	tick: {
	  major: {
	    first: gauge.min,
	    last: gauge.max,
	    interval: range/2
	  }
	}
      }
    };
    var settings = $.extend(true, 
			    {}, 
			    gaugeDefaults, 
			    extendSettings);

    return settings;
  }
  return {};
};

var gaugeDefaults = {
  sevenSegment: {
    colorOff: "#004200", 
    colorOn: "#00aa00"
  },
  tunguskaGauge: {
    range: {
      sweep: 240,
      startAngle: -120
    },
    foreground: {
      image: 'images/meter_front.png',
      left: -98,
      top: -96
    },
    digital: {
      font: '18px sans serif',
      color: '#333',
      top:57,
      left:0
    },
    tick: {
      minor: {
	alpha: 0
      },
      major: {
	lineWidth: 0,
	startAt: 1,
	endAt: 1,
	legend: {
	  color: '#555',
	  font: '14px sans serif',
	  radius: .60
	}
      }
    }
  }
};

getPattern = function (numDigits, numSigFigs) {
  var pattern = '';
  for (var i=0;i<numDigits-numSigFigs; i++) {
    pattern = pattern + '#';
  }
  if (numSigFigs) {
    pattern = pattern + '.';
    for (i=0;i<numSigFigs; i++) {
      pattern = pattern + '#';
    }
  }
  return pattern;
};

alignToPattern = function (value, pattern) {
  var lengthDiff = pattern.length - value.length;
  if (lengthDiff) {
    var alignedValue = '';
    for (var i = 0; i<lengthDiff; i++) {
      alignedValue += ' ';
    }
    alignedValue += value;
    return alignedValue;
  }
  else return value;
  
};

gaugeList = {
  freq: {
    dataSource: 'freq',
    min: 59.9,
    max: 60.1,
    sigFigs: 4,
    legendSigFigs: 2,
    displayDigits: 6,
    multiplier: 1
  },
  l1n: {
    dataSource: 'vMagL1N',
    min: 250,
    max: 300,
    sigFigs: 3,
    legendSigFigs: 1,
    displayDigits: 6,
    multiplier: 1
  },
  thd: {
    dataSource: 'THDL1',
    min: 0,
    max: 1,
    sigFigs: 2,
    legendSigFigs: 1,
    displayDigits: 4,
    multiplier: 1
  },
  watts: {
    dataSource: 'watts',
    min: 0,
    max: 100,
    sigFigs: 3,
    legendSigFigs: 1,
    displayDigits: 6,
    multiplier: (1/1000)
  }, 
  vars: {
    dataSource: 'VAR',
    min: 0,
    max: 20,
    sigFigs: 3,
    legendSigFigs: 1,
    displayDigits: 5,
    multiplier: (1/1000)
  }, 
  uaneg: {
    dataSource: 'uANeg',
    min: 0,
    max: 10,
    sigFigs: 2,
    legendSigFigs: 1,
    displayDigits: 4,
    multiplier: 1
  }, 
  temp: {
    dataSource: 'temp',
    min: 0,
    max: 50,
    sigFigs: 2,
    legendSigFigs: 1,
    displayDigits: 5,
    multiplier: 1
  }, 
  humidity: {
    dataSource: 'humidity',
    min: 0,
    max: 100,
    sigFigs: 2,
    legendSigFigs: 1,
    displayDigits: 5,
    multiplier: 1
  }, 
  pressure: {
    dataSource: 'pressure',
    min: 9.5,
    max: 10.5,
    sigFigs: 4,
    legendSigFigs: 1,
    displayDigits: 6,
    multiplier: (1/100)
  }
};
