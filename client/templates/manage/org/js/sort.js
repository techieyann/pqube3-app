Template.sortPQubes.onRendered(function () {
  $('#pqube-order').sortable();
});

Template.sortPQubes.helpers({

});

Template.sortPQubes.events({
  'click #save-pqube-order': function (e) {
    e.preventDefault();
    var orgId;
    if (isAdmin()) {
      var paramOrgId = FlowRouter.current().params.orgId;
      if (paramOrgId) {
        orgId = paramOrgId;
      }
      else {
        orgId = 'PSL';
      }
    }
    else {
      var groups = Roles.getGroupsForUser(Meteor.user(), 'manage');
      if (groups) {
        orgId = groups[0];
      }
    }
    if (orgId) {
      console.log(orgId);
      var order = $('#pqube-order').sortable('toArray');
      Meteor.call('reorderPQubes', order, orgId, function (err) {
        if (err) {
          sAlert.warning(err.message);
        }
        else {
          $('#modal').modal('hide');
          Meteor.setTimeout(function () {
            sAlert.success(TAPi18n.__('succReorder'));
          }, 400);
        }
      });
    }
    else {
      $('#modal').modal('hide');
      Meteor.setTimeout(function () {
        sAlert.warning(TAPi18n.__('errOrgNotFound'));
      }, 400);
    }
  }
});
