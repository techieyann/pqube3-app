Meteor.publish('freq', function () {
  return Freq.find();
});
