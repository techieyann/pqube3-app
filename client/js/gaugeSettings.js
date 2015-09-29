getGaugeSettings = function (name, meterNum) {
  var gauge = gaugeList[name];
  if (gauge) {
    var extendSettings = {
      gaugeName: name,
      prefix: meterNum,
      dataSource: gauge.dataSource,
      sigFigs: gauge.sigFigs,
      units: gauge.units,
      legendSigFigs: gauge.legendSigFigs,
      multiplier: gauge.multiplier,
      sevenSegment: {
        pattern: getPattern(gauge.sigFigs)
      },
      tunguskaGauge: {
	id: meterNum+'-tunguska-gauge'
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

getPattern = function (numSigFigs) {
  var numDigits = 6;
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
    scale: {
      anchor: 'center',
      val: 60,
      init: .1
    },
    sigFigs: 4,
    legendSigFigs: 2,
    multiplier: 1
  },
  iL1: {
    dataSource: 'iL1',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1
  },
  iL2: {
    dataSource: 'iL2',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1
  },
  iL3: {
    dataSource: 'iL3',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1
  },
  l1n: {
    dataSource: 'vMagL1N',
    scale: {
      anchor: 'center',
      val: 280,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1
  },
  thd: {
    dataSource: 'THDL1',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 2,
    legendSigFigs: 1,
    multiplier: 1
  },
  watts: {
    dataSource: 'watts',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: (1/1000)
  }, 
  vars: {
    dataSource: 'VAR',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: (1/1000)
  }, 
  uaneg: {
    dataSource: 'uANeg',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 2,
    legendSigFigs: 1,
    multiplier: 1
  }, 
  temp: {
    dataSource: 'temp',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 2,
    legendSigFigs: 1,
    multiplier: 1
  }, 
  humidity: {
    dataSource: 'humidity',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 2,
    legendSigFigs: 1,
    multiplier: 1
  }, 
  pressure: {
    dataSource: 'pressure',
    scale: {
      anchor: 'center',
      val: 10,
      init: .5
    },
    sigFigs: 4,
    legendSigFigs: 1,
    multiplier: (1/100)
  },
  xAcc: {
    dataSource: 'xAcc',
    scale: {
      anchor: 'center',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1
  },
  yAcc: {
    dataSource: 'yAcc',
    scale: {
      anchor: 'center',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1
  },
  zAcc: {
    dataSource: 'zAcc',
    scale: {
      anchor: 'center',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1
  }/*,
  L12k9k: {
    dataSource: 'L1E2k9k',
    min: 0,
    max: 1,
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1    
  },
  L18k150k: {
    dataSource: 'L1E8k150k',
    min: 0,
    max: 1,
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1    
  }*/
};
