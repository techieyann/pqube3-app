Meteor.startup(function () {
  PQubes.update({status: {$nin: ['unverified','unknown']}}, {$set: {status: 'disconnected'}}, {multi: true});
  observePQubes();
  
});
