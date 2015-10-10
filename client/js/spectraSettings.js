var HarmonicsLabelsArray = [
  TAPi18n.__('DC'),
  TAPi18n.__('fund'),
  TAPi18n.__('2'),
  TAPi18n.__('3'),
  TAPi18n.__('4'),
  TAPi18n.__('5'),
  TAPi18n.__('6'),
  TAPi18n.__('7'),
  TAPi18n.__('8'),
  TAPi18n.__('9'),
  TAPi18n.__('10'),
  TAPi18n.__('11'),
  TAPi18n.__('12'),
  TAPi18n.__('13'),
  TAPi18n.__('14'),
  TAPi18n.__('15'),
  TAPi18n.__('16'),
  TAPi18n.__('17'),
  TAPi18n.__('18'),
  TAPi18n.__('19'),
  TAPi18n.__('20'),
  TAPi18n.__('21'),
  TAPi18n.__('22'),
  TAPi18n.__('23'),
  TAPi18n.__('24'),
  TAPi18n.__('25'),
  TAPi18n.__('26'),
  TAPi18n.__('27'),
  TAPi18n.__('28'),
  TAPi18n.__('29'),
  TAPi18n.__('30'),
  TAPi18n.__('31'),
  TAPi18n.__('32'),
  TAPi18n.__('33'),
  TAPi18n.__('34'),
  TAPi18n.__('35'),
  TAPi18n.__('36'),
  TAPi18n.__('37'),
  TAPi18n.__('38'),
  TAPi18n.__('39'),
  TAPi18n.__('40'),
  TAPi18n.__('41'),
  TAPi18n.__('42'),
  TAPi18n.__('43'),
  TAPi18n.__('44'),
  TAPi18n.__('45'),
  TAPi18n.__('46'),
  TAPi18n.__('47'),
  TAPi18n.__('48'),
  TAPi18n.__('49')
];

var L1E2k9kLabelsArray = [
  TAPi18n.__('2'),
  TAPi18n.__('2.2'),
  TAPi18n.__('2.4'),
  TAPi18n.__('2.6'),
  TAPi18n.__('2.8'),
  TAPi18n.__('3'),
  TAPi18n.__('3.2'),
  TAPi18n.__('3.4'),
  TAPi18n.__('3.6'),
  TAPi18n.__('3.8'),
  TAPi18n.__('4'),
  TAPi18n.__('4.2'),
  TAPi18n.__('4.4'),
  TAPi18n.__('4.6'),
  TAPi18n.__('4.8'),
  TAPi18n.__('5'),
  TAPi18n.__('5.2'),
  TAPi18n.__('5.4'),
  TAPi18n.__('5.6'),
  TAPi18n.__('5.8'),
  TAPi18n.__('6'),
  TAPi18n.__('6.2'),
  TAPi18n.__('6.4'),
  TAPi18n.__('6.6'),
  TAPi18n.__('6.8'),
  TAPi18n.__('7'),
  TAPi18n.__('7.2'),
  TAPi18n.__('7.4'),
  TAPi18n.__('7.6'),
  TAPi18n.__('7.8'),
  TAPi18n.__('8'),
  TAPi18n.__('8.2'),
  TAPi18n.__('8.4'),
  TAPi18n.__('8.6'),
  TAPi18n.__('8.8'),
  TAPi18n.__('9')
];

spectraList = {
  L123NvHarmonics: {
    labels: HarmonicsLabelsArray,
    type: 'harmonic',
    length: 49,
    units: {
      y: 'volts',
      x: 'harmonic'
    },
    dataSources: [
      'vL1NHarmonics',
      'vL2NHarmonics',
      'vL3NHarmonics'
    ],
    colors: [
      'red',
      'yellow',
      '#0066FF'
    ]
  },
  L123iHarmonics: {
    labels: HarmonicsLabelsArray,
    type: 'harmonic',
    length: 49,
    units: {
      y: 'amps',
      x: 'harmonic'
    },
    dataSources: [
      'iL1Harmonics',
      'iL2Harmonics',
      'iL3Harmonics'
    ],
    colors: [
      'red',
      'yellow',
      '#0066FF'
    ]
  },
  L123E2k9k: {
    labels: L1E2k9kLabelsArray,
    type: 'freq',
    length: 36,
    units: {
      y: 'volts',
      x: 'kHz'
    },
    dataSources: [
      'L1E2k9kChart',
      'L2E2k9kChart',
      'L3E2k9kChart'
    ],
    colors: [
      'red',
      'yellow',
      '#0066FF'
    ]
  }/*,
  L1E8k150k: {
    labels: [],
    type: 'freq',
    length: 22,
    dataSource: 'L1E8k150kChart'
  }*/
};


