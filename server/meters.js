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
    multiplier: 1
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
    multiplier: 1
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
    multiplier: 1
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
    multiplier: 1
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
    multiplier: 1
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
    multiplier: 1
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
    multiplier: (1/1000)
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
    multiplier: (1/1000)
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
    multiplier: 1
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
    multiplier: 1
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
    multiplier: 1
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
    multiplier: (1/100)
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
    multiplier: 1
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
    multiplier: 1
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
