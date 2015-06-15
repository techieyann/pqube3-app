Template.setup.events({
  'click .close-setup': function (e) {
    e.preventDefault();
    $('#setup-modal').addClass('hidden');
  }
});
