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

spectraList = {
  L1NvHarmonics: {
    labels: HarmonicsLabelsArray,
    type: 'harmonic',
    length: 49,
    units: 'volts',
    dataSource: 'vL1NHarmonics'
  },
  L1NiHarmonics: {
    labels: HarmonicsLabelsArray,
    type: 'harmonic',
    length: 49,
    units: 'amps',
    dataSource: 'iL1NHarmonics'
  },
  L1E2k9k: {
    labels: [],
    length: 32,
    dataSource: 'L1E2k9kChart'
  },
  L1E8k150k: {
    labels: [],
    length: 22,
    dataSource: 'L1E8k150kChart'
  }
};


