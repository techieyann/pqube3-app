Meteor.publish('pqube1Data', function (fieldsOpts) {
  return PQubeData.find({_id: 'pqube1'}, {fields: fieldsOpts});
});
Meteor.publish('pqube2Data', function (fieldsOpts) {
  return PQubeData.find({_id: 'pqube2'}, {fields: fieldsOpts});
});

Meteor.publish('pqubeData', function () {
  return PQubeData.find();
});
