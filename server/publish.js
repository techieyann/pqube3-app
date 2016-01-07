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

Meteor.publish('meters', function () {
  return Meters.find();
});
