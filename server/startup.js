Meteor.startup(function () {
  PQubes.update({status: {$ne: 'unverified'}}, {$set: {status: 'disconnected'}});
  observePQubes();
});
