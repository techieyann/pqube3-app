Meteor.subscribe('pqubeData', function () {
  Tracker.nonreactive(function () {
    setPresentVals();
  });
});
