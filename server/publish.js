Meteor.publish('pqube1Data', function (fieldsOpts) {
  return PQubeData.find({_id: 'pqube1'}, {fields: fieldsOpts});
});
Meteor.publish('pqube2Data', function (fieldsOpts) {
  return PQubeData.find({_id: 'pqube2'}, {fields: fieldsOpts});
});

Meteor.publish('pqubeData', function () {
  return PQubeData.find();
});

Meteor.publish('pqubes', function () {
  var findOpts = {
    fields: {
      'ip': 0,
      'port': 0
    }
  };
  if (this.userId) {
    findOpts = {};
  }
  return PQubes.find({}, findOpts);
});
