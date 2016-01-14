Template.selectOrg.helpers({
  org: function () {
    return Orgs.find().fetch();
  },
  selected: function (id) {
    var selectedOrg = FlowRouter.current().params.orgId;
    if (selectedOrg) {
      return (selectedOrg == id ? 'selected': '');
    }
    else if (id == '') {
      return 'selected';
    }
    return '';
  }
});

Template.selectOrg.events({
  'change #select-organization': function (e) {
    var orgId = e.target.value;
    if (orgId) 
      FlowRouter.go('/manage/org/'+orgId);
    else
      FlowRouter.go('/manage/org/');
  }
});
