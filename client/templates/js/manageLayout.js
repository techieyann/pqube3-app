Template.manageLayout.events({
  'click #nav-new-pqube': function (e) {
    Meteor.setTimeout(function () {
      $('#new-pqube-name').focus();
    }, 200);
  }
});
