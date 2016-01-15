Template.initUser.helpers({
  'initUserError': function () {
    return Session.get('initUserFormError');
  },
  'org': function () {
    return Orgs.find().fetch();
  }
});

Template.initUser.events({
  'submit #init-user-form, click #submit-init-user-form': function (e) {
    Session.set('initUserFormError', null);
    e.preventDefault();
    var org = $('#org-select').val();
    var code = $('#org-access-code').val();
    if (!code) {
      Session.set('initUserFormError', 'Code required.');
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
          Session.set('initUserFormError', 'Incorrect access code for organization.');
          $('#org-access-code').focus();
        }
      }
    });
  }
});
