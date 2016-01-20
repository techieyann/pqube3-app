Template.accessOrg.onRendered(function () {
  var orgSlug = FlowRouter.current().params.orgSlug;
  this.autorun(function () {
  var org = Orgs.findOne({slug: orgSlug});
  if (org) {
    if (Roles.userIsInRole(Meteor.user(), ['view', 'manage'], org._id) || isAdmin())
      FlowRouter.go('/'+orgSlug);
  }
  });
  $('#org-access-code').focus();
  
});
Template.accessOrg.events({
  'submit #access-org-form, click #submit-access-org-form': function (e) {
    Session.set('formError', null);
    e.preventDefault();
    var orgSlug = FlowRouter.current().params.orgSlug;
    var org = Orgs.findOne({slug: orgSlug});
    if (org) {
      var code = $('#org-access-code').val();
      if (!code) {
        Session.set('formError', TAPi18n.__('errCodeRequired'));
        $('#org-access-code').focus();
        return;
      }
      var accessTest = {
        orgId: org._id,
        code: code
      };
      if (Meteor.user()) {
      Meteor.call('grantAccess', accessTest, function (err, result) {
        if (err) console.log(err);
        else {
          switch (result) {
          case 'manage':
          case 'view':
            if (org) {
              Meteor.setTimeout(function () {
              FlowRouter.go('/'+org.slug);
                sAlert.success(TAPi18n.__('succViewPermission'));
              }, 200);
            }
            break;
          case 'none':
          default:
            Session.set('formError', TAPi18n.__('errBadCode'));
            $('#org-access-code').val('').focus();
            break;
          }
        }
      });
      }
      else {
        Meteor.call('tempAccess', accessTest, function (err, result) {
          if (err) console.log(err);
          else {
            if (result) {
            Session.set('view'+org._id, true);
              Meteor.setTimeout(function () {
              FlowRouter.go('/'+org.slug);
              }, 200);
            }
            else {
              Session.set('formError', TAPi18n.__('errBadCode'));
              $('#org-access-code').val('').focus();
            }
          }
        });
      }
    }
  }
});
