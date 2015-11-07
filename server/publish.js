Meteor.publish('pqube1Data', function (fieldsOpts) {
  return PQubeData.find({_id: 'pqube1'}, {fields: fieldsOpts});
});
Meteor.publish('pqube2Data', function (fieldsOpts) {
  return PQubeData.find({_id: 'pqube2'}, {fields: fieldsOpts});
});

Meteor.publish('pqubeData', function (pqube, fieldsOpts) {
  return PQubeData.find({_id: pqube}, {fields: fieldsOpts});  
});

Meteor.publish('pqubes', function () {
  return PQubes.find({status: 'connected'},{fields: {'ip': 0,'port': 0}});
});

Meteor.publish('pqubesManage', function () {
  if (this.userId) {
    return PQubes.find();
  }
  return [];
});
