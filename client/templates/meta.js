Template.meta.events({
  'click #open-setup': function (e) {
    e.preventDefault();
    $('#setup-modal').removeClass('hidden');
  }
});
Template.meta.helpers({
  lightStatus: function () {
    return (Session.equals('light_on', true) ? 'on':'off');
  }
});
