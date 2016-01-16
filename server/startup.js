Meteor.startup(function () {
  PQubes.update({org: {$exists: false}}, {$set: {org: 'PSL'}});
  PQubes.update({status: {$ne: 'unverified'}}, {$set: {status: 'disconnected'}});
  observePQubes();
  
});
