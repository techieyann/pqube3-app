Meteor.startup(function () {
  Meteor.users.update({}, {$unset: {'profile.accessCode': ''}}, {multi:true});
  PQubes.update({status: {$nin: ['unverified','unknown']}}, {$set: {status: 'disconnected'}}, {multi: true});
  observePQubes();
  
});
