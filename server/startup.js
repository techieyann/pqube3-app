Meteor.startup(function () {
  PQubes.update({org: {$exists: false}}, {$set: {org: 'PSL'}}, {multi: true});
  PQubes.update({status: {$ne: 'unverified'}}, {$set: {status: 'disconnected'}}, {multi: true});
  observePQubes();
  
});
