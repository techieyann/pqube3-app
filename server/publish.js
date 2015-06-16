Meteor.publish('pqubeData', function () {
  return PQubeData.find();
});
