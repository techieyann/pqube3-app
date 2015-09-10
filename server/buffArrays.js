buffArrays = {
  freqArray: [
    {name: 'freq', start:0, type:'float'}
  ],
  vectArray: [
    {name: 'vMagL1N', start:0, type:'float'},
    {name: 'vAngL1N', start:4, type:'float'},
    {name: 'vMagL2N', start:8, type:'float'},
    {name: 'vAngL2N', start:12, type:'float'},
    {name: 'vMagL3N', start:16, type:'float'},
    {name: 'vAngL3N', start:20, type:'float'},
    {name: 'iMagL1', start:24, type:'float'},
    {name: 'iAngL1', start:28, type:'float'},
    {name: 'iMagL2', start:32, type:'float'},
    {name: 'iAngL2', start:36, type:'float'},
    {name: 'iMagL3', start:40, type:'float'},
    {name: 'iAngL3', start:44, type:'float'},
  ],
  THDarray: [
    {name: 'THDL1', start:0, type:'float'}
  ],

  LNarray: [
    {name: 'vMagL1N', start:0, type:'float'}
  ],

  freqVectArray: [
    {name: 'freq', start:0, type:'float'},
    {name: 'vMagL1N', start:4, type:'float'},
    {name: 'vMagL2N', start:8, type:'float'},
    {name: 'vMagL3N', start:12, type:'float'},
    {name: 'vAngL1N', start:16, type:'float'},
    {name: 'vAngL2N', start:20, type:'float'},
    {name: 'vAngL3N', start:24, type:'float'}
  ],

  currentArray: [
    {name: 'iL1', start: 0, type:'float'},
    {name: 'iL2', start: 4, type:'float'},
    {name: 'iL3', start: 8, type:'float'},
    {name: 'iMagL1N', start:32, type:'float'},
    {name: 'iMagL2N', start:36, type:'float'},
    {name: 'iMagL3N', start:40, type:'float'},
    {name: 'iAngL1N', start:44, type:'float'},
    {name: 'iAngL2N', start:48, type:'float'},
    {name: 'iAngL3N', start:52, type:'float'}
  ],

  wPowerArray: [
    {name: 'uANeg', start:0, type:'float'},
    {name: 'watts', start:8, type:'float'},
    {name: 'VAR', start:24, type:'float'},
    {name: 'VARh', start:72, type:'float'},
    {name: 'energy', start:88, type:'float'},
    {name: 'VAh', start:104, type:'float'},
    {name: 'yearER', start: 156, type:'float'},
    {name: 'monthER', start: 160, type:'float'},
    {name: 'dayER', start: 164, type:'float'}
  ],

  ambientArray: [
    {name: 'temp', start:0, type:'float'},
    {name: 'humidity', start:4, type:'float'},
    {name: 'pressure', start:8, type:'float'},
    {name: 'L1E2k9k', start:64, type:'float'},
    {name: 'L1E8k150k', start:72, type:'float'},
    {name: 'pqYear', start: 140, type:'float'},
    {name: 'pqMonth', start: 144, type:'float'},
    {name: 'pqDay', start: 148, type:'float'},
    {name: 'pqHour', start: 152, type:'float'},
    {name: 'pqMinute', start: 156, type:'float'},
    {name: 'pqSecond', start: 160, type:'float'}
  ],
  accArray: [
    {name: 'xAcc', start:0, type:'float'},
    {name: 'yAcc', start:12, type:'float'},
    {name: 'zAcc', start:24, type:'float'}
  ]
};


chartFields = function (length) {
  var fields = [];
  for (var i=0; i<length; i++) {
    fields.push({name: i, start: (i*4), type: 'float'}); 
  }
  return fields;
}
