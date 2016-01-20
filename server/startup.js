Meteor.startup(function () {
  PQubes.update({}, {$set: {visibility: 'public'}}, {multi:true});
  PQubes.update({status: {$nin: ['unverified','unknown']}}, {$set: {status: 'disconnected'}}, {multi: true});
  observePQubes();
  
});
