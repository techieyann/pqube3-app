var HarmonicsLabelsArray = [
  TAPi18n.__('1st'),
  TAPi18n.__('2nd'),
  TAPi18n.__('3rd'),
  TAPi18n.__('4th'),
  TAPi18n.__('5th'),
  TAPi18n.__('6th'),
  TAPi18n.__('7th'),
  TAPi18n.__('8th'),
  TAPi18n.__('9th'),
  TAPi18n.__('10th'),
  TAPi18n.__('11th'),
  TAPi18n.__('12th'),
  TAPi18n.__('13th'),
  TAPi18n.__('14th'),
  TAPi18n.__('15th'),
  TAPi18n.__('16th'),
  TAPi18n.__('17th'),
  TAPi18n.__('18th'),
  TAPi18n.__('19th'),
  TAPi18n.__('20th'),
  TAPi18n.__('21st'),
  TAPi18n.__('22nd'),
  TAPi18n.__('23rd'),
  TAPi18n.__('24th'),
  TAPi18n.__('25th'),
  TAPi18n.__('26th'),
  TAPi18n.__('27th'),
  TAPi18n.__('28th'),
  TAPi18n.__('29th'),
  TAPi18n.__('30th'),
  TAPi18n.__('31st'),
  TAPi18n.__('32nd'),
  TAPi18n.__('33rd'),
  TAPi18n.__('34th'),
  TAPi18n.__('35th'),
  TAPi18n.__('36th'),
  TAPi18n.__('37th'),
  TAPi18n.__('38th'),
  TAPi18n.__('39th'),
  TAPi18n.__('40th'),
  TAPi18n.__('41st'),
  TAPi18n.__('42nd'),
  TAPi18n.__('43rd'),
  TAPi18n.__('44th'),
  TAPi18n.__('45th'),
  TAPi18n.__('46th'),
  TAPi18n.__('47th'),
  TAPi18n.__('48th'),
  TAPi18n.__('49th')
];

var L1E2k9kLabelsArray = [
  TAPi18n.__('2kHz'),
  TAPi18n.__('2.2kHz'),
  TAPi18n.__('2.4kHz'),
  TAPi18n.__('2.6kHz'),
  TAPi18n.__('2.8kHz'),
  TAPi18n.__('3kHz'),
  TAPi18n.__('3.2kHz'),
  TAPi18n.__('3.4kHz'),
  TAPi18n.__('3.6kHz'),
  TAPi18n.__('3.8kHz'),
  TAPi18n.__('4kHz'),
  TAPi18n.__('4.2kHz'),
  TAPi18n.__('4.4kHz'),
  TAPi18n.__('4.6kHz'),
  TAPi18n.__('4.8kHz'),
  TAPi18n.__('5kHz'),
  TAPi18n.__('5.2kHz'),
  TAPi18n.__('5.4kHz'),
  TAPi18n.__('5.6kHz'),
  TAPi18n.__('5.8kHz'),
  TAPi18n.__('6kHz'),
  TAPi18n.__('6.2kHz'),
  TAPi18n.__('6.4kHz'),
  TAPi18n.__('6.6kHz'),
  TAPi18n.__('6.8kHz'),
  TAPi18n.__('7kHz'),
  TAPi18n.__('7.2kHz'),
  TAPi18n.__('7.4kHz'),
  TAPi18n.__('7.6kHz'),
  TAPi18n.__('7.8kHz'),
  TAPi18n.__('8kHz'),
  TAPi18n.__('8.2kHz'),
  TAPi18n.__('8.4kHz'),
  TAPi18n.__('8.6kHz'),
  TAPi18n.__('8.8kHz'),
  TAPi18n.__('9kHz')
];

spectraList = {
  L1NvHarmonics: {
    labels: HarmonicsLabelsArray,
    type: 'harmonic',
    length: 49,
    units: 'volts',
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
  L1NiHarmonics: {
    labels: HarmonicsLabelsArray,
    type: 'harmonic',
    length: 49,
    units: 'amps',
    dataSources: [
      'iL1NHarmonics',
      'iL2NHarmonics',
      'iL3NHarmonics'
    ],
    colors: [
      'red',
      'yellow',
      '#0066FF'
    ]
  },
  L1E2k9k: {
    labels: L1E2k9kLabelsArray,
    type: 'freq',
    length: 36,
    dataSources: ['L1E2k9kChart'],
    colors: [
      'rgba(0,163,0,0.5)'
    ]
  }/*,
  L1E8k150k: {
    labels: [],
    type: 'freq',
    length: 22,
    dataSource: 'L1E8k150kChart'
  }*/
};


