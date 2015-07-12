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
	digits: gauge.displayDigits
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
    colorOn: "#00aa00",
    colorBackground: "#013500",
    slant: 3
  },
  tunguskaGauge: {
    range: {
      sweep: 240,
      startAngle: -120
    },
    foreground: {
      image: 'meter_front.png',
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

gaugeList = {
  freq: {
    dataSource: 'freq',
    min: 59.9,
    max: 60.1,
    sigFigs: 4,
    legendSigFigs: 2,
    displayDigits: 6,
    multiplier: 1,
    units: 'Hz'
  },
  l1n: {
    dataSource: 'vMagL1N',
    min: 250,
    max: 300,
    sigFigs: 3,
    legendSigFigs: 1,
    displayDigits: 6,
    multiplier: 1,
    units: 'V'
  },
  thd: {
    dataSource: 'THDL1',
    min: 0,
    max: 1,
    sigFigs: 2,
    legendSigFigs: 1,
    displayDigits: 4,
    multiplier: 1,
    units: '%'
  },
  watts: {
    dataSource: 'watts',
    min: 0,
    max: 100,
    sigFigs: 3,
    legendSigFigs: 1,
    displayDigits: 6,
    multiplier: (1/1000),
    units: 'kW'
  }, 
  vars: {
    dataSource: 'VAR',
    min: 0,
    max: 20,
    sigFigs: 3,
    legendSigFigs: 1,
    displayDigits: 5,
    multiplier: (1/1000),
    units: 'kVAR'
  }, 
  uaneg: {
    dataSource: 'uANeg',
    min: 0,
    max: 10,
    sigFigs: 2,
    legendSigFigs: 1,
    displayDigits: 4,
    multiplier: 1,
    units: '%'
  }, 
  temp: {
    dataSource: 'temp',
    min: 0,
    max: 50,
    sigFigs: 2,
    legendSigFigs: 1,
    displayDigits: 5,
    multiplier: 1,
    units: 'degC'
  }, 
  humidity: {
    dataSource: 'humidity',
    min: 0,
    max: 100,
    sigFigs: 2,
    legendSigFigs: 1,
    displayDigits: 5,
    multiplier: 1,
    units: '%RH'
  }, 
  pressure: {
    dataSource: 'pressure',
    min: 0,
    max: 100,
    sigFigs: 3,
    legendSigFigs: 1,
    displayDigits: 5,
    multiplier: (1/100),
    units: 'hPa'
  }
};
