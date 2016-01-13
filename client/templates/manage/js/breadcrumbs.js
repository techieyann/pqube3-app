Template.manageBreadcrumbs.helpers({
  superGroup: function () {
    FlowRouter.watchPathChange();
    var parentGroup = FlowRouter.current().route.group.parent;
    var superGroups = [];
    while(parentGroup) {
      superGroups.unshift({
	title: parentGroup.name,
	relURL: parentGroup.prefix
      });
      parentGroup = parentGroup.parent;
    }
    return superGroups;
  },
  activePage: function () {
    FlowRouter.watchPathChange();
    return FlowRouter.current().route.group.name;
  }
});
