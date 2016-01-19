Meteor.startup(function () {
  PQubes.update({}, {$unset: {defaultPQube: ''}}, {multi:true});
  PQubes.update({status: {$nin: ['unverified','unknown']}}, {$set: {status: 'disconnected'}}, {multi: true});
  observePQubes();
  
});
