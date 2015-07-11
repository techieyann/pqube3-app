gaugeDefaults = {
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
      left: -99,
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
    gaugeName: 'freq',
    startVal: 59.89,
    dataSource: 'freq',
    sigFigs: 4,
    tgDigitalUnits: 'Hz',
    tgMajorLegendSigFigs: 2,
    sevenSegment: {
      digits: 6
    },
    tunguskaGauge: {
      range: {
	min: 59.9,
	lowStop: 59.89,
	max: 60.1,
	highStop: 60.11
      },
      tick:{
	major: {
	  interval: .1,
	  first: 59.9,
	  last: 60.101
	}
      }
    }
  },
  thd: {
    gaugeName: 'thd',
    startVal: -0.1,
    dataSource: 'THDL1',
    sigFigs: 2,
    tgDigitalUnits: '%THD',
    tgMajorLegendSigFigs: 1,
    sevenSegment: {
      digits: 4
    },
    tunguskaGauge: {
      range: {
	min: 0,
	lowStop: -.5,
	max: 1,
	highStop: 1.5
      },
      tick:{
	major: {
	  interval: .5,
	  first: 0,
	  last: 1
	}
      }
    }
  },
  l1n: {
    gaugeName: 'l1n',
    startVal: 247.5,
    dataSource: 'vMagL1N',
    sigFigs: 3,
    tgDigitalUnits: 'V',
    tgMajorLegendSigFigs: 1,
    sevenSegment: {
      digits: 6
    },
    tunguskaGauge: {
      range: {
	min: 250,
	lowStop: 247,
	max: 300,
	highStop: 303
      },
      tick:{
	major: {
	  interval: 25,
	  first: 250,
	  last: 300
	}
      }
    }
  }
};
