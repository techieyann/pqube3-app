Template.manageLayout.onRendered(function () {
  $('#modal').on('hidden.bs.modal', function () {
    FlowRouter.go('/manage');
    Session.set('editPQubeFormError', null);
  });
});

Template.manageLayout.events({
  'click #nav-new-pqube': function (e) {
    Meteor.setTimeout(function () {
      $('#new-pqube-name').focus();
    }, 200);
  }
});
