Template.initUser.helpers({
  'org': function () {
    return Orgs.find().fetch();
  }
});

Template.initUser.events({
  'submit #init-user-form, click #submit-init-user-form': function (e) {
    Session.set('formError', null);
    e.preventDefault();
    var org = $('#org-select').val();
    var code = $('#org-access-code').val();
    if (!code) {
      Session.set('formError', 'Code required.');
      $('#org-access-code').focus();
      return;
    }
    var accessTest = {
      orgId: org,
      code: code
    };
    Meteor.call('grantAccess', accessTest, function (err, result) {
      if (err) console.log(err);
      else {
        if (result) {
          FlowRouter.go('/manage');
        }
        else {
          Session.set('formError', 'Incorrect access code for organization.');
          $('#org-access-code').focus();
        }
      }
    });
  }
});
