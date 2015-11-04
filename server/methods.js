Meteor.methods({
  'checkAccess': function (accessCode) {
    return (accessCode != process.env.accessCode);
  }
});
