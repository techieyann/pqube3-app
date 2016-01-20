Template.initUser.helpers({
  'org': function () {
    return Orgs.find().fetch();
  }
});

Template.initUser.events({
  'submit #init-user-form, click #submit-init-user-form': function (e) {
    Session.set('formError', null);
    e.preventDefault();
    var orgId = $('#org-select').val();
    var code = $('#org-access-code').val();
    if (!code) {
      Session.set('formError', TAPi18n.__('errCodeRequired'));
      $('#org-access-code').focus();
      return;
    }
    var accessTest = {
      orgId: orgId,
      code: code
    };
    Meteor.call('grantAccess', accessTest, function (err, result) {
      if (err) console.log(err);
      else {
        switch (result) {
        case 'admin':
        case 'manage':
          Meteor.setTimeout(function () {
            FlowRouter.go('/manage');
          }, 200);
          break;
        case 'view':
          var org = Orgs.findOne(orgId);
          if (org) {
            FlowRouter.go('/'+org.slug);
            sAlert.success(TAPi18n.__('succViewPermission'));
          }
          else {
            FlowRouter.go('/');
            sAlert.warning(TAPi18n.__('errOrgNotFound'));
          }
          break;
        case 'none':
        default:
          Session.set('formError', TAPi18n.__('errBadCode'));
          $('#org-access-code').focus();
          break;
        }
      }
    });
  }
});
