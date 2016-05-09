processMeters = function () {
  var meters = Meters.findOne('masterList');

    Meters.upsert({
      _id: 'masterList'
    }, {
      meters: meterList,
      groups: meterGroups
    });


  Meters.update(
    {_id: {$ne: 'masterList'}},
    {
      $set: {
        defaults: defaultMeters,
        selected: meterList
      }    
    }, {multi: true}
  );
  
};

var defaultMeters = [
  'freq',
  'watts',
  'l1n'
];

var meterGroups = {
  voltage: 'Voltage',
  current: 'Current and Power',
  probe: 'Probes and Other'
};


var meterList = {
  freq: {
    group: 'voltage',
    dataSource: 'freq',
    scale: {
      anchor: 'center',
      val: 60,
      init: .1
    },
    sigFigs: 4,
    legendSigFigs: 2,
    multiplier: 1,
    units: 'hz'
  },
  iL1: {
    group: 'current',
    dataSource: 'iL1',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1,
    units: 'amps'
  },
  iL2: {
    group: 'current',    
    dataSource: 'iL2',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1,
    units: 'amps'    
  },
  iL3: {
    group: 'current',    
    dataSource: 'iL3',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1,
    units: 'amps'    
  },
  l1n: {
    group: 'voltage',    
    dataSource: 'vMagL1N',
    scale: {
      anchor: 'center',
      val: 280,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1,
    units: 'vrms'
  },
  thd: {
    group: 'voltage',    
    dataSource: 'THDL1',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 2,
    legendSigFigs: 1,
    multiplier: 1,
    units: '%thd'
  },
  watts: {
    group: 'current',
    dataSource: 'watts',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: (1/1000),
    units: 'kw'
  }, 
  vars: {
    group: 'current',    
    dataSource: 'VAR',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: (1/1000),
    units: 'kvar'
  }, 
  uaneg: {
    group: 'current',    
    dataSource: 'uANeg',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 2,
    legendSigFigs: 1,
    multiplier: 1,
    units: '%'
  }, 
  temp: {
    group: 'probe',
    dataSource: 'temp',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 2,
    legendSigFigs: 1,
    multiplier: 1,
    units: 'c'
  }, 
  humidity: {
    group: 'probe',    
    dataSource: 'humidity',
    scale: {
      anchor: 'min',
      val: 0,
      init: 1
    },
    sigFigs: 2,
    legendSigFigs: 1,
    multiplier: 1,
    units: '%rh'
  }, 
  pressure: {
    group: 'probe',    
    dataSource: 'pressure',
    scale: {
      anchor: 'center',
      val: 10,
      init: .5
    },
    sigFigs: 4,
    legendSigFigs: 1,
    multiplier: (1/100),
    units: 'hpa'
  },
  xAcc: {
    group: 'probe',    
    dataSource: 'xAcc',
    scale: {
      anchor: 'center',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1,
    units: 'm/s/s'
  },
  yAcc: {
    group: 'probe',    
    dataSource: 'yAcc',
    scale: {
      anchor: 'center',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1,
    units: 'm/s/s'    
  },
  zAcc: {
    group: 'probe',    
    dataSource: 'zAcc',
    scale: {
      anchor: 'center',
      val: 0,
      init: 1
    },
    sigFigs: 3,
    legendSigFigs: 1,
    multiplier: 1,
    units: 'm/s/s'
  }
};
